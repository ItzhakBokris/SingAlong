import firebase from 'firebase';
import {
    GROUP_CREATION_NAME_CHANGE,
    GROUP_CREATION_NICKNAME_CHANGE,
    GROUP_CREATION_CLEAR_DATA,
    GROUP_CREATION_FAILED,
    GROUP_CREATION_SONGS_CHANGE
} from './types';
import {fetchGroup} from './group';

export const changeGroupCreationName = (text) => ({type: GROUP_CREATION_NAME_CHANGE, payload: text});

export const changeGroupCreationNickname = (text) => ({type: GROUP_CREATION_NICKNAME_CHANGE, payload: text});

export const changeGroupCreationSongs = (songs) => ({type: GROUP_CREATION_SONGS_CHANGE, payload: songs});

export const clearGroupCreationData = () => ({type: GROUP_CREATION_CLEAR_DATA});

export const createGroup = (name, creator, songs) => {
    return (dispatch) => firebase.database().ref('/groups')
        .push({name, creator, songs, participants: [creator]})
        .then(result => dispatch(fetchGroup(result.key)))
        .catch(error => dispatch({type: GROUP_CREATION_FAILED, payload: error.message}));
};
