import React, {Component} from 'react';
import {Image, TextInput, StyleSheet, View, Text} from 'react-native';
import {Actions} from "react-native-router-flux";
import {Button} from "react-native-elements";
import {Colors} from '../styles/appTheme';

export default class WelcomeComponent extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Image
                    style={styles.backgroundImage}
                    source={require('../assets/welcomeBackground.jpg')}/>

                <View>
                    <Text style={styles.title}>Sing{'\n'}Together</Text>
                    <TextInput
                        style={styles.pinCode}
                        placeholder='Pin Code'
                        underlineColorAndroid='transparent'/>
                </View>

                <Button
                    rounded
                    backgroundColor={Colors.primary}
                    icon={{name: 'group-add', size: 24}}
                    buttonStyle={styles.openGroupButton}
                    onPress={() => Actions.openGroup()}
                    title='Open Group'/>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between'
    },
    backgroundImage: {
        width: '100%',
        height: '100%',
        position: 'absolute'
    },
    title: {
        marginTop: 120,
        textAlign: 'center',
        color: 'white',
        fontSize: 56,
        fontWeight: 'bold',
        textShadowColor: Colors.primary,
        textShadowOffset: {width: 1, height: 1},
        textShadowRadius: 5
    },
    pinCode: {
        color: Colors.primary,
        fontSize: 24,
        marginTop: 50,
        textAlign: 'center',
        fontWeight: 'bold',
        padding: 10,
        borderRadius: 4,
        borderColor: 'white'
    },
    openGroupButton: {
        marginBottom: 50,
        alignSelf: 'center'
    }
});



