import {
    GROUP_FETCH_REQUEST,
    GROUP_FETCH_SUCCESS,
    GROUP_FETCH_FAILURE,
    GROUP_CLEAR
} from './actionTypes';

const INITIAL_STATE = {
    group: null,
    isRequested: false,
    error: null
};

export const GroupReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GROUP_FETCH_REQUEST:
            return {...state, isRequested: true, error: null};
        case GROUP_FETCH_SUCCESS:
            return {...state, group: action.payload, isRequested: false, error: null};
        case GROUP_FETCH_FAILURE:
            return {...state, isRequested: false, error: action.payload};
        case GROUP_CLEAR:
            return INITIAL_STATE;
        default:
            return state;
    }
};
