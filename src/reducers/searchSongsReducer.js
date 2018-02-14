import {SEARCHED_SONGS_FETCH} from '../actions/types';

export default (state = [], action) => {
    switch (action.type) {
        case SEARCHED_SONGS_FETCH:
            return action.payload || [];
        default:
            return state;
    }
};
