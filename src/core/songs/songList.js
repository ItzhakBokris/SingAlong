import React, {Component} from 'react';
import {ListView, StyleSheet} from 'react-native'
import PropTypes from 'prop-types';
import {Avatar, List, ListItem} from 'react-native-elements'
import {Colors} from "../../styles/appTheme";

export default class SongList extends Component {

    static propTypes = {
        songs: PropTypes.array.isRequired,
    };

    static defaultProps = {
        onEndReached: () => null,
        onSongPress: () => null,
        selectedSongs: [],
        containerStyle: {}
    };

    componentWillMount() {
        this.updateSongsDataSource(this.props);
    }

    componentWillReceiveProps(nextProps) {
        this.updateSongsDataSource(nextProps);
    }

    updateSongsDataSource(props) {
        const dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.songsDataSource = dataSource.cloneWithRows(props.songs);
    }

    render() {
        return (
            <List containerStyle={[styles.list, this.props.containerStyle]}>
                <ListView
                    enableEmptySections
                    keyboardShouldPersistTaps='handled'
                    dataSource={this.songsDataSource}
                    renderRow={this.renderSongRow.bind(this)}
                    onEndReached={this.props.onEndReached.bind(this)}/>
            </List>
        );
    }

    renderSongRow(song) {
        return (
            <ListItem
                key={song.name}
                title={song.name}
                subtitle={song.artist}
                rightIcon={this.renderSongRightIcon(song)}
                avatar={<Avatar medium source={{uri: song.image}}/>}
                onPress={() => this.props.onSongPress(song)}/>
        );
    }

    renderSongRightIcon(song) {
        if (this.props.selectedSongs.some(selectedSong => selectedSong.name === song.name)) {
            return {name: 'check-circle', color: Colors.success};
        }
        return {color: 'transparent'};
    }
}

const styles = StyleSheet.create({
    list: {
        borderTopWidth: 0,
        marginTop: 0,
        flex: 1
    }
});
