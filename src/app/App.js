import React, {Component} from "react";
import {StatusBar, StyleSheet, View, UIManager, Platform} from 'react-native';
import {Scene, Router} from 'react-native-router-flux';
import {createStore, applyMiddleware} from 'redux'
import {Provider} from 'react-redux';
import ReduxThunk from 'redux-thunk';
import firebase from 'firebase';
import {Styles} from '../styles/appTheme';
import EnterGroup from './scenes/onBoarding/enterGroup';
import SelectSongs from './scenes/onBoarding/selectSongs'
import EditGroupName from './scenes/onBoarding/editGroupName'
import EditNickname from './scenes/onBoarding/editNickname'
import reducers from '../reducers/index';
import GroupPage from "./scenes/main/groupPage";

export default class App extends Component {

    constructor() {
        super();
        const {setLayoutAnimationEnabledExperimental} = UIManager;
        if (Platform.OS === 'android' && setLayoutAnimationEnabledExperimental) {
            setLayoutAnimationEnabledExperimental(true);
        }
    }

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

                    <Router {...Styles.navBar}>
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
                                    key='selectSongs'
                                    title='New Group'
                                    component={SelectSongs}/>

                                <Scene
                                    backTitle='Back'
                                    rightTitle='Next'
                                    onRight={() => null}
                                    key='editGroupName'
                                    title='New Group'
                                    component={EditGroupName}/>

                                <Scene
                                    backTitle='Back'
                                    rightTitle='Open'
                                    onRight={() => null}
                                    key='editNickname'
                                    title='New Group'
                                    component={EditNickname}/>
                            </Scene>

                            <Scene key='main' initial={false}>
                                <Scene
                                    initial
                                    key='groupPage'
                                    component={GroupPage}
                                    {...Styles.translucentNavBar}/>
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