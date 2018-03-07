import {LYRICS_FETCH_FAILURE, LYRICS_FETCH_REQUEST, LYRICS_FETCH_SUCCESS} from './actionTypes';

const INITIAL_STATE = {
    // Map from lyrics-key to the lyrics object or request-indicator/error message if the request failed.
    lyricsMap: {}
    // lyricsMap: {
    //   '-L5LYaLwYaXYsKAnhTzV': {
    //       text: "Oh, thinkin\\' about all our younger years There was only you and me We were young and wild and free\n\nNow nothin\\' can take you away from me We\\'ve been down that road before But that\\'s over now You keep me comin\\' back for more\n\nBaby, you\\'re all that I want When you\\'re lyin\\' here in my arms I\\'m findin\\' it hard to believe We\\'re in heaven\n\nAnd love is all that I need And I found it there in your heart It isn\\'t too hard to see We\\'re in heaven\n\nOh, once in your life you find someone Who will turn your world around Bring you up when you\\'re feelin\\' down\n\nYeah, nothin\\' could change what you mean to me Oh, there\\'s lots that I could say But just hold me now \\'Cause our love will light the way\n\nAnd, baby, you\\'re all that I want When you\\'re lyin\\' here in my arms I\\'m findin\\' it hard to believe We\\'re in heaven\n\nYeah, love is all that I need And I found it there in your heart It isn\\'t too hard to see We\\'re in heaven\n\nI\\'ve been waitin\\' for so long For somethin\\' to arrive For love to come along\n\nNow our dreams are comin\\' true Through the good times and the bad Yeah, I\\'ll be standin\\' there by you\n\nAnd, baby, you\\'re all that I want When you\\'re lyin\\' here in my arms I\\'m findin\\' it hard to believe We\\'re in heaven\n\nAnd love is all that I need And I found it there in your heart It isn\\'t too hard to see We\\'re in heaven, heaven\n\nYou\\'re all that I want You\\'re all that I need\n\nWe\\'re in heaven We\\'re in heaven We\\'re in heaven"
    //   }
    // }
};

export const LyricsReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LYRICS_FETCH_REQUEST:
            return {...state, lyricsMap: {...state.lyricsMap, [action.payload.key]: {isRequested: true}}};

        case LYRICS_FETCH_SUCCESS:
            return {...state, lyricsMap: {...state.lyricsMap, [action.payload.key]: action.payload}};

        case LYRICS_FETCH_FAILURE:
            return {...state, lyricsMap: {...state.lyricsMap, [action.payload.key]: {error: action.payload.error}}};

        default:
            return state;
    }
};
