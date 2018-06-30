import React, {Component} from 'react';
import {ActivityIndicator, Image, LayoutAnimation, Platform, StyleSheet, Text, View} from 'react-native';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import KeepAwake from 'react-native-keep-awake';
import {Icon} from 'react-native-elements';
import {ViewPager} from 'rn-viewpager';
import {Colors} from '../../../styles';
import {changeFontSizeScale, fetchSongLyrics, showChords} from '../../../store/lyrics/actions';
import {changePlayedSong} from '../../../store/song/actions';
import {showToastMessage} from '../../../utils';
import {SongLyrics} from '../../../components';
import {fetchGroup} from '../../../store/group/actions';
import RateAppDialog from '../../rateAppDialog'

//const FONT_SIZE_SCALES = [1, 1.1, 1.25, 1.5, 1.75, 2, 0.5, 0.67, 0.75, 0.8, 0.9];
const FONT_SIZE_SCALES = [1, 1.5, 2, 0.5, 0.75];

class SongPage extends Component {

    state = {
        isAutoScroll: false,
        showRateAppDialog: false,
        showLyrics: true
    };

    componentWillMount() {
        if (this.props.group) {
            if (this.props.isSynchronized) {
                this.goToCurrentSong(this.props);
            } else {
                this.props.fetchGroup(this.props.group.key);
            }
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.group !== this.props.group || nextProps.groupSongs !== this.props.groupSongs) {
            this.goToCurrentSong(nextProps, true);
        }
        if (nextProps.stepsBeforeRate !== this.props.stepsBeforeRate && !nextProps.rating && !nextProps.feedback) {
            this.setState({showRateAppDialog: nextProps.stepsBeforeRate === 0});
        }
    }

    nextSong() {
        const {group, groupSongs, changePlayedSong} = this.props;
        if (group.currentPlayed < groupSongs.length - 1) {
            changePlayedSong(group, group.currentPlayed + 1);
            this.fetchLyrics(this.props, group.currentPlayed + 1);
            this.setState({isAutoScroll: false});
        }
    }

    previousSong() {
        const {group, changePlayedSong} = this.props;
        if (group.currentPlayed > 0) {
            changePlayedSong(group, group.currentPlayed - 1);
            this.fetchLyrics(this.props, group.currentPlayed - 1);
            this.setState({isAutoScroll: false});
        }
    }

    stopAutoScroll() {
        if (this.state.isAutoScroll) {
            this.setState({isAutoScroll: false});
        }
    }

    toggleAutoScroll() {
        this.setState({isAutoScroll: !this.state.isAutoScroll});
    }

    goToCurrentSong(props, withDelay) {
        this.fetchLyrics(props, props.group.currentPlayed);
        if (this.pager && this.pager.state.page !== props.group.currentPlayed) {
            this.setState({isAutoScroll: false});
            this.pager.setPage(props.group.currentPlayed);
            if (withDelay) {
                this.setState({showLyrics: false});
                setTimeout(() => this.setState({showLyrics: true}));
            }
        }
    }

    fetchLyrics(props, songPosition) {
        if (props.groupSongs.length > songPosition) {
            const song = props.groupSongs[songPosition];
            const lyrics = props.lyricsMap[song.lyrics];
            if (!lyrics || lyrics.error) {
                props.fetchSongLyrics(song);
            }
        }
    }

    showHideChords() {
        this.props.showChords(!this.props.chordsShown);
    }

    likeSong() {

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

    renderLyrics(song, index) {
        const {lyricsMap, group, fontSizeScale, chordsShown} = this.props;
        const lyrics = lyricsMap[song.lyrics];
        const isCurrentPlayed = group && index === group.currentPlayed;
        LayoutAnimation.easeInEaseOut();
        if (!this.state.showLyrics || !isCurrentPlayed || !lyrics || !lyrics.text) {
            return (
                <ActivityIndicator style={styles.songLoader}/>
            );
        }
        return (
            <SongLyrics
                lyricsText={lyrics.text}
                chordsColor={Colors.blue}
                autoScroll={this.state.isAutoScroll}
                fontSizeScale={fontSizeScale}
                showChords={chordsShown}
                containerStyle={styles.lyricsContainer}
                onUserScroll={this.stopAutoScroll.bind(this)}
                onEndReached={this.stopAutoScroll.bind(this)}/>
        );
    }

    renderSong(song, index) {
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
                        {/*<Text style={{color: Colors.light}}>{song.likesCount} </Text>*/}
                        {/*<Icon*/}
                        {/*type='material-community'*/}
                        {/*name='heart-outline'*/}
                        {/*size={16}*/}
                        {/*color={Colors.light}*/}
                        {/*onPress={this.likeSong.bind(this)}/>*/}

                        <Text style={{color: Colors.light, marginLeft: 10}}>{song.viewsCount} </Text>
                        <Icon
                            type='material-community'
                            name='microphone-variant'
                            size={16}
                            color={Colors.light}/>
                    </View>
                </View>

                {this.renderLyrics(song, index)}
            </View>
        );
    }

    onSongsPagerReady(component) {
        this.pager = component;
        if (this.props.group) {
            this.goToCurrentSong(this.props);
        }
    }

    renderGroupSongsPager() {
        if (this.props.groupSongs.length === 0 && this.props.isRequested) {
            return (
                <ActivityIndicator style={styles.songLoader}/>
            );
        }
        return (
            <ViewPager
                initialPage={Platform.OS === 'android' && this.props.group.currentPlayed}
                keyboardShouldPersistTaps='handled'
                style={styles.container}
                ref={this.onSongsPagerReady.bind(this)}
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
                    onPress={this.toggleAutoScroll.bind(this)}
                    {...songsControlButtonStyle}
                    {...getAutoScrollButtonStyle(!this.state.isAutoScroll)}/>

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
                    name={'music-note' + (this.props.chordsShown ? '-off' : '')}
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

                <RateAppDialog show={this.state.showRateAppDialog}/>
                <KeepAwake/>
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
    lyricsContainer: {
        paddingVertical: 10,
        paddingHorizontal: 50
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

const getAutoScrollButtonStyle = (isPlay) => ({
    type: 'entypo',
    name: isPlay ? 'select-arrows' : 'controller-paus',
    size: 28
});

const mapStateToProps = (state) => ({
    ...state.groupData,
    ...state.songData,
    ...state.lyricsData,
    ...state.userData,
    ...state.appData,
    isAdmin: state.groupData.group && state.userData.nickname === state.groupData.group.admin
});

const actions = {
    fetchSongLyrics,
    changePlayedSong,
    changeFontSizeScale,
    showChords,
    fetchGroup
};

export default connect(mapStateToProps, actions)(SongPage);

