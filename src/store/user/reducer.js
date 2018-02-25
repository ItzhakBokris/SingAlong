import {USER_NICKNAME_SET} from './actionTypes';

const INITIAL_STATE = {
    nickname: ''
};

export const UserReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case USER_NICKNAME_SET:
            return {...state, nickname: action.payload};
        default:
            return state;
    }
};
