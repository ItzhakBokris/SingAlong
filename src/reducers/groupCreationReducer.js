import {
    GROUP_CREATION_NICKNAME_CHANGE,
    GROUP_CREATION_NAME_CHANGE,
    GROUP_CREATION_CLEAR_DATA,
    GROUP_CREATION_SONGS_CHANGE
} from '../actions/types';

const INITIAL_STATE = {
    groupName: '',
    nickname: '',
    groupSongs: []
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GROUP_CREATION_NAME_CHANGE:
            return {...state, groupName: action.payload};
        case GROUP_CREATION_NICKNAME_CHANGE:
            return {...state, nickname: action.payload};
        case GROUP_CREATION_SONGS_CHANGE:
            return {...state, groupSongs: action.payload};
        case GROUP_CREATION_CLEAR_DATA:
            return INITIAL_STATE;
        default:
            return state;
    }
};
