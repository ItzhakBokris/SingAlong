import firebase from 'firebase';
import {LYRICS_FETCH} from './types';

export const fetchLyrics = (song) => {
    return (dispatch) => firebase.database().ref(`/lyricses/${song.lyrics}`)
        .once('value', snapshot => dispatch({type: LYRICS_FETCH, payload: snapshot.val()}),
            () => dispatch({type: LYRICS_FETCH}))
        .catch(() => dispatch({type: LYRICS_FETCH}));
};
