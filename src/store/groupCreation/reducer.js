import {
    GROUP_CREATION_CREATOR_CHANGE,
    GROUP_CREATION_NAME_CHANGE,
    GROUP_CREATION_SONGS_CHANGE
} from './actionTypes';

import {
    GROUP_CREATE_REQUEST,
    GROUP_CREATE_SUCCESS,
    GROUP_CREATE_FAILURE
} from '../group/actionTypes';

const INITIAL_STATE = {
    name: '',
    creator: '',
    songs: [],
    isRequested: false,
    error: null
};

export const GroupCreationReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GROUP_CREATION_NAME_CHANGE:
            return {...state, name: action.payload};
        case GROUP_CREATION_CREATOR_CHANGE:
            return {...state, creator: action.payload};
        case GROUP_CREATION_SONGS_CHANGE:
            return {...state, songs: action.payload};
        case GROUP_CREATE_REQUEST:
            return {...state, isRequested: true, error: null};
        case GROUP_CREATE_SUCCESS:
            return INITIAL_STATE;
        case GROUP_CREATE_FAILURE:
            return {...state, isRequested: false, error: action.payload};
        default:
            return state;
    }
};
