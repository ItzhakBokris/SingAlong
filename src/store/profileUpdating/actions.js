import {PROFILE_NICKNAME_CHANGE,} from './actionTypes';

export const changeNickname = (text) => ({type: PROFILE_NICKNAME_CHANGE, payload: text});
