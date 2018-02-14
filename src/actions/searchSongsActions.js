import firebase from 'firebase';
import {snapshotToArray} from '../utils/firebaseUtils';
import {SEARCHED_SONGS_FETCH} from './types';

const FILTER_FIELDS = ['name', 'artist'];

export const searchSongs = (count, queryText) => {
    return (dispatch) => {
        const promises = !queryText ?
            [firebase.database().ref('/songs').limitToFirst(count).once('value')] :
            FILTER_FIELDS.map(field => firebase.database().ref('/songs')
                .orderByChild(field)
                .startAt(queryText)
                .endAt(`${queryText}\uf8ff`)
                .limitToFirst(count)
                .once('value'));

        return Promise.all(promises).then(result => dispatch({
            type: SEARCHED_SONGS_FETCH,
            payload: result.reduce((array, snapshot) => [...array, ...snapshotToArray(snapshot)], [])
        }));
    };
};