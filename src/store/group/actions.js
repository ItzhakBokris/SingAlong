import firebase from 'firebase';
import {
    GROUP_FETCH_REQUEST,
    GROUP_FETCH_SUCCESS,
    GROUP_FETCH_FAILURE,
    GROUP_CREATE_REQUEST,
    GROUP_CREATE_SUCCESS,
    GROUP_CREATE_FAILURE
} from './actionTypes';
import {generateUid, hashCode, snapshotToArray, snapshotToObject} from '../../utils';
import {fetchGroupSongs} from '../song/actions';

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
    }
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
    }
};

export const createGroup = (name, creator, songs) => {
    return (dispatch) => {
        dispatch({type: GROUP_CREATE_REQUEST});
        const pinCode = hashCode(generateUid());
        return firebase.database().ref('/groups')
            .push({name, creator, songs, pinCode, participants: [creator]})
            .then(result => {
                dispatch({type: GROUP_CREATE_SUCCESS});
                dispatch(fetchGroup(result.key));
            })
            .catch(error => dispatch({type: GROUP_CREATE_FAILURE, payload: error.message}));
    }
};
