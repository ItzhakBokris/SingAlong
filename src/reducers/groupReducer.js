import {
    GROUP_CREATION_FAILED,
    GROUP_FETCH,
    GROUP_FETCH_FAILED,
    GROUP_SONGS_FETCH,
    GROUP_SONGS_FETCH_FAILED,
    GROUP_SONGS_ADD_FAILED
} from '../actions/types';

const INITIAL_STATE = {
    group: null,
    songs: [],
    error: null
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GROUP_FETCH:
            return {...INITIAL_STATE, group: action.payload};
        case GROUP_CREATION_FAILED:
        case GROUP_FETCH_FAILED:
            return {...INITIAL_STATE, error: action.payload};
        case GROUP_SONGS_FETCH:
            return {...state, songs: action.payload};
        case GROUP_SONGS_FETCH_FAILED:
        case GROUP_SONGS_ADD_FAILED:
            return {...state, error: action.payload};
        default:
            return state;
    }
};
