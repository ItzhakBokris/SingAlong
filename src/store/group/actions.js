import firebase from 'firebase';
import {
    GROUP_FETCH_REQUEST,
    GROUP_FETCH_SUCCESS,
    GROUP_FETCH_FAILURE,
    GROUP_CREATE_REQUEST,
    GROUP_CREATE_SUCCESS,
    GROUP_CREATE_FAILURE,
    GROUP_JOIN_REQUEST,
    GROUP_JOIN_SUCCESS,
    GROUP_JOIN_FAILURE,
    GROUP_LEAVE_REQUEST,
    GROUP_LEAVE_SUCCESS,
    GROUP_LEAVE_FAILURE,
    GROUP_CLEAR
} from './actionTypes';
import {USER_NICKNAME_SET} from '../user/actionTypes';
import {SONGS_CLEAR} from '../song/actionTypes';
import {fetchGroupSongs, updateSongViews} from '../song/actions';
import {generateUid, hashCode, snapshotToArray, snapshotToObject} from '../../utils';

export const fetchGroup = (groupKey) => {
    return (dispatch) => {
        dispatch({type: GROUP_FETCH_REQUEST});
        dispatch(listenToGroup(groupKey));
    };
};

export const fetchGroupByPinCode = (pinCode) => fetchGroupBy('pinCode', pinCode);

export const fetchGroupByUid = (uid) => fetchGroupBy('uid', uid);

export const createGroup = (name, creator, songs) => {
    return (dispatch) => {
        updateSongViews(songs);
        dispatch({type: GROUP_CREATE_REQUEST});
        const groupUid = generateUid();
        firebase.database().ref('/groups')
            .push({
                name,
                admin: creator,
                uid: groupUid,
                pinCode: hashCode(groupUid),
                currentPlayed: 0,
                members: [creator],
                items: songs.map(song => ({song, member: creator}))
            })
            .then(result => {
                dispatch({type: GROUP_CREATE_SUCCESS});
                dispatch({type: USER_NICKNAME_SET, payload: creator});
                dispatch(fetchGroup(result.key));
            })
            .catch(error => dispatch({type: GROUP_CREATE_FAILURE, payload: error.message}));
    };
};

export const joinToGroup = (group, nickname) => {
    return (dispatch) => {
        dispatch({type: GROUP_JOIN_REQUEST});
        firebase.database().ref(`/groups/${group.key}`)
            .update(group.members ? {members: [...group.members, nickname]} : {members: [nickname], admin: nickname})
            .then(() => {
                dispatch({type: GROUP_JOIN_SUCCESS});
                dispatch({type: USER_NICKNAME_SET, payload: nickname});
            })
            .catch(error => dispatch({type: GROUP_JOIN_FAILURE, payload: error.message}));
    };
};

export const leaveGroup = (group, nickname) => {
    return (dispatch) => {
        dispatch({type: GROUP_LEAVE_REQUEST});
        const members = group.members.filter(member => member !== nickname);
        firebase.database().ref(`/groups/${group.key}`)
            .update({members, admin: group.admin !== nickname ? group.admin : members[0] || ''})
            .then(() => {
                dispatch({type: GROUP_LEAVE_SUCCESS});
                dispatch(clearGroup(group));
            })
            .catch(error => dispatch({type: GROUP_LEAVE_FAILURE, payload: error.message}));
    };
};

export const clearGroup = (group) => {
    return (dispatch) => {
        firebase.database().ref(`/groups/${group.key}`).off('value');
        dispatch({type: GROUP_CLEAR});
        dispatch({type: SONGS_CLEAR});
        dispatch({type: USER_NICKNAME_SET});
    };
};

export const listenToGroup = (groupKey) => {
    return (dispatch) => {
        firebase.database().ref(`/groups/${groupKey}`).on('value',
            snapshot => {
                const group = snapshotToObject(snapshot);
                dispatch({type: GROUP_FETCH_SUCCESS, payload: group});
                dispatch(fetchGroupSongs(group));
            },
            error => dispatch({type: GROUP_FETCH_FAILURE, payload: error.message}));
    };
};

const fetchGroupBy = (property, value) => {
    return (dispatch) => {
        dispatch({type: GROUP_FETCH_REQUEST});
        return firebase.database().ref('/groups').orderByChild(property).equalTo(value).once('value',
            snapshot => {
                const groups = snapshotToArray(snapshot);
                if (groups.length > 0) {
                    dispatch(listenToGroup(groups[0].key));
                } else {
                    dispatch({type: GROUP_FETCH_FAILURE, payload: 'group not found'});
                }
            },
            error => dispatch({type: GROUP_FETCH_FAILURE, payload: error.message}));
    };
};
