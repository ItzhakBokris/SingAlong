import {combineReducers} from "redux";
import OnBoardingReducer from './onBoardingReducer';
import SearchSongsReducer from './searchSongsReducer';
import GroupReducer from './groupReducer';
import SongReducer from './songReducer';

export default combineReducers({
    onBoarding: OnBoardingReducer,
    searchedSongs: SearchSongsReducer,
    groupData: GroupReducer,
    songData: SongReducer
});
