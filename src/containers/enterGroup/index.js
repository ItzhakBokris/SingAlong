import React, {Component} from 'react';
import {Image, StyleSheet, Text, TextInput, TouchableHighlight, View} from 'react-native';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import {Button, Icon} from 'react-native-elements';
import {Colors} from '../../styles';
import LoadGroup from '../enterGroup/loadGroup'
import {Dialog} from '../../components';

class EnterGroup extends Component {

    state = {
        pinCode: null,
        hintDialogOpened: false
    };

    onSubmitPinCode(event) {
        this.setState({pinCode: event.nativeEvent.text});
    }

    onLoadGroup() {
        this.setState({pinCode: null});
    }

    toggleHintDialog() {
        this.setState({hintDialogOpened: !this.state.hintDialogOpened});
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.content}>
                    <Image
                        style={styles.appLogo}
                        source={require('../../../assets/appLogoTransparent.png')}/>

                    <Text style={styles.appName}>Sing Along</Text>

                    <View style={styles.pinCodeSection}>
                        <TextInput
                            placeholder='Enter Pin Code'
                            returnKeyType='go'
                            returnKeyLabel='go'
                            keyboardType='numeric'
                            enablesReturnKeyAutomatically
                            underlineColorAndroid='transparent'
                            onSubmitEditing={event => this.onSubmitPinCode(event)}
                            style={styles.pinCodeInput}/>

                        <TouchableHighlight style={styles.infoButtonContainer} onPress={() => this.toggleHintDialog()}>
                            <View style={styles.infoButton}>
                                <Text style={styles.infoButtonText}>?</Text>
                            </View>
                        </TouchableHighlight>

                        <Dialog show={this.state.hintDialogOpened} onDismiss={() => this.toggleHintDialog()}>
                            <Text style={styles.pinCodeHint}>
                                ניתן להצטרף לקבוצה באמצעות קוד PIN או באמצעות לחיצה חוזרת על קישור ההזמנה לקבוצה.
                            </Text>
                        </Dialog>
                    </View>

                </View>

                <Button
                    clear
                    text='Open Group'
                    icon={<Icon name='group-add' color='white' size={24}/>}
                    buttonStyle={styles.openGroupButton}
                    onPress={() => Actions.createGroup()}/>

                <LoadGroup pinCode={this.state.pinCode} onLoadGroup={() => this.onLoadGroup()}/>
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
        fontSize: 28,
        marginBottom: 30
    },
    pinCodeSection: {
        justifyContent: 'center'
    },
    pinCodeInput: {
        backgroundColor: 'white',
        width: 200,
        padding: 10,
        borderRadius: 3,
        fontSize: 18,
        textAlign: 'center'
    },
    infoButtonContainer: {
        position: 'absolute',
        right: -40,
        borderRadius: 15,
        width: 30,
        height: 30
    },
    infoButton: {
        flex: 1,
        backgroundColor: Colors.light,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    infoButtonText: {
        color: Colors.dark,
        fontWeight: 'bold',
        fontSize: 24
    },
    pinCodeHint: {
        textAlign: 'center',
        lineHeight: 24
    },
    openGroupButton: {
        marginBottom: 10,
        alignSelf: 'center'
    }
});

export default connect()(EnterGroup);
