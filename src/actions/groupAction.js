import firebase from 'firebase';
import {GROUP_FETCH, GROUP_SONGS_FETCH} from './types';
import {snapshotToObject} from '../utils/firebaseUtils';

export const fetchGroup = (groupKey) => {
    return (dispatch) => firebase.database().ref(`/groups/${groupKey}`)
        .on('value', snapshot => dispatch({type: GROUP_FETCH, payload: snapshot.val()}),
            () => dispatch({type: GROUP_FETCH}));
};

export const fetchGroupSongs = (group) => {
    return (dispatch) => {
        const promises = group.songs.map(key => firebase.database().ref(`/songs/${key}`).once('value'));
        return Promise.all(promises).then(result => dispatch({
            type: GROUP_SONGS_FETCH,
            payload: result.reduce((array, snapshot) => [...array, snapshotToObject(snapshot)], [])
        }));
    };
};
