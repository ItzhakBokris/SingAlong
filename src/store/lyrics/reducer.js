import {
    LYRICS_FETCH_FAILURE,
    LYRICS_FETCH_REQUEST,
    LYRICS_FETCH_SUCCESS,
    LYRICS_FONT_SIZE_SCALE_FETCH
} from './actionTypes';

const INITIAL_STATE = {
    // Map from lyrics-key to the lyrics object or request-indicator/error message if the request failed.
    lyricsMap: {},
    fontSizeScale: null
};

export const LyricsReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LYRICS_FETCH_REQUEST:
            return {...state, lyricsMap: {...state.lyricsMap, [action.payload.key]: {isRequested: true}}};

        case LYRICS_FETCH_SUCCESS:
            return {...state, lyricsMap: {...state.lyricsMap, [action.payload.key]: action.payload}};

        case LYRICS_FETCH_FAILURE:
            return {...state, lyricsMap: {...state.lyricsMap, [action.payload.key]: {error: action.payload.error}}};

        case LYRICS_FONT_SIZE_SCALE_FETCH:
            return {...state, fontSizeScale: action.payload};

        default:
            return state;
    }
};
