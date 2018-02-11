import React, {Component} from 'react';
import {Text, View, StyleSheet, Image, StatusBar} from 'react-native';
import PropTypes from 'prop-types';
import {Colors, Styles} from '../../styles/appTheme';

export default class SongPage extends Component {

    static propTypes = {
        song: PropTypes.object.isRequired
    };

    render() {
        return (
            <View style={styles.container}>
                <StatusBar {...Styles.translucentStatusBar}/>

                <Image
                    style={styles.coverImageStyle}
                    source={{uri: this.props.song.coverImage}}
                    blurRadius={Styles.blurRadius}/>

                <View style={styles.songTextContainer}>
                    {/*<Text style={styles.name}>{this.props.song.name}</Text>*/}
                    {/*<Text style={styles.artist}>{this.props.song.artist}</Text>*/}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    coverImageStyle: {
        position: 'absolute',
        resizeMode: 'cover',
        width: '100%',
        height: '100%'
    },
    songTextContainer: {
        flex: 1,
        padding: 10,
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        color: Colors.primary
    },
    artist: {
        fontSize: 18,
        color: 'white',
        fontWeight: 'bold'
    }
});