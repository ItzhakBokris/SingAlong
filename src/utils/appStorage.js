import {AsyncStorage} from 'react-native';

const APP_STATE_KEY = 'app_state_key';

export const loadAppState = (onComplete) => {
    try {
        AsyncStorage.getItem(APP_STATE_KEY)
            .then(value => onComplete(JSON.parse(value) || {}))
            .catch(error => {
                console.log(error);
                onComplete({});
            });
    }
    catch (error) {
        console.log(error);
        onComplete({});
    }
};

export const saveAppState = (state) => {
    try {
        const partialState = {
            userData: state.userData,
            appData: state.appData && {
                isNotFirstEntry: state.appData.isNotFirstEntry,
                isRated: state.appData.isRated,
                stepsBeforeRate: state.appData.stepsBeforeRate
            },
            groupData: state.groupData && {group: state.groupData.group},
            songData: state.songData && {groupSongs: state.songData.groupSongs},
            lyricsData: state.lyricsData && {
                fontSizeScale: state.lyricsData.fontSizeScale,
                chordsShown: state.lyricsData.chordsShown,
                lyricsMap: {}
            }
        };
        AsyncStorage.setItem(APP_STATE_KEY, JSON.stringify(partialState));
    }
    catch (error) {
        console.log(error);
    }
};
