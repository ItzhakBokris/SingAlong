import React, {Component} from 'react';
import {ListView, StyleSheet} from 'react-native'
import PropTypes from 'prop-types';
import {Avatar, List, ListItem} from 'react-native-elements'
import {Colors, FontSizes} from '../styles';

export class SongList extends Component {

    static propTypes = {
        songs: PropTypes.array.isRequired,
        selectedSongs: PropTypes.array,
        addedSongs: PropTypes.arrayOf(PropTypes.shape({
            song: PropTypes.string.isRequired,
            member: PropTypes.string.isRequired
        })),
        disableIfAdded: PropTypes.bool,
        containerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
        onEndReached: PropTypes.func,
        onSongPress: PropTypes.func
    };

    static defaultProps = {
        selectedSongs: [],
        addedSongs: [],
        containerStyle: {},
        onEndReached: () => null,
        onSongPress: () => null
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

    renderSongRow(song) {
        const addedSong = this.props.addedSongs && this.props.addedSongs.find(item => item.song === song.key);
        const rightTitle = addedSong && 'Added by ' + addedSong.member;
        return (
            <ListItem
                key={song.key}
                title={song.name}
                subtitle={song.artist}
                disabled={this.props.disableIfAdded && addedSong != null}
                rightTitle={rightTitle}
                titleStyle={styles.listItemTitle}
                rightIcon={this.renderSongRightIcon(song)}
                avatar={<Avatar medium source={{uri: song.image}}/>}
                onPress={() => this.props.onSongPress(song)}/>
        );
    }

    renderSongRightIcon(song) {
        if (this.props.selectedSongs.some(selectedSong => selectedSong.key === song.key)) {
            return {name: 'check-circle', color: Colors.success};
        }
        return {color: 'transparent', style: {width: 1}};
    }

    render() {
        return (
            <List containerStyle={[styles.list, this.props.containerStyle]}>
                <ListView
                    enableEmptySections
                    keyboardShouldPersistTaps='handled'
                    dataSource={this.songsDataSource}
                    renderRow={this.renderSongRow.bind(this)}
                    onEndReached={this.props.onEndReached}/>
            </List>
        );
    }
}

const styles = StyleSheet.create({
    list: {
        borderTopWidth: 0,
        marginTop: 0,
        flex: 1
    },
    listItemTitle: {
        fontSize: FontSizes.header
    }
});
