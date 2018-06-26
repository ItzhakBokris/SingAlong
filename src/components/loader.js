import React, {Component} from 'react';
import {ActivityIndicator, StyleSheet, Text} from 'react-native';
import PropTypes from 'prop-types';
import {Dialog} from './dialog';

export class Loader extends Component {

    static propTypes = {
        message: PropTypes.string,
        show: PropTypes.bool,
        onDismiss: PropTypes.func
    };

    static defaultProps = {
        show: false,
        onDismiss: () => null
    };

    renderMessage() {
        if (this.props.message) {
            return (
                <Text style={styles.message}>{this.props.message}</Text>
            );
        }
    }

    render() {
        return (
            <Dialog show={this.props.show}
                    onDismiss={this.props.onDismiss}
                    contentContainerStyle={styles.contentContainerStyle}>

                {this.renderMessage()}
                <ActivityIndicator/>
            </Dialog>
        );
    }
}

const styles = StyleSheet.create({
    contentContainerStyle: {
        width: 250,
        minHeight: 70
    },
    message: {
        marginBottom: 20
    }
});
