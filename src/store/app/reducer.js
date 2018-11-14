import {
    APP_ENTER,
    APP_RATE_FAILURE,
    APP_RATE_REQUEST,
    APP_RATE_STEPS_BEFORE_DECREASE,
    APP_RATE_SUCCESS
} from './actionTypes';

const INITIAL_STATE = {
    isNotFirstEntry: false,
    isRequested: false,
    error: null,
    isRated: false,
    stepsBeforeRate: 3
};

export const AppReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case APP_ENTER:
            return {...state, isNotFirstEntry: true};

        case APP_RATE_STEPS_BEFORE_DECREASE:
            return {...state, stepsBeforeRate: state.stepsBeforeRate >= 1 ? state.stepsBeforeRate - 1 : 5};

        case APP_RATE_REQUEST:
            return {...state, isRequested: true, error: null};

        case APP_RATE_SUCCESS:
            return {...state, isRated: true, isRequested: false, error: null};

        case APP_RATE_FAILURE:
            return {...state, isRequested: false, error: action.payload};

        default:
            return state;
    }
};
