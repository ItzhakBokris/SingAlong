import {snapshotToArray, snapshotToObject} from '../../utils';
import firebase from 'firebase';
import {
    GROUP_SONGS_FETCH_FAILURE,
    GROUP_SONGS_FETCH_REQUEST,
    GROUP_SONGS_FETCH_SUCCESS,
    GROUP_SONGS_ADD_REQUEST,
    GROUP_SONGS_ADD_SUCCESS,
    GROUP_SONGS_ADD_FAILURE,
    SONGS_SEARCH_FAILURE,
    SONGS_SEARCH_REQUEST,
    SONGS_SEARCH_SUCCESS
} from './actionTypes';
import {SongsConfig} from '../../config';
import {fetchSongLyrics} from '../lyrics/actions';

export const fetchGroupSongs = (group) => {
    return (dispatch) => {
        dispatch({type: GROUP_SONGS_FETCH_REQUEST});
        const promises = group.items.map(item => firebase.database().ref(`/songs/${item.song}`).once('value'));
        return Promise.all(promises)
            .then(result => {
                const songs = result.reduce((array, snapshot) => [...array, snapshotToObject(snapshot)], []);
                dispatch({type: GROUP_SONGS_FETCH_SUCCESS, payload: songs});
                dispatch(fetchSongLyrics(songs[0]));
            })
            .catch(error => ({type: GROUP_SONGS_FETCH_FAILURE, payload: error.message}));
    };
};

export const addSongsToGroup = (group, member, newSongs) => {
    return (dispatch) => {
        dispatch({type: GROUP_SONGS_ADD_REQUEST});
        return firebase.database().ref(`/groups/${group.key}`)
            .update({items: [...group.items, ...newSongs.map(song => ({song, member}))]})
            .then(() => dispatch({type: GROUP_SONGS_ADD_SUCCESS}))
            .catch(error => dispatch({type: GROUP_SONGS_ADD_FAILURE, payload: error.message}));
    };
};

/**
 * Fetch songs filtered by the specified search-text from (and not include) the specified from-text.
 */
export const searchSongs = (searchText = '', fromText = '', pageSize = SongsConfig.pageSize) => {
    return (dispatch) => {
        dispatch({type: SONGS_SEARCH_REQUEST, payload: {searchText, pageSize, fromText}});
        const startFrom = fromText || searchText;
        return firebase.database().ref('/songs')
            .orderByChild('name')
            .startAt(startFrom)
            .endAt(startFrom + '\uf8ff')
            .limitToFirst(pageSize + 1)
            .once('value',
                snapshot => dispatch({
                    type: SONGS_SEARCH_SUCCESS,
                    payload: snapshotToArray(snapshot).slice(fromText ? 1 : 0)
                }),
                error => dispatch({type: SONGS_SEARCH_FAILURE, payload: error.message})
            );
    };
};
