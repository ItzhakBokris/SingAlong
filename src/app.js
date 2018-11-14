import React, {Component} from 'react';
import {I18nManager, Platform, UIManager, View} from 'react-native';
import {applyMiddleware, createStore} from 'redux'
import {Provider} from 'react-redux';
import ReduxThunk from 'redux-thunk';
import firebase from 'firebase';
import throttle from 'lodash/throttle';
import rootReducer from './store/reducer';
import Root from './containers/root';
import {loadAppState, saveAppState} from './utils';
import {APP_ENTER} from './store/app/actionTypes';

export default class App extends Component {

    state = {
        store: null,
        isGroupConnected: false,
        isNotFirstEntry: false
    };

    constructor() {
        super();
        const {setLayoutAnimationEnabledExperimental} = UIManager;
        if (Platform.OS === 'android' && setLayoutAnimationEnabledExperimental) {
            setLayoutAnimationEnabledExperimental(true);
        }
        try {
            I18nManager.allowRTL(false);
        } catch (error) {
            console.log(error);
        }
    }

    componentWillMount() {
        if (firebase.apps.length === 0) {
            firebase.initializeApp({
                apiKey: 'AIzaSyB36Axani6trF_NlA7ZgJdZpky6DT7199c',
                authDomain: 'singalong-6aaf5.firebaseapp.com',
                databaseURL: 'https://singalong-6aaf5.firebaseio.com',
                projectId: 'singalong-6aaf5',
                storageBucket: '',
                messagingSenderId: '1090194417681'
            });
        }
        loadAppState(state => {
            const store = createStore(rootReducer, state, applyMiddleware(ReduxThunk));
            store.subscribe(throttle(() => saveAppState(store.getState()), 1000));
            this.setState({
                store,
                isNotFirstEntry: state.appData && state.appData.isNotFirstEntry,
                isGroupConnected: state.groupData && !!state.groupData.group
            });
            store.dispatch({type: APP_ENTER});
        });
    }

    render() {
        if (this.state.store) {
            return (
                <Provider store={this.state.store}>
                    <Root isNotFirstEntry={this.state.isNotFirstEntry}
                          isGroupConnected={this.state.isGroupConnected}/>
                </Provider>
            );
        }
        return (
            <View/>
        );
    }
}
