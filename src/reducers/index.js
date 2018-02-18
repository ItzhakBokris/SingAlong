import {combineReducers} from "redux";
import OnBoardingReducer from './groupCreationReducer';
import GroupReducer from './groupReducer';
import SongReducer from './songReducer';

export default combineReducers({
    onBoarding: OnBoardingReducer,
    groupData: GroupReducer,
    songData: SongReducer
});
