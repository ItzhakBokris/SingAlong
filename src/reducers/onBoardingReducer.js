import {NICKNAME_CHANGED, GROUP_NAME_CHANGED, CLEAR_DATA, SONG_SELECTED} from '../actions/types';

const INITIAL_STATE = {
    groupName: '',
    nickname: '',
    selectedSongs: []
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GROUP_NAME_CHANGED:
            return {...state, groupName: action.payload};
        case NICKNAME_CHANGED:
            return {...state, nickname: action.payload};
        case SONG_SELECTED:
            const selectedSongs = state.selectedSongs.filter(song => song.key !== action.payload.key);
            if (selectedSongs.length === state.selectedSongs.length) {
                selectedSongs.push(action.payload);
            }
            return {...state, selectedSongs};
        case CLEAR_DATA:
            return INITIAL_STATE;
        default:
            return state;
    }
};
