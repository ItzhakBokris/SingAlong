import {PROFILE_NICKNAME_CHANGE} from './actionTypes';

import {
    GROUP_MEMBER_UPDATE_FAILURE,
    GROUP_MEMBER_UPDATE_REQUEST,
    GROUP_MEMBER_UPDATE_SUCCESS
} from '../group/actionTypes';

const INITIAL_STATE = {
    nickname: '',
    isRequested: false,
    error: null
};

export const ProfileUpdatingReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case PROFILE_NICKNAME_CHANGE:
            return {...state, nickname: action.payload};
        case GROUP_MEMBER_UPDATE_REQUEST:
            return {...state, isRequested: true, error: null};
        case GROUP_MEMBER_UPDATE_SUCCESS:
            return INITIAL_STATE;
        case GROUP_MEMBER_UPDATE_FAILURE:
            return {...state, isRequested: false, error: action.payload};
        default:
            return state;
    }
};
