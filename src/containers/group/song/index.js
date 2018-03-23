import React, {Component} from 'react';
import {View, StyleSheet, Image, Text, ActivityIndicator, LayoutAnimation} from 'react-native';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import {Icon} from 'react-native-elements';
import {ViewPager} from 'rn-viewpager';
import {Colors} from '../../../styles';
import {changeFontSizeScale, fetchFontSizeScale, fetchSongLyrics} from '../../../store/lyrics/actions';
import {changePlayedSong} from '../../../store/song/actions';
import {showToastMessage} from '../../../utils';
import {SongLyrics} from '../../../components';

const FONT_SIZE_SCALES = [1, 1.1, 1.25, 1.5, 0.33, 0.5, 0.67, 0.75, 0.8, 0.9];

class SongPage extends Component {

    state = {
        isAutoScroll: false,
        showChords: false
    };

    componentWillMount() {
        if (this.props.group) {
            this.goToSong(this.props, this.props.group.currentPlayed);
        }
        this.props.fetchFontSizeScale();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.group !== this.props.group || nextProps.groupSongs !== this.props.groupSongs) {
            this.goToSong(nextProps, nextProps.group.currentPlayed);
        }
    }

    nextSong() {
        const {group, groupSongs, changePlayedSong} = this.props;
        if (group.currentPlayed < groupSongs.length - 1) {
            changePlayedSong(group, group.currentPlayed + 1);
            this.goToSong(this.props, group.currentPlayed + 1);
        }
    }

    previousSong() {
        const {group, changePlayedSong} = this.props;
        if (group.currentPlayed > 0) {
            changePlayedSong(group, group.currentPlayed - 1);
            this.goToSong(this.props, group.currentPlayed - 1);
        }
    }

    onLyricsPress() {
        if (this.state.isAutoScroll) {
            this.setState({isAutoScroll: false});
        }
    }

    playSong() {
        this.setState({isAutoScroll: !this.state.isAutoScroll});
    }

    goToSong(props, songPosition) {
        if (props.groupSongs.length > songPosition) {
            const song = props.groupSongs[songPosition];
            const lyrics = props.lyricsMap[song.lyrics];
            if (!lyrics || lyrics.error) {
                props.fetchSongLyrics(song);
            }
        }
        if (this.pager && this.pager.state.page !== songPosition) {
            this.pager.setPage(songPosition);
            this.setState({isAutoScroll: false});
        }
    }

    showHideChords() {
        this.setState({showChords: !this.state.showChords});
    }

    changeFontSizeScale() {
        const scaleIndex = (1 + FONT_SIZE_SCALES.indexOf(this.props.fontSizeScale)) % FONT_SIZE_SCALES.length;
        const fontSizeScale = FONT_SIZE_SCALES[scaleIndex];
        this.props.changeFontSizeScale(fontSizeScale);
        setTimeout(() => showToastMessage(`Font size: ${fontSizeScale * 100 | 0}%`, 1000));
    }

    getCoverImage() {
        // const {groupSongs, group} = this.props;
        // if (group && groupSongs.length > group.currentPlayed) {
        //     const coverImage = groupSongs[group.currentPlayed].coverImage;
        //     if (coverImage) {
        //         return {uri: coverImage};
        //     }
        // }
        return require('../../../../assets/defaultCover.jpg')
    }

    renderLyrics(song) {
        const lyrics = this.props.lyricsMap[song.lyrics];
        if (!lyrics || !lyrics.text) {
            return (
                <ActivityIndicator style={styles.songLoader}/>
            );
        }
        LayoutAnimation.easeInEaseOut();
        return (
            <SongLyrics
                lyricsText={lyrics.text}
                chordsColor={Colors.blue}
                padding={lyricsWebViewPadding}
                autoScroll={this.state.isAutoScroll}
                fontSizeScale={this.props.fontSizeScale}
                onPress={this.onLyricsPress.bind(this)}
                showChords={this.state.showChords}/>
        );
    }

    renderSong(song) {
        return (
            <View key={song.key}>
                <View style={styles.header}>
                    <Text style={styles.songName} numberOfLines={2} ellipsizeMode='tail'>
                        {song.name}
                    </Text>

                    <Text style={styles.artist} numberOfLines={1} ellipsizeMode='tail'>
                        {song.artist}
                    </Text>

                    <View style={{flexDirection: 'row', marginTop: 10}}>
                        <Text style={{color: Colors.primary}}>23 </Text>
                        <Icon
                            name='heart-outline'
                            type='material-community'
                            size={16}
                            color={Colors.primary}/>

                        <Text style={{color: Colors.primary, marginLeft: 10}}>78 </Text>
                        <Icon
                            type='simple-line-icon'
                            name='microphone'
                            size={16}
                            color={Colors.primary}/>
                    </View>
                </View>

                {this.renderLyrics(song)}
            </View>
        );
    }

    renderGroupSongsPager() {
        if (this.props.groupSongs.length === 0 && this.props.isRequested) {
            return (
                <ActivityIndicator style={styles.songLoader}/>
            );
        }
        return (
            <ViewPager
                keyboardShouldPersistTaps='handled'
                style={styles.container}
                ref={component => this.pager = component}
                horizontalScroll={false}
                scrollEnabled={false}>

                {this.props.groupSongs.map(this.renderSong.bind(this))}
            </ViewPager>
        );
    }

    renderSongControlButtons() {
        return (
            <View style={styles.songsControlButtons}>
                {this.props.isAdmin && (<Icon
                    name='step-backward'
                    onPress={this.previousSong.bind(this)}
                    {...songsControlButtonStyle}/>)}

                <Icon
                    onPress={this.playSong.bind(this)}
                    {...songsControlButtonStyle}
                    {...getPlayPauseButtonStyle(!this.state.isAutoScroll)}/>

                {this.props.isAdmin && (<Icon
                    name='step-forward'
                    onPress={this.nextSong.bind(this)}
                    {...songsControlButtonStyle}/>)}
            </View>
        );
    }

    renderSideButtons() {
        return (
            <View style={styles.sideButtons}>
                <Icon
                    name='account-circle'
                    type='material-community'
                    onPress={() => Actions.groupDetails()}
                    containerStyle={styles.sideButtonContainer}
                    {...iconButtonStyle}/>

                <Icon
                    name={'music-note' + (this.state.showChords ? '-off' : '')}
                    type='material-community'
                    onPress={this.showHideChords.bind(this)}
                    containerStyle={styles.sideButtonContainer}
                    {...iconButtonStyle}/>

                <Icon
                    name='format-size'
                    type='material-community'
                    onPress={this.changeFontSizeScale.bind(this)}
                    containerStyle={styles.sideButtonContainer}
                    {...iconButtonStyle}/>
            </View>
        );
    }

    renderFooterButtons() {
        if (this.props.groupSongs.length > 0) {
            return (
                <View style={styles.footerButtons}>
                    <Icon
                        name='playlist-plus'
                        type='material-community'
                        onPress={() => Actions.addSongs()}
                        containerStyle={styles.footerButtonContainer}
                        {...iconButtonStyle}/>

                    {this.renderSongControlButtons()}

                    <Icon
                        name='playlist-play'
                        type='material-community'
                        onPress={() => Actions.playlist()}
                        containerStyle={styles.footerButtonContainer}
                        {...iconButtonStyle}/>
                </View>
            );
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Image
                    style={styles.coverImageStyle}
                    source={this.getCoverImage()}/>

                <View style={styles.foreground}>
                    {this.renderGroupSongsPager()}
                    {this.renderSideButtons()}
                    {this.renderFooterButtons()}
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
    foreground: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.6)'
    },
    songLoader: {
        marginTop: 50
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
    footerButtons: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 10
    },
    songsControlButtons: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    sideButtons: {
        position: 'absolute',
        width: 60,
        right: 0,
        top: 28
    },
    sideButtonContainer: {
        marginBottom: 20
    },
    footerButtonContainer: {
        width: 60
    }
});

const iconButtonStyle = {
    size: 28,
    underlayColor: 'transparent',
    color: 'white'
};

const songsControlButtonStyle = {
    reverse: true,
    type: 'font-awesome',
    size: 16,
    color: Colors.primary
};

const getPlayPauseButtonStyle = (isPlay) => ({
    name: isPlay ? 'play' : 'pause',
    size: 28,
    containerStyle: {marginHorizontal: 12},
    iconStyle: isPlay ? {marginLeft: 5} : null
});

const lyricsWebViewPadding = {vertical: 10, horizontal: 50};

const mapStateToProps = (state) => ({
    ...state.groupData,
    ...state.songData,
    ...state.lyricsData,
    isAdmin: state.groupData.group && state.userData.nickname === state.groupData.group.creator
});

const actions = {
    fetchSongLyrics,
    changePlayedSong,
    fetchFontSizeScale,
    changeFontSizeScale
};

export default connect(mapStateToProps, actions)(SongPage);

