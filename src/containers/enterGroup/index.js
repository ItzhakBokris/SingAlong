import React, {Component} from 'react';
import {TextInput, StyleSheet, View, Text} from 'react-native';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import {Button, Icon} from 'react-native-elements';
import {Colors} from '../../styles';
import {fetchGroupByPinCode} from '../../store/group/actions';
import {showError} from '../../utils';

class EnterGroup extends Component {

    state = {
        pinCodeSubmitted: false
    };

    componentWillReceiveProps(nextProps) {
        if (this.state.pinCodeSubmitted) {
            if (nextProps.isRequested) {
                // TODO: show loading in the pin-code input
            } else {
                this.setState({pinCodeSubmitted: false});
                if (!nextProps.error) {
                    Actions.joinGroup();
                } else {
                    // TODO: check the error
                    showError('Wrong pin code, please try again');
                }
            }
        }
    }

    onSubmitPinCode(event) {
        this.setState({pinCodeSubmitted: true});
        this.props.fetchGroupByPinCode(event.nativeEvent.text);
    }

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
                        style={styles.pinCodeInput}
                        placeholder='Enter Pin Code'
                        returnKeyType='go'
                        returnKeyLabel='go'
                        enablesReturnKeyAutomatically
                        onSubmitEditing={this.onSubmitPinCode.bind(this)}
                        underlineColorAndroid='transparent'/>
                </View>

                <Button
                    clear
                    text='Open Group'
                    icon={<Icon name='group-add' color='white' size={24}/>}
                    buttonStyle={styles.openGroupButton}
                    onPress={() => Actions.createGroup()}/>
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

const mapStateToProps = (state) => ({...state.groupData, ...state.userData});

export default connect(mapStateToProps, {fetchGroupByPinCode})(EnterGroup);
