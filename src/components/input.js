import React, {Component} from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import PropTypes from 'prop-types';
import {Icon} from 'react-native-elements';
import {Platform} from 'react-native';
import {Colors} from '../styles';

export class Input extends Component {

    static propTypes = {
        value: PropTypes.string,
        placeholder: PropTypes.string,
        onChangeText: PropTypes.func
    };

    static defaultProps = {
        onChangeText: () => null
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.nameInputContainer}>
                    <Icon
                        size={24}
                        type='entypo'
                        name='pencil'
                        color={Platform.OS !== 'ios' ? Colors.primary : Colors.lightTextColor}/>

                    <TextInput
                        underlineColorAndroid='transparent'
                        style={styles.nameInput}
                        placeholderTextColor={Colors.lightTextColor}
                        placeholder={this.props.placeholder}
                        value={this.props.value}
                        onChangeText={this.props.onChangeText.bind(this)}/>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: 'white',
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2
    },
    nameInput: {
        flex: 1,
        fontSize: 18,
        height: 45,
        marginHorizontal: 10
    },
    nameInputContainer: {
        flexDirection: 'row',
        borderBottomWidth: Platform.OS !== 'ios' ? 2 : 1,
        paddingHorizontal: 10,
        marginVertical: 10,
        borderColor: Platform.OS !== 'ios' ? Colors.primary : 'lightgrey'
    }
});
