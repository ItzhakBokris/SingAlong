import {GROUP_FETCH} from '../actions/types';

export default (state = {}, action) => {
    switch (action.type) {
        case GROUP_FETCH:
            return action.payload || {};
        default:
            return state;
    }
};
