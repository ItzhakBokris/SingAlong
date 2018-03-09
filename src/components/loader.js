import React, {Component} from 'react';
import {View, StyleSheet, Text, ActivityIndicator, Modal, TouchableWithoutFeedback} from 'react-native';
import PropTypes from 'prop-types';

export class Loader extends Component {

    state = {
        isModalVisible: true
    };

    static propTypes = {
        message: PropTypes.string,
        show: PropTypes.bool,
        closable: PropTypes.bool,
        onDismiss: PropTypes.func
    };

    static defaultProps = {
        closable: true,
        show: true,
        onDismiss: () => null
    };

    componentWillMount() {
        this.setState({isModalVisible: this.props.show});
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.show !== this.props.show) {
            this.setState({isModalVisible: nextProps.show});
        }
    }

    onRequestClose(): void {
        if (this.props.closable) {
            this.setState({isModalVisible: false});
        }
    }

    renderMessage() {
        if (this.props.message) {
            return (
                <Text style={styles.message}>{this.props.message}</Text>
            );
        }
    }

    render() {
        return (
            <Modal animationType="fade"
                   transparent={true}
                   visible={this.state.isModalVisible}
                   onDismiss={this.props.onDismiss}
                   onRequestClose={this.onRequestClose.bind(this)}>

                <TouchableWithoutFeedback onPress={this.onRequestClose.bind(this)}>
                    <View style={styles.container}>
                        <TouchableWithoutFeedback>
                            <View style={styles.modalFrame}>
                                {this.renderMessage()}
                                <ActivityIndicator/>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#00000077',
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalFrame: {
        padding: 20,

        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        width: 250,
        minHeight: 70,
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 0},
        shadowOpacity: 0.5,
        shadowRadius: 10,
        elevation: 10
    },
    message: {
        marginBottom: 20
    }
});
