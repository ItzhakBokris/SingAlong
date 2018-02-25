import React, {Component} from "react";
import {StatusBar, StyleSheet, View, UIManager, Platform, I18nManager} from 'react-native';
import {Scene, Router} from 'react-native-router-flux';
import {createStore, applyMiddleware} from 'redux'
import {Provider} from 'react-redux';
import ReduxThunk from 'redux-thunk';
import firebase from 'firebase';
import {Styles} from './styles';
import rootReducer from './store/reducer';
import EnterGroup from './containers/enterGroup';
import CreateGroup from './containers/createGroup'
import SongPage from './containers/group/song'
import Playlist from "./containers/group/playlist";
import AddSongs from "./containers/group/addSongs";

export default class App extends Component {

    constructor() {
        super();
        const {setLayoutAnimationEnabledExperimental} = UIManager;
        if (Platform.OS === 'android' && setLayoutAnimationEnabledExperimental) {
            setLayoutAnimationEnabledExperimental(true);
        }
        try {
            I18nManager.allowRTL(false);
        } catch (e) {
            console.log(e);
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
            <Provider store={createStore(rootReducer, {}, applyMiddleware(ReduxThunk))}>
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
                                    key='createGroup'
                                    title='New Group'
                                    component={CreateGroup}/>
                            </Scene>

                            <Scene key='main' initial={false}>
                                <Scene
                                    initial
                                    key='songPage'
                                    component={SongPage}
                                    {...Styles.translucentNavBar}/>

                                <Scene
                                    backTitle='Back'
                                    key='playlist'
                                    title='Group Playlist'
                                    component={Playlist}/>

                                <Scene
                                    backTitle='Back'
                                    rightTitle='Add'
                                    onRight={() => null}
                                    key='addSongs'
                                    title='Add Songs'
                                    component={AddSongs}/>
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