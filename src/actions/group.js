import firebase from 'firebase';
import {
    GROUP_FETCH, GROUP_FETCH_FAILED, GROUP_SONGS_FETCH, GROUP_SONGS_FETCH_FAILED, GROUP_SONGS_ADD_FAILED
} from './types';
import {snapshotToObject} from '../utils/firebaseUtils';

export const fetchGroup = (groupKey) => {
    return (dispatch) => firebase.database().ref(`/groups/${groupKey}`).on('value',
        snapshot => {
            const group = snapshotToObject(snapshot);
            dispatch({type: GROUP_FETCH, payload: group});
            dispatch(fetchGroupSongs(group));
        },
        error => dispatch({type: GROUP_FETCH_FAILED, payload: error.message}));
};

export const fetchGroupSongs = (group) => {
    return (dispatch) => {
        const promises = group.songs.map(key => firebase.database().ref(`/songs/${key}`).once('value'));
        return Promise.all(promises)
            .then(result => dispatch({
                type: GROUP_SONGS_FETCH,
                payload: result.reduce((array, snapshot) => [...array, snapshotToObject(snapshot)], [])
            }))
            .catch(error => ({type: GROUP_SONGS_FETCH_FAILED, payload: error.message}));
    };
};

export const addSongsToGroup = (group, newSongs) => {
    return (dispatch) => firebase.database().ref(`/groups/${group.key}`).set({
            songs: [...group.songs, ...newSongs]
        },
        error => error ? dispatch({type: GROUP_SONGS_ADD_FAILED, payload: error.message}) : null
    );
};
