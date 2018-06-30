import {combineReducers} from 'redux';
import {GroupCreationReducer} from './groupCreation/reducer';
import {GroupJoiningReducer} from './groupJoining/reducer';
import {ProfileUpdatingReducer} from './profileUpdating/reducer';
import {UserReducer} from './user/reducer';
import {GroupReducer} from './group/reducer';
import {SongReducer} from './song/reducer';
import {SearchReducer} from './search/reducer';
import {LyricsReducer} from './lyrics/reducer';
import {AppReducer} from './app/reducer';

export default combineReducers({
    groupCreationData: GroupCreationReducer,
    groupJoiningData: GroupJoiningReducer,
    profileUpdatingData: ProfileUpdatingReducer,
    userData: UserReducer,
    searchData: SearchReducer,
    groupData: GroupReducer,
    songData: SongReducer,
    lyricsData: LyricsReducer,
    appData: AppReducer
});
