import firebase from 'firebase';
import {GROUP_NAME_CHANGED, NICKNAME_CHANGED, GROUP_CREATE} from './types';

export const groupNameChanged = (text) => {
    return {
        type: GROUP_NAME_CHANGED,
        payload: text
    };
};

export const nicknameChanged = (text) => {
    return {
        type: NICKNAME_CHANGED,
        payload: text
    };
};

export const groupCreate = (groupName, creatorNickname) => {
    return (dispatch) => {
        firebase.database().ref(`/groups`)
            .push({groupName, creatorNickname})
            .then((value) => {
                console.log(value.key);
                dispatch({type: GROUP_CREATE});
                //Actions.employeeList({ type: 'reset' });
            });
    };
};
