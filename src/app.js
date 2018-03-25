import React, {Component} from 'react';
import {UIManager, Platform, I18nManager, View, Text} from 'react-native';
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
                {/*<View style={{flex: 1, backgroundColor: '#555'}}>*/}
                    {/*<SongLyrics*/}
                        {/*showChords*/}
                        {/*lyricsText={lyrics}*/}
                        {/*autoScroll*/}
                        {/*containerStyle={{paddingVertical: 30, paddingHorizontal: 50}}/>*/}
                {/*</View>*/}



                <Root/>
            </Provider>
        );
    }
}

const lyrics = 'I\'m s[F#m]tanding on the bridge\n' +
    'I\'m w[D5]aiting in the dark\n' +
    'I t[F#m]hought that you\'d be here by n[D5]ow\n' +
    'There\'s n[F#m]othing but the rain\n' +
    'No f[D5]ootsteps on the ground\n' +
    'I\'m l[F#m]istening but there\'s no s[D5]ound\n' +
    '[E]Isn\'t anyone trying to f[D]ind me\n' +
    '[E]Won\'t somebody come take me h[D]ome\n' +
    'Chorus:\n' +
    '[D]It\'s a [A]damn [Bm]cold [D]night\n' +
    '[D]Trying to figure [A]out [Bm]this [D]life\n' +
    '[D]Won\'t you [A]  take me by the h[Bm]and take me s[D]omewhere new\n' +
    '[D]I don\'t k[F#m]now who you [E]are but [D]I\n' +
    '[D]I\'m with [F#m]you  [D] \n' +
    '[D]I\'m with [F#m]you  [D] \n' +
    'I\'m l[F#m]ooking for a place\n' +
    'I\'m s[D5]earching for a face\n' +
    'Is [F#m]anybody here I kn[D5]ow\n' +
    'Cause n[F#m]othing\'s going right\n' +
    'And [D5]everything\'s a mess\n' +
    'And [F#m]no one likes to be al[D5]one\n' +
    '[E]Isn\'t anyone trying to f[D]ind me\n' +
    '[E]Won\'t somebody come take me h[D]ome\n' +
    'Repeat Chorus\n' +
    'yeah y[D]eah...\n' +
    'Oh,[E] why is everything so conf[Bm]using\n' +
    '[E]Maybe I\'m just out of my m[Bm]ind\n' +
    'Yeah y[E]eah yeah yeah yeah\n' +
    'Y[D]eah yeah yeah yeah\n' +
    'Y[C#m]eah  [E] \n' +
    'Repeat Chorus\n' +
    '[A]Take me by the han[Bm]d take me som[D]ewhere new\n' +
    '[D]I don\'t k[F#m]now who you [E]are but [D]I\n' +
    '[D]I\'m with y[A]ou[Bm]   [D] \n' +
    '[D]I\'m with y[A]ou[Bm]   [D] \n' +
    '[A]Take me by the han[Bm]d take me som[D]ewhere new\n' +
    '[D]I don\'t k[F#m]now who you [E]are but [D]I\n' +
    '[D]I\'m with [F#m]you  [D] \n' +
    '[D]I\'m with [F#m]you  [D] \n' +
    '[D]I\'m with y[A]ou\n';


const lyrics2 = '[Am]מה אני עושה פה בל[Dm]עדייך\n' +
    '[E]אין לי כלום מלבד הא[Am]הבה\n' +
    '[F]כל הערב מחייג א[Dm]לייך\n' +
    '[Dm]את לא עו[E]נה\n' +
    '[Am]הסתגרתי לי לבד[Dm] בחדר\n' +
    '[E]כמו משוגע הולך מפה [Am]לשם\n' +
    'החי[F]ים איבדו כיוון [Dm]וסדר\n' +
    'אי[Dm]ן לי עני[E]ין\n' +
    'פזמון:\n' +
    'אלו[C]היי אלוהיי אלו[G]הים\n' +
    'א[Dm]ני לא יודע [Am]לאן\n' +
    'אלו[Am]היי אלוהיי אלו[G]הים\n' +
    '[Dm]אם תתן לי קצת ז[E]מן\n' +
    'האורות כבים בחלונות\n' +
    'אנשים חולמים על המחר\n' +
    'לא יכול לישון רוצה לבכות\n' +
    'עצוב לי וקר\n' +
    'ופתאום צלצול ואת בדלת\n' +
    'מתנצל, אומר , מתנצל\n' +
    'את אהובתי ואין אחרת\n' +
    'לילה ערפל\n' +
    'פזמון\n' +
    'רק א[C]יתך אל[Dm]ך לשוטט[G] בעול[C]ם\n' +
    'לא[Em] יודע אי[F]ך\n' +
    'לא י[Dm]ודע לא[E]ן\n' +
    'אנג[C]ן לך[Dm] שיר\n' +
    'אז[G]מזם פ[C]זמון\n' +
    '[Em]את אה[F]בתי\n' +
    'עד [Dm]יומי הא[E]חרון\n' +
    'פזמון\n';


