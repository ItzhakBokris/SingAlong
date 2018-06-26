import {APP_RATE_FAILURE, APP_RATE_REQUEST, APP_RATE_STEPS_BEFORE_DECREASE, APP_RATE_SUCCESS} from './actionTypes';
import firebase from 'firebase';

export const decreaseStepsBeforeRate = () => ({type: APP_RATE_STEPS_BEFORE_DECREASE});

export const rateApp = (rating, feedback, nickname) => {
    return (dispatch) => {
        dispatch({type: APP_RATE_REQUEST});
        firebase.database().ref('/ratings')
            .push({rating, feedback, nickname})
            .then(() => dispatch({type: APP_RATE_SUCCESS, payload: {rating, feedback}}))
            .catch(error => dispatch({type: APP_RATE_FAILURE, payload: error.message}));
    };
};
