import {
    GROUP_CREATION_NAME_CHANGE,
    GROUP_CREATION_CREATOR_CHANGE,
    GROUP_CREATION_SONGS_CHANGE
} from './actionTypes';

export const changeName = (text) => ({type: GROUP_CREATION_NAME_CHANGE, payload: text});

export const changeCreator = (text) => ({type: GROUP_CREATION_CREATOR_CHANGE, payload: text});

export const changeSongs = (songs) => ({type: GROUP_CREATION_SONGS_CHANGE, payload: songs});
