import {GROUP_FETCH, GROUP_SONGS_FETCH} from '../actions/types';

const INITIAL_STATE = {
    group: null,
    songs: []
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GROUP_FETCH:
            return {...INITIAL_STATE, group: action.payload};
        case GROUP_SONGS_FETCH:
            return {...state, songs: action.payload};
        default:
            return state;
    }
};
