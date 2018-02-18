import {SONG_LYRICS_FETCH} from '../actions/types';

const INITIAL_STATE = {
    lyrics: null
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SONG_LYRICS_FETCH:
            return {...state, lyrics: action.payload};
        default:
            return state;
    }
};
