import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import PropTypes from 'prop-types';

export class Section extends Component {

    static propTypes = {
        containerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number])
    };

    static defaultProps = {
        containerStyle: {}
    };

    render() {
        return (
            <View style={[styles.container, this.props.containerStyle]}>
                {this.props.children}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 15,
        paddingVertical: 10,
        backgroundColor: 'white',
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2
    }
});
