import firebase from 'firebase';
import {GROUP_NAME_CHANGED, NICKNAME_CHANGED, GROUP_FETCH, CLEAR_DATA, SING_SELECTED} from './types';

export const groupNameChanged = (text) => ({
    type: GROUP_NAME_CHANGED,
    payload: text
});

export const nicknameChanged = (text) => ({
    type: NICKNAME_CHANGED,
    payload: text
});

export const singSelected = (sing) => ({
    type: SING_SELECTED,
    payload: sing
});

export const clearData = () => ({
    type: CLEAR_DATA
});

export const groupCreate = (name, creator, sings) => {
    return (dispatch) => firebase.database().ref('/groups')
        .push({name, creator, sings, participants: [creator]})
        .then(value => groupCreateSuccess(dispatch, value.key), () => groupCreateFailed(dispatch))
        .catch(() => groupCreateFailed(dispatch));
};

const groupCreateSuccess = (dispatch, groupKey) => firebase.database().ref(`/groups/${groupKey}`)
    .on('value', snapshot => dispatch({type: GROUP_FETCH, payload: snapshot.val()}));

const groupCreateFailed = (dispatch) => dispatch({type: GROUP_FETCH});

