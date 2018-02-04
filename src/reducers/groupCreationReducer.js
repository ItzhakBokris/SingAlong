import {GROUP_CREATE, GROUP_CREATOR_NICKNAME_CHANGED, GROUP_NAME_CHANGED} from '../actions/types';

const INITIAL_STATE = {
    groupName: '',
    creatorNickname: ''
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GROUP_NAME_CHANGED:
            return {...state, groupName: action.payload};
        case GROUP_CREATOR_NICKNAME_CHANGED:
            return {...state, creatorNickname: action.payload};
        case GROUP_CREATE:
            return state;
        default:
            return state;
    }
};
