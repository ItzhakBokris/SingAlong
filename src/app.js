import React, {Component} from 'react';
import {UIManager, Platform, I18nManager} from 'react-native';
import {createStore, applyMiddleware} from 'redux'
import {Provider} from 'react-redux';
import ReduxThunk from 'redux-thunk';
import firebase from 'firebase';
import rootReducer from './store/reducer';
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
                <Root />
            </Provider>
        );
    }
}
