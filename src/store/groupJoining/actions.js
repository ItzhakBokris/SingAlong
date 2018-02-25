import {GROUP_JOINING_NICKNAME_CHANGE,} from './actionTypes';

export const changeNickname = (text) => ({type: GROUP_JOINING_NICKNAME_CHANGE, payload: text});
