import {combineReducers} from "redux";
import GroupReducer from './groupReducer';
import OnBoardingReducer from './onBoardingReducer';
import SongsReducer from './songsReducer';

export default combineReducers({
    group: GroupReducer,
    onBoarding: OnBoardingReducer,
    songs: SongsReducer
});
