import React, {Component} from 'react';
import {View, StyleSheet, Image, StatusBar, Text, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Icon} from 'react-native-elements';
import {Colors, Styles} from '../../styles/appTheme';
import {fetchLyrics} from '../../actions';

class SongPage extends Component {

    static propTypes = {
        song: PropTypes.object.isRequired
    };

    componentWillMount() {
        this.props.fetchLyrics(this.props.song);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.song !== this.props.song) {
            this.props.fetchLyrics(nextProps.song);
        }
    }

    render() {
        if (!this.props.lyrics) {
            // TODO: show loader
            return <View></View>
        }
        return (
            <View style={styles.container}>
                <StatusBar {...Styles.translucentStatusBar}/>

                <Image
                    style={styles.coverImageStyle}
                    source={this.getCoverImage()}/>

                <View style={styles.foreground}>
                    <View style={styles.header}>
                        <Text style={styles.songName} numberOfLines={2} ellipsizeMode='tail'>
                            {this.props.song.name}
                        </Text>

                        <Text style={styles.artist} numberOfLines={1} ellipsizeMode='tail'>
                            {this.props.song.artist}
                        </Text>

                        <View style={{flexDirection: 'row', marginTop: 10}}>
                            <Text style={{color:Colors.primary}}>23 </Text>
                            <Icon
                                name='heart-outline'
                                type='material-community'
                                size={16}
                                color={Colors.primary}/>

                            <Text style={{color:Colors.primary, marginLeft:10}}>78 </Text>
                            <Icon
                                type='simple-line-icon'
                                name='microphone'
                                size={16}
                                color={Colors.primary}/>
                        </View>
                    </View>

                    <ScrollView>
                        <Text style={styles.lyrics}>{this.props.lyrics.text}</Text>
                    </ScrollView>

                    <View style={styles.sideButtons}>
                        <Icon
                            name='music-note'
                            type='material-community'
                            size={28}
                            containerStyle={{marginBottom:15}}
                            color='white'/>

                        <Icon
                            name='format-size'
                            type='material-community'
                            size={28}
                            color='white'/>
                    </View>

                    <View style={styles.footerButtons}>
                        <Icon
                            name='playlist-plus'
                            type='material-community'
                            size={28}
                            containerStyle={styles.iconContainer}
                            color='white'/>

                        <Icon
                            reverse
                            name='play'
                            type='font-awesome'
                            size={28}
                            iconStyle={{marginLeft: 5}}
                            color={Colors.primary}/>

                        <Icon
                            name='playlist-play'
                            type='material-community'
                            size={28}
                            containerStyle={styles.iconContainer}
                            color='white'/>

                        {/*<Icon*/}
                        {/*name='playlist-plus'*/}
                        {/*type='material-community'*/}
                        {/*size={28}*/}
                        {/*color={Colors.lighter}*/}
                        {/*/>*/}

                        {/*<Icon*/}
                        {/*name='account-plus-outline'*/}
                        {/*type='material-community'*/}
                        {/*size={28}*/}
                        {/*color={Colors.lighter}*/}
                        {/*/>*/}

                    </View>
                </View>
            </View>
        );
    }

    getCoverImage() {
        console.log(this.props.song);
        if (this.props.song.coverImage) {
            return {uri: this.props.song.coverImage};
        }
        return require('../../../assets/defaultCover.jpg')
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
    foreground: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.6)'
    },
    header: {
        alignItems: 'center',
        paddingTop: 30,
        paddingBottom: 10,
        paddingHorizontal: 60
    },
    songName: {
        fontSize: 20,
        color: 'white',
        textAlign: 'center'
    },
    artist: {
        color: 'white',
        textAlign: 'center',
        fontSize: 14,
        marginTop: 4
    },
    lyrics: {
        alignSelf: 'center',
        paddingVertical: 10,
        paddingHorizontal: 60,
        color: Colors.lighterTextColor,
        textAlign: 'center',
        lineHeight: 34,
        fontSize: 21
    },
    footerButtons: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 10
    },
    sideButtons: {
        position: 'absolute',
        width: 60,
        right: 0,
        //bottom: 100,
        top: 33
    },
    iconContainer: {
        width: 60
    }
});

const mapStateToProps = (state) => ({...state.songData});

export default connect(mapStateToProps, {fetchLyrics})(SongPage);

