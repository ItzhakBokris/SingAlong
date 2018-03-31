import {
    GROUP_FETCH_REQUEST,
    GROUP_FETCH_SUCCESS,
    GROUP_FETCH_FAILURE,
    GROUP_LEAVE_REQUEST,
    GROUP_LEAVE_SUCCESS,
    GROUP_LEAVE_FAILURE,
    GROUP_CLEAR
} from './actionTypes';

const INITIAL_STATE = {
    group: null,
    isRequested: false,
    error: null,
    isLeaveRequested: false,
    leaveError: null,
    isSynchronized: false
};

export const GroupReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GROUP_FETCH_REQUEST:
            return {...state, isRequested: true, error: null};

        case GROUP_FETCH_SUCCESS:
            return {...state, group: action.payload, isRequested: false, error: null, isSynchronized: true};

        case GROUP_FETCH_FAILURE:
            return {...state, isRequested: false, error: action.payload};

        case GROUP_LEAVE_REQUEST:
            return {...state, isLeaveRequested: true, leaveError: null};

        case GROUP_LEAVE_SUCCESS:
            return {...state, isLeaveRequested: false, leaveError: null};

        case GROUP_LEAVE_FAILURE:
            return {...state, isLeaveRequested: false, leaveError: action.payload};

        case GROUP_CLEAR:
            return INITIAL_STATE;

        default:
            return state;
    }
};
