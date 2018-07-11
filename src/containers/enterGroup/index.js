import React, {Component} from 'react';
import {Image, StyleSheet, Text, TextInput, View} from 'react-native';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import {Button, Icon} from 'react-native-elements';
import {Colors} from '../../styles';
import LoadGroup from '../enterGroup/loadGroup'

class EnterGroup extends Component {

    state = {
        pinCode: null
    };

    onSubmitPinCode(event) {
        this.setState({pinCode: event.nativeEvent.text});
    }

    onLoadGroup() {
        this.setState({pinCode: null});
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.content}>
                    <Image
                        style={styles.appLogo}
                        source={require('../../../assets/appLogo.png')}/>

                    <Text style={styles.appName}>Sing Along</Text>

                    <TextInput
                        placeholder='Enter Pin Code'
                        returnKeyType='go'
                        returnKeyLabel='go'
                        enablesReturnKeyAutomatically
                        underlineColorAndroid='transparent'
                        onSubmitEditing={this.onSubmitPinCode.bind(this)}
                        style={styles.pinCodeInput}/>
                </View>

                <Button
                    clear
                    text='Open Group'
                    icon={<Icon name='group-add' color='white' size={24}/>}
                    buttonStyle={styles.openGroupButton}
                    onPress={() => Actions.createGroup()}/>

                <LoadGroup pinCode={this.state.pinCode} onLoadGroup={this.onLoadGroup.bind(this)}/>
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
    appLogo: {
        resizeMode: 'contain',
        height: 150
    },
    appName: {
        textAlign: 'center',
        color: 'white',
        marginTop: 15,
        fontSize: 28
    },
    pinCodeInput: {
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

export default connect()(EnterGroup);
