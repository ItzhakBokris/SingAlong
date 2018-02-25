import {SELECTED_SONGS_CHANGE} from './actionTypes';
import {SONGS_SEARCH_FAILURE, SONGS_SEARCH_REQUEST, SONGS_SEARCH_SUCCESS} from '../song/actionTypes'
import {SongsConfig} from '../../config';

const INITIAL_STATE = {
    songs: [],
    selectedSongs: [],
    error: null,
    searchText: '',
    fromText: '',
    pageSize: SongsConfig.pageSize,
    isRequested: false
};

export const SearchReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SONGS_SEARCH_REQUEST:
            return {
                ...state,
                ...action.payload,
                fromText: state.searchText !== action.payload.searchText ? '' : action.payload.fromText,
                isRequested: true,
                error: null
            };
        case SONGS_SEARCH_SUCCESS:
            return {
                ...state,
                songs: state.fromText ? [...state.songs, ...action.payload] : action.payload,
                isRequested: false,
                error: null
            };
        case SONGS_SEARCH_FAILURE:
            return {...state, isRequested: false, error: action.payload};
        case SELECTED_SONGS_CHANGE:
            return {...state, selectedSongs: action.payload};
        default:
            return state;
    }
};
