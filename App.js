import {Scene, Router} from "react-native-router-flux";
import React, {Component} from "react";
import WelcomeComponent from "./src/welcomeComponent";
import OpenGroupComponent from "./src/openGroupComponent";
import {Colors} from "./styles/appTheme";
import {StatusBar, StyleSheet, View} from "react-native";

export default class App extends Component {
    render() {
        return (
            <View style={styles.container}>
                <StatusBar
                    barStyle="light-content"
                    backgroundColor={Colors.dark}/>

                <Router
                    navigationBarStyle={styles.navigationBar}
                    titleStyle={styles.navigationBarTitle}>

                    <Scene key='onBoarding'>
                        <Scene
                            key='welcome'
                            title='Welcome'
                            hideNavBar
                            component={WelcomeComponent}/>

                        <Scene
                            key='openGroup'
                            title='New Group'
                            component={OpenGroupComponent}/>
                    </Scene>
                </Router>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    navigationBar: {
        backgroundColor: Colors.primary
    },
    navigationBarTitle: {
        color: 'white'
    },
    navigationButton: {
        color: 'white'
    }


    // return color(this.toolbarDefaultBg)
    //     .darken(0.2)
    //     .hex();
});
