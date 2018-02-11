import firebase from "firebase";
import {SONGS_FETCH} from "./types";

const FILTER_FIELDS = ['name', 'artist'];

export const fetchSongs = (count, queryText) => {
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
            type: SONGS_FETCH,
            payload: result.reduce((songs, snapshot) =>
                [...songs, ...Object.values(snapshot.val() || {})], [])
        }));
    }
};
