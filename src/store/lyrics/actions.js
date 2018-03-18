import firebase from 'firebase';
import {
    LYRICS_FETCH_FAILURE,
    LYRICS_FETCH_REQUEST,
    LYRICS_FETCH_SUCCESS,
    LYRICS_FONT_SIZE_SCALE_FETCH
} from './actionTypes';
import {AppStorage, snapshotToObject} from '../../utils';

const KEY_FONT_SIZE_SCALE = 'key_font_size_scale';

export const fetchSongLyrics = (song) => {
    return (dispatch) => {
        dispatch({type: LYRICS_FETCH_REQUEST, payload: {key: song.lyrics}});
        return firebase.database().ref(`/lyricses/${song.lyrics}`).once('value',
            snapshot => dispatch({type: LYRICS_FETCH_SUCCESS, payload: snapshotToObject(snapshot)}),
            error => dispatch({type: LYRICS_FETCH_FAILURE, payload: {key: song.lyrics, error: error.message}}));
    }
};

export const fetchFontSizeScale = () => {
    return (dispatch) => AppStorage.get(KEY_FONT_SIZE_SCALE,
        value => dispatch({type: LYRICS_FONT_SIZE_SCALE_FETCH, payload: parseFloat(value || 1)}));
};

export const changeFontSizeScale = (scale) => {
    AppStorage.set(KEY_FONT_SIZE_SCALE, scale);
    return {type: LYRICS_FONT_SIZE_SCALE_FETCH, payload: scale};
};
