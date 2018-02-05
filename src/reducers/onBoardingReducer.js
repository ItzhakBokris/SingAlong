import {GROUP_CREATE, NICKNAME_CHANGED, GROUP_NAME_CHANGED} from '../actions/types';

const INITIAL_STATE = {
    groupName: '',
    nickname: ''
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GROUP_NAME_CHANGED:
            return {...state, groupName: action.payload};
        case NICKNAME_CHANGED:
            return {...state, nickname: action.payload};
        case GROUP_CREATE:
            return INITIAL_STATE;
        default:
            return state;
    }
};
