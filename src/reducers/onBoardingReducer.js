import {NICKNAME_CHANGED, GROUP_NAME_CHANGED, CLEAR_DATA} from '../actions/types';

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
        case CLEAR_DATA:
            return INITIAL_STATE;
        default:
            return state;
    }
};
