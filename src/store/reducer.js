import {combineReducers} from 'redux';
import {GroupCreationReducer} from './groupCreation/reducer';
import {GroupReducer} from './group/reducer';
import {SongReducer} from './song/reducer';
import {SearchReducer} from './search/reducer';
import {LyricsReducer} from './lyrics/reducer';

export default combineReducers({
    groupCreationData: GroupCreationReducer,
    searchData: SearchReducer,
    groupData: GroupReducer,
    songData: SongReducer,
    lyricsData: LyricsReducer
});
