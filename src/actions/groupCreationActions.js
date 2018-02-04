import firebase from 'firebase';
import {GROUP_NAME_CHANGED, GROUP_CREATOR_NICKNAME_CHANGED, GROUP_CREATE} from './types';

export const groupNameChanged = (text) => {
    return {
        type: GROUP_NAME_CHANGED,
        payload: text
    };
};

export const groupCreatorNicknameChanged = (text) => {
    return {
        type: GROUP_CREATOR_NICKNAME_CHANGED,
        payload: text
    };
};

export const groupCreate = (name, creatorNickname) => {
    return (dispatch) => {
        firebase.database().ref(`/groups`)
            .push({name: groupName})
            .then((value) => {
                console.log(value.key);
                dispatch({type: GROUP_CREATE});
                //Actions.employeeList({ type: 'reset' });
            });
    };
};

export const userCreate = (nickname, groupId) => {
    return (dispatch) => {
        firebase.database().ref(`/users`)
            .push({nickname, groupId})
            .then(() => {
                dispatch({type: GROUP_CREATE});
                //Actions.employeeList({ type: 'reset' });
            });
    };
};

