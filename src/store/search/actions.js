import {SELECTED_SONGS_CHANGE} from './actionTypes';

export const changeSelectedSongs = (songs) => ({type: SELECTED_SONGS_CHANGE, payload: songs});
