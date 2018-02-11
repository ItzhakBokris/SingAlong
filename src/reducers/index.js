import {combineReducers} from "redux";
import GroupReducer from './groupReducer';
import OnBoardingReducer from './onBoardingReducer';
import SingsReducer from './singsReducer';

export default combineReducers({
    group: GroupReducer,
    onBoarding: OnBoardingReducer,
    sings: SingsReducer
});
