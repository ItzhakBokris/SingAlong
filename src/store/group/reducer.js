import {
    GROUP_FETCH_REQUEST,
    GROUP_FETCH_SUCCESS,
    GROUP_FETCH_FAILURE, GROUP_FETCH_PIN_CODE_REQUEST, GROUP_FETCH_PIN_CODE_SUCCESS, GROUP_FETCH_PIN_CODE_FAILURE
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
        default:
            return state;
    }
};
