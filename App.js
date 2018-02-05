import React, {Component} from "react";
import {StatusBar, StyleSheet, View} from "react-native";
import {Scene, Router} from 'react-native-router-flux';
import {createStore, applyMiddleware} from 'redux'
import {Provider} from 'react-redux';
import ReduxThunk from 'redux-thunk';
import firebase from 'firebase';
import {Styles} from './styles/appTheme';
import EnterGroup from './src/app/onBoarding/enterGroup';
import EditGroupName from './src/app/onBoarding/editGroupName'
import EditNickname from './src/app/onBoarding/editNickname'
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
                                    rightTitle='Next'
                                    onRight={() => null}
                                    key='editNickname'
                                    title='New Group'
                                    component={EditNickname}/>

                                <Scene
                                    backTitle='Back'
                                    rightTitle='Open'
                                    onRight={() => null}
                                    key='editGroupName'
                                    title='New Group'
                                    component={EditGroupName}/>
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