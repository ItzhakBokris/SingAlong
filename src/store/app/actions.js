import {
    APP_ENTER,
    APP_RATE_FAILURE,
    APP_RATE_REQUEST,
    APP_RATE_STEPS_BEFORE_DECREASE,
    APP_RATE_SUCCESS
} from './actionTypes';
import firebase from 'firebase';
import {AppConfig} from '../../config';
import {Platform} from 'react-native';

export const enterApp = () => ({type: APP_ENTER});

export const decreaseStepsBeforeRate = () => ({type: APP_RATE_STEPS_BEFORE_DECREASE});

export const rateApp = (rating, feedback, nickname) => {
    return (dispatch) => {
        dispatch({type: APP_RATE_REQUEST});
        firebase.database().ref('/ratings')
            .push({
                rating,
                feedback,
                nickname,
                creationDate: new Date().toISOString(),
                os: `${Platform.OS} (${Platform.Version})`,
                version: AppConfig.version
            })
            .then(() => dispatch({type: APP_RATE_SUCCESS}))
            .catch(error => dispatch({type: APP_RATE_FAILURE, payload: error.message}));
    };
};
