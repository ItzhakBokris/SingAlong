import {SINGS_FETCH} from '../actions/types';

export default (state = [], action) => {
    switch (action.type) {
        case SINGS_FETCH:
            return action.payload || [];
        default:
            return state;
    }
};
