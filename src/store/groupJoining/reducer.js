import {GROUP_JOINING_NICKNAME_CHANGE} from './actionTypes';

import {
    GROUP_JOIN_FAILURE,
    GROUP_JOIN_REQUEST,
    GROUP_JOIN_SUCCESS
} from '../group/actionTypes';

const INITIAL_STATE = {
    nickname: '',
    isRequested: false,
    error: null
};

export const GroupJoiningReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GROUP_JOINING_NICKNAME_CHANGE:
            return {...state, nickname: action.payload};
        case GROUP_JOIN_REQUEST:
            return {...state, isRequested: true, error: null};
        case GROUP_JOIN_SUCCESS:
            return INITIAL_STATE;
        case GROUP_JOIN_FAILURE:
            return {...state, isRequested: false, error: action.payload};
        default:
            return state;
    }
};
