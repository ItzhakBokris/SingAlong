import firebase from 'firebase';
import {
    LYRICS_FETCH_FAILURE,
    LYRICS_FETCH_REQUEST,
    LYRICS_FETCH_SUCCESS,
    LYRICS_FONT_SIZE_SCALE_CHANGE,
    LYRICS_CHORDS_SHOW
} from './actionTypes';
import {snapshotToObject} from '../../utils';

export const fetchSongLyrics = (song) => {
    return (dispatch) => {
        dispatch({type: LYRICS_FETCH_REQUEST, payload: {key: song.lyrics}});
        return firebase.database().ref(`/lyricses/${song.lyrics}`).once('value',
            snapshot => dispatch({type: LYRICS_FETCH_SUCCESS, payload: snapshotToObject(snapshot)}),
            error => dispatch({type: LYRICS_FETCH_FAILURE, payload: {key: song.lyrics, error: error.message}}));
    }
};

export const changeFontSizeScale = (scale) => ({type: LYRICS_FONT_SIZE_SCALE_CHANGE, payload: scale});

export const showChords = (value) => ({type: LYRICS_CHORDS_SHOW, payload: value});
