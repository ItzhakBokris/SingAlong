import {NICKNAME_CHANGED, GROUP_NAME_CHANGED, CLEAR_DATA, SING_SELECTED} from '../actions/types';

const INITIAL_STATE = {
    groupName: '',
    nickname: '',
    selectedSings: []
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GROUP_NAME_CHANGED:
            return {...state, groupName: action.payload};
        case NICKNAME_CHANGED:
            return {...state, nickname: action.payload};
        case SING_SELECTED:
            const selectedSings = state.selectedSings.filter(sing => sing.name !== action.payload.name);
            if (selectedSings.length === state.selectedSings.length) {
                selectedSings.push(action.payload);
            }
            return {...state, selectedSings};
        case CLEAR_DATA:
            return INITIAL_STATE;
        default:
            return state;
    }
};
