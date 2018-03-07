import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import PropTypes from 'prop-types';

export class Section extends Component {

    static propTypes = {
        firstChild: PropTypes.bool,
        containerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
    };

    static defaultProps = {
        containerStyle: {}
    };

    getStyle() {
        return [
            styles.container,
            this.props.containerStyle,
            this.props.firstChild ? styles.firstChildContainer : null
        ];
    }

    render() {
        return (
            <View style={this.getStyle()}>
                {this.props.children}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 15,
        paddingVertical: 10,
        backgroundColor: 'white',
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2
    },
    firstChildContainer: {
        marginTop: 0
    }
});
