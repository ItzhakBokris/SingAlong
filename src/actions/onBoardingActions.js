import firebase from 'firebase';
import {GROUP_NAME_CHANGED, NICKNAME_CHANGED, GROUP_FETCH, CLEAR_DATA, SONG_SELECTED} from './types';
import {fetchGroup} from './groupAction';

export const groupNameChanged = (text) => ({
    type: GROUP_NAME_CHANGED,
    payload: text
});

export const nicknameChanged = (text) => ({
    type: NICKNAME_CHANGED,
    payload: text
});

export const songSelected = (song) => ({
    type: SONG_SELECTED,
    payload: song
});

export const clearData = () => ({
    type: CLEAR_DATA
});

export const groupCreate = (name, creator, songs) => {
    songs = songs.map(song => typeof song === 'string' ? song : song.key);
    return (dispatch) => firebase.database().ref('/groups')
        .push({name, creator, songs, participants: [creator]})
        .then(result => dispatch(fetchGroup(result.key)), () => dispatch({type: GROUP_FETCH}))
        .catch(() => dispatch({type: GROUP_FETCH}));
};
