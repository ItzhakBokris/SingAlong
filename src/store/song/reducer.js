import {
    GROUP_SONGS_FETCH_REQUEST,
    GROUP_SONGS_FETCH_SUCCESS,
    GROUP_SONGS_FETCH_FAILURE,
    GROUP_SONGS_ADD_FAILURE,
    GROUP_SONGS_ADD_REQUEST,
    GROUP_SONGS_ADD_SUCCESS,
    PLAYED_SONG_CHANGE_REQUEST,
    PLAYED_SONG_CHANGE_SUCCESS,
    PLAYED_SONG_CHANGE_FAILURE,
    SONGS_CLEAR
} from './actionTypes';

const INITIAL_STATE = {
    groupSongs: [],
    isRequested: false,
    error: null,
    isAddRequested: false,
    addError: null,
    isChangeSongRequested: false,
    changeSongError: null
};

export const SongReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GROUP_SONGS_FETCH_REQUEST:
            return {...state, isRequested: true, error: null};
        case GROUP_SONGS_FETCH_SUCCESS:
            return {...state, groupSongs: action.payload, isRequested: false, error: null};
        case GROUP_SONGS_FETCH_FAILURE:
            return {...state, isRequested: false, error: action.payload};

        case GROUP_SONGS_ADD_REQUEST:
            return {...state, isAddRequested: true, addError: null};
        case GROUP_SONGS_ADD_SUCCESS:
            return {...state, isAddRequested: false, addError: null};
        case GROUP_SONGS_ADD_FAILURE:
            return {...state, isAddRequested: false, addError: action.payload};

        case PLAYED_SONG_CHANGE_REQUEST:
            return {...state, isChangeSongRequested: true, changeSongError: null};
        case PLAYED_SONG_CHANGE_SUCCESS:
            return {...state, isChangeSongRequested: false, changeSongError: null};
        case PLAYED_SONG_CHANGE_FAILURE:
            return {...state, isChangeSongRequested: false, changeSongError: action.payload};

        case SONGS_CLEAR:
            return INITIAL_STATE;
        default:
            return state;
    }
};
