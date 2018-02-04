import React, {Component} from 'react';
import {StatusBar, StyleSheet, View} from 'react-native';
import {Scene, Router} from 'react-native-router-flux';
import {createStore, applyMiddleware} from 'redux'
import {Provider} from 'react-redux';
import ReduxThunk from 'redux-thunk';
import firebase from 'firebase';
import {Styles} from './styles/appTheme';
import EnterGroup from './src/app/onBoarding/enterGroup';
import GroupName from './src/app/onBoarding/openGroup/groupName'
import reducers from './src/reducers';

export default class App extends Component {

    componentWillMount() {
        firebase.initializeApp({
            apiKey: "AIzaSyB36Axani6trF_NlA7ZgJdZpky6DT7199c",
            authDomain: "singalong-6aaf5.firebaseapp.com",
            databaseURL: "https://singalong-6aaf5.firebaseio.com",
            projectId: "singalong-6aaf5",
            storageBucket: "",
            messagingSenderId: "1090194417681"
        });
    }

    render() {
        return (
            <Provider store={createStore(reducers, {}, applyMiddleware(ReduxThunk))}>
                <View style={styles.container}>
                    <StatusBar {...Styles.statusBar}/>

                    <Router {...Styles.navigationBar}>
                        <Scene hideNavBar key='root'>
                            <Scene key='onBoarding'>
                                <Scene
                                    initial
                                    hideNavBar
                                    key='enterGroup'
                                    component={EnterGroup}/>

                                <Scene
                                    backTitle='Back'
                                    key='groupName'
                                    title='New Group'
                                    component={GroupName}/>
                            </Scene>
                        </Scene>
                    </Router>
                </View>
            </Provider>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});
