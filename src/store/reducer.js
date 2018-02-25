import {combineReducers} from 'redux';
import {GroupCreationReducer} from './groupCreation/reducer';
import {GroupJoiningReducer} from './groupJoining/reducer';
import {UserReducer} from './user/reducer';
import {GroupReducer} from './group/reducer';
import {SongReducer} from './song/reducer';
import {SearchReducer} from './search/reducer';
import {LyricsReducer} from './lyrics/reducer';

export default combineReducers({
    groupCreationData: GroupCreationReducer,
    groupJoiningData: GroupJoiningReducer,
    userData: UserReducer,
    searchData: SearchReducer,
    groupData: GroupReducer,
    songData: SongReducer,
    lyricsData: LyricsReducer
});
