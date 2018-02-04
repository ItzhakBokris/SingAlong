import {combineReducers} from "redux";
import GroupReducer from './groupReducer';
import GroupCreationReducer from './groupCreationReducer';

export default combineReducers({
    group: GroupReducer,
    groupCreation: GroupCreationReducer
});
