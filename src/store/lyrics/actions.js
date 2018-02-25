import firebase from "firebase";
import {LYRICS_FETCH_FAILURE, LYRICS_FETCH_REQUEST, LYRICS_FETCH_SUCCESS} from './actionTypes';
import {snapshotToObject} from '../../utils';

export const fetchSongLyrics = (song) => {
    return (dispatch) => {
        dispatch({type: LYRICS_FETCH_REQUEST});
        return firebase.database().ref(`/lyricses/${song.lyrics}`).once('value',
            snapshot => dispatch({type: LYRICS_FETCH_SUCCESS, payload: snapshotToObject(snapshot)}),
            error => dispatch({type: LYRICS_FETCH_FAILURE, payload: error.message}));
    }
};
