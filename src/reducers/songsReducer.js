import {SONGS_FETCH} from '../actions/types';

export default (state = [], action) => {
    switch (action.type) {
        case SONGS_FETCH:
            return action.payload || [];
        default:
            return state;
    }
};
