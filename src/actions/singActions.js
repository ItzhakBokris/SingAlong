import firebase from "firebase";
import {SINGS_FETCH} from "./types";

const FILTER_FIELDS = ['name', 'artist'];

export const fetchSings = (count, queryText) => {
    return (dispatch) => {
        const promises = !queryText ?
            [firebase.database().ref('/sings').limitToFirst(count).once('value')] :
            FILTER_FIELDS.map(field => firebase.database().ref('/sings')
                .orderByChild(field)
                .startAt(queryText)
                .endAt(`${queryText}\uf8ff`)
                .limitToFirst(count)
                .once('value'));

        return Promise.all(promises).then(result => dispatch({
            type: SINGS_FETCH,
            payload: result.reduce((sings, snapshot) =>
                [...sings, ...Object.values(snapshot.val() || {})], [])
        }));
    }
};
