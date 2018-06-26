import React, {Component} from 'react';
import {Alert, Platform, View} from 'react-native';
import {connect} from 'react-redux';
import {SongList} from '../../../components';
import {changePlayedSong, removeSongFromGroup} from '../../../store/song/actions';
import {Actions} from 'react-native-router-flux';

class Playlist extends Component {

    onSongPress(song, songIndex) {
        if (this.props.isAdmin) {
            this.props.changePlayedSong(this.props.group, songIndex);
            Actions.pop();
        }
    }

    onSongLongPress(song, songIndex) {
        const {isAdmin, groupSongs, group, removeSongFromGroup} = this.props;
        if (isAdmin && groupSongs.length > 1) {
            const text = 'Do you wan to remove the song?';
            Alert.alert(
                Platform.OS === 'ios' && text,
                Platform.OS === 'android' && text,
                [
                    {text: 'Cancel', onPress: null, style: 'cancel'},
                    {text: 'OK', onPress: () => removeSongFromGroup(group, songIndex)}
                ]
            )
        }
    }

    render() {
        const {group, groupSongs} = this.props;
        return (
            <View style={{flex: 1}}>
                <SongList
                    songs={groupSongs.filter(song => group.items.find(item => item.song === song.key))}
                    currentPlayed={group.currentPlayed}
                    addedSongs={group.items}
                    onSongPress={this.onSongPress.bind(this)}
                    onSongLongPress={this.onSongLongPress.bind(this)}/>
            </View>
        );
    }
}

const mapStateToProps = (state) => ({
    ...state.songData,
    ...state.groupData,
    isAdmin: state.groupData.group && state.userData.nickname === state.groupData.group.admin
});

export default connect(mapStateToProps, {changePlayedSong, removeSongFromGroup})(Playlist);
