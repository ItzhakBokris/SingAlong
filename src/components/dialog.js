import React, {Component} from 'react';
import {Modal, StyleSheet, TouchableWithoutFeedback, View} from 'react-native';
import PropTypes from 'prop-types';

export class Dialog extends Component {

    state = {
        isModalVisible: false
    };

    static propTypes = {
        show: PropTypes.bool,
        closable: PropTypes.bool,
        contentContainerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
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
                            <View style={[styles.modalFrame, this.props.contentContainerStyle]}>
                                {this.props.children}
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
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 0},
        shadowOpacity: 0.5,
        shadowRadius: 10,
        elevation: 10,
        padding: 20
    }
});
