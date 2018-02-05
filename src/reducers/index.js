import {combineReducers} from "redux";
import GroupReducer from './groupReducer';
import OnBoardingReducer from './onBoardingReducer';

export default combineReducers({
    group: GroupReducer,
    onBoarding: OnBoardingReducer
});
