import firebase from 'firebase';
import {SONG_LYRICS_FETCH} from './types';

export const fetchSongLyrics = (song) => {
    return (dispatch) => firebase.database().ref(`/lyricses/${song.lyrics}`)
        .once('value', snapshot => dispatch({type: SONG_LYRICS_FETCH, payload: snapshot.val()}),
            () => dispatch({type: SONG_LYRICS_FETCH}))
        .catch(() => dispatch({type: SONG_LYRICS_FETCH}));
};
