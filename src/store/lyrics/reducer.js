import {LYRICS_FETCH_FAILURE, LYRICS_FETCH_REQUEST, LYRICS_FETCH_SUCCESS} from './actionTypes';

const INITIAL_STATE = {
    lyricsMap: {},
    isRequested: false,
    error: null
};

export const LyricsReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LYRICS_FETCH_REQUEST:
            return {...state, isRequested: true, error: null};
        case LYRICS_FETCH_SUCCESS:
            return {
                ...state,
                lyricsMap: {...state.lyricsMap, [action.payload.key]: action.payload},
                isRequested: false,
                error: null
            };
        case LYRICS_FETCH_FAILURE:
            return {...state, isRequested: false, error: action.payload};
        default:
            return state;
    }
};
