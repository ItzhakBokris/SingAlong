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
    SONGS_SEARCH_SUCCESS,
    PLAYED_SONG_CHANGE_REQUEST,
    PLAYED_SONG_CHANGE_SUCCESS,
    PLAYED_SONG_CHANGE_FAILURE, SONG_LIKE_REQUEST
} from './actionTypes';
import {SongsConfig} from '../../config';

export const fetchGroupSongs = (group) => {
    return (dispatch) => {
        dispatch({type: GROUP_SONGS_FETCH_REQUEST});
        const promises = group.items.map(item => firebase.database().ref(`/songs/${item.song}`).once('value'));
        return Promise.all(promises)
            .then(result => {
                const songs = result.reduce((array, snapshot) => [...array, snapshotToObject(snapshot)], []);
                dispatch({type: GROUP_SONGS_FETCH_SUCCESS, payload: songs});
            })
            .catch(error => dispatch({type: GROUP_SONGS_FETCH_FAILURE, payload: error.message}));
    };
};

export const addSongsToGroup = (group, member, newSongs) => {
    return (dispatch) => {
        updateSongViews(newSongs);
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
            .limitToFirst(fromText ? pageSize + 1 : pageSize)
            .once('value',
                snapshot => dispatch({
                    type: SONGS_SEARCH_SUCCESS,
                    payload: snapshotToArray(snapshot).slice(fromText ? 1 : 0)
                }),
                error => dispatch({type: SONGS_SEARCH_FAILURE, payload: error.message})
            );
    };
};

export const changePlayedSong = (group, songPosition) => {
    return (dispatch) => {
        dispatch({type: PLAYED_SONG_CHANGE_REQUEST});
        return firebase.database().ref(`/groups/${group.key}`)
            .update({currentPlayed: songPosition})
            .then(() => dispatch({type: PLAYED_SONG_CHANGE_SUCCESS}))
            .catch(error => dispatch({type: PLAYED_SONG_CHANGE_FAILURE, payload: error.message}));
    };
};

/**
 * Increments the likes-count of the specified song.
 */
export const likeSong = (songKey) => {
    return (dispatch) => {
        dispatch({type: SONG_LIKE_REQUEST});
        return firebase.database()
            .ref(`/songs/${songKey}`)
            .child('likesCount')
            .transaction(likesCount => (likesCount || 0) + 1)
    }
};

/**
 * Increments the views-count of the specified songs.
 */
export const updateSongViews = (songKeys) => {
    songKeys.forEach(key => firebase.database()
        .ref(`/songs/${key}`)
        .child('viewsCount')
        .transaction(viewsCount => (viewsCount || 0) + 1)
    );
};
