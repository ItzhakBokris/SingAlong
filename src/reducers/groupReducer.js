import {GROUP_FETCH_SUCCESS} from '../actions/types';

const INITIAL_STATE = {
    group: null
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GROUP_FETCH_SUCCESS:
            return {...state, group: action.payload};
        default:
            return state;
    }
};
