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
    GROUP_JOIN_FAILURE, GROUP_CLEAR
} from './actionTypes';
import {USER_NICKNAME_SET} from '../user/actionTypes';
import {SONGS_CLEAR} from '../song/actionTypes';
import {fetchGroupSongs} from '../song/actions';
import {generateUid, hashCode, snapshotToArray, snapshotToObject} from '../../utils';

export const fetchGroup = (groupKey) => {
    return (dispatch) => {
        dispatch({type: GROUP_FETCH_REQUEST});
        firebase.database().ref(`/groups/${groupKey}`).on('value',
            snapshot => {
                const group = snapshotToObject(snapshot);
                dispatch({type: GROUP_FETCH_SUCCESS, payload: group});
                dispatch(fetchGroupSongs(group));
            },
            error => dispatch({type: GROUP_FETCH_FAILURE, payload: error.message}));
    };
};

export const fetchGroupByPinCode = (pinCode) => {
    return (dispatch) => {
        dispatch({type: GROUP_FETCH_REQUEST});
        firebase.database().ref('/groups').orderByChild('pinCode').equalTo(pinCode).on('value',
            snapshot => {
                const groups = snapshotToArray(snapshot);
                if (groups.length > 0) {
                    dispatch({type: GROUP_FETCH_SUCCESS, payload: groups[0]});
                    dispatch(fetchGroupSongs(groups[0]));
                } else {
                    dispatch({type: GROUP_FETCH_FAILURE, payload: 'group not found'});
                }
            },
            error => dispatch({type: GROUP_FETCH_FAILURE, payload: error.message}));
    };
};

export const createGroup = (name, creator, songs) => {
    return (dispatch) => {
        dispatch({type: GROUP_CREATE_REQUEST});
        const groupUid = generateUid();
        return firebase.database().ref('/groups')
            .push({
                name,
                creator,
                items: songs.map(song => ({song, member: creator})),
                link: `https://group.singalong.com/${groupUid}`,
                pinCode: hashCode(groupUid),
                members: [creator]
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
        return firebase.database().ref(`/groups/${group.key}`)
            .update({members: [...group.members, nickname]})
            .then(() => {
                dispatch({type: GROUP_JOIN_SUCCESS});
                dispatch({type: USER_NICKNAME_SET, payload: nickname});
            })
            .catch(error => dispatch({type: GROUP_JOIN_FAILURE, payload: error.message}));
    };
};

export const clearGroup = () => {
    return (dispatch) => {
        dispatch({type: GROUP_CLEAR});
        dispatch({type: SONGS_CLEAR});
        dispatch({type: USER_NICKNAME_SET});
    };
};
