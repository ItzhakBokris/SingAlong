import React, {Component} from 'react';
import {UIManager, Platform, I18nManager, ScrollView, View} from 'react-native';
import {createStore, applyMiddleware} from 'redux'
import {Provider} from 'react-redux';
import ReduxThunk from 'redux-thunk';
import firebase from 'firebase';
import rootReducer from './store/reducer';
import {SongLyrics} from './components/songLyrics';
import Root from './containers/root';

export default class App extends Component {

    constructor() {
        super();
        const {setLayoutAnimationEnabledExperimental} = UIManager;
        if (Platform.OS === 'android' && setLayoutAnimationEnabledExperimental) {
            setLayoutAnimationEnabledExperimental(true);
        }
        try {
            I18nManager.allowRTL(false);
        } catch (error) {
            console.log(error.message);
        }
    }

    componentWillMount() {
        firebase.initializeApp({
            apiKey: 'AIzaSyB36Axani6trF_NlA7ZgJdZpky6DT7199c',
            authDomain: 'singalong-6aaf5.firebaseapp.com',
            databaseURL: 'https://singalong-6aaf5.firebaseio.com',
            projectId: 'singalong-6aaf5',
            storageBucket: '',
            messagingSenderId: '1090194417681'
        });
    }

    render() {
        return (
            <Provider store={createStore(rootReducer, {}, applyMiddleware(ReduxThunk))}>
                {/*<View style={{flex:1}}>*/}
                    {/*<SongLyrics*/}
                        {/*showChords*/}
                        {/*lyricsText={lyrics}*/}
                        {/*padding={{horizontal: 50, vertical: 50}}/>*/}
                {/*</View>*/}
                <Root/>
            </Provider>
        );
    }
}

const lyrics = 'ה[A]ייתי מחובר אלייך כמו גוף אל ה[Bm]נשמה\n' +
    '[F#m]סוחב כאב ומנסה להתמודד [Em]עם הדממה\n' +
    '[A]הזמן עובר לאט חושב עלייך כל [Bm]דקה\n' +
    '[F#m]איך הלכת לי לאיבוד אני מותש מ[Em]מחשבה\n' +
    '[Bm]בלילות אני מסתובב,[G] הולך ברח[Bm]וב מוציא כא[G]ב\n' +
    '[F#]מחפש את הת[Em]קווה, קורא ל[Bm]אל בתפ[G]ילה\n' +
    'פזמון:\n' +
    'אל תלכ[A]י לי, אל תלכי ל[Bm]י\n' +
    '[F#]אין לי כוח להמשיך אולי תשאר[Em]י \n' +
    '[A]אל תלכי לי, אל ת[Bm]לכי לי\n' +
    '[F#]אין לי כוח להמשיך אולי תשארי[Em] \n' +
    '[A]ראיתי קסם בתוכך שעליו לא[Bm] אוותר\n' +
    '[Bm]גם אם יפלו שמיים א[F#m]ו אטבע בים[Em] סוער\n' +
    '[A]גם אם אראה אותך חובקת סתם אדם[Bm] אחר\n' +
    '[Bm]אוכל מיד לסלוח ב[F#m]ואי אלי ונס[Em]תדר\n' +
    'בלילות אני מסתובב, הולך ברחוב מוציא כאב\n' +
    'מחפש את התקווה, קורא לאל בתפילה\n' +
    'פזמון';