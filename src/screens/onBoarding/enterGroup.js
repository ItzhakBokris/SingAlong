import React, {Component} from 'react';
import {TextInput, StyleSheet, View, Text} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {Button, Icon} from 'react-native-elements';
import {Colors} from '../../styles/appTheme';

export default class EnterGroup extends Component {

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.content}>
                    <View style={styles.logoContainer}>
                        <Icon
                            size={102}
                            name='headset'
                            color={Colors.primary}/>
                    </View>

                    <Text style={styles.appName}>Sing Along</Text>

                    <TextInput
                        style={styles.pinCode}
                        placeholder='Enter Pin'
                        underlineColorAndroid='transparent'/>
                </View>

                <Button
                    clear
                    text='Open Group'
                    icon={<Icon name='group-add' color='white' size={24}/>}
                    buttonStyle={styles.openGroupButton}
                    onPress={() => Actions.selectSongs()}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.primary
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    appName: {
        textAlign: 'center',
        color: 'white',
        marginTop: 10,
        fontSize: 28
    },
    logoContainer: {
        backgroundColor: 'white',
        width: 120,
        height: 120,
        paddingTop: 10,
        borderRadius: 60,
        alignItems: 'center',
        justifyContent: 'center'
    },
    pinCode: {
        backgroundColor: 'white',
        width: 200,
        padding: 10,
        borderRadius: 3,
        fontSize: 18,
        marginTop: 30,
        textAlign: 'center'
    },
    openGroupButton: {
        marginBottom: 10,
        alignSelf: 'center'
    }
});



