import React, {Component} from 'react';
import {ActivityIndicator, LayoutAnimation, ScrollView, StyleSheet, Text, View} from 'react-native'
import {connect} from 'react-redux';
import {Badge, SearchBar} from 'react-native-elements'
import {Styles} from '../../styles';
import {changeSelectedSongs} from '../../store/search/actions';
import {searchSongs} from '../../store/song/actions';
import {SongList} from '../../components';

class SearchSong extends Component {

    componentWillMount() {
        if (this.props.songs.length === 0) {
            this.props.searchSongs(this.props.searchText);
        }
        this.props.changeSelectedSongs([]);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.group !== this.props.group) {
            this.updateSelectedSongs(nextProps)
        }
    }

    updateSelectedSongs(props) {
        const selectedSongsToRemove = props.selectedSongs.filter(song =>
            props.group.items.find(item => item.song === song.key && item.member !== props.nickname));
        if (selectedSongsToRemove.length > 0) {
            this.addRemoveToSelectedSongs(selectedSongsToRemove);
        }
    }

    onEndReached() {
        const {songs, pageSize, isRequested, searchText, searchSongs} = this.props;
        if (songs.length > 0 && !isRequested && songs.length % pageSize === 0) {
            searchSongs(searchText, songs[songs.length - 1]);
        }
    }

    onSongPress(song) {
        this.addRemoveToSelectedSongs([song]);
    }

    addRemoveToSelectedSongs(songs) {
        const {selectedSongs, changeSelectedSongs} = this.props;
        const newSelectedSongs = [...selectedSongs];
        songs.forEach(song => {
            const songIndex = newSelectedSongs.findIndex(selectedSong => selectedSong.key === song.key);
            if (songIndex >= 0) {
                newSelectedSongs.splice(songIndex, 1);
            } else {
                newSelectedSongs.push(song);
            }
        });
        if (newSelectedSongs.length === 0 || selectedSongs.length === 0) {
            LayoutAnimation.spring();
        }
        changeSelectedSongs(newSelectedSongs)
    }

    getClearIconStyle() {
        if (!this.props.searchText) {
            return {clearIcon: null};
        }
    }

    renderSelectedSongsCarousel() {
        if (this.props.selectedSongs.length > 0) {
            return (
                <View>
                    <ScrollView
                        horizontal
                        keyboardShouldPersistTaps='handled'
                        ref={ref => this.scrollView = ref}
                        onContentSizeChange={() => this.scrollView.scrollToEnd()}
                        contentContainerStyle={styles.selectedSongsCarousel}>

                        {this.props.selectedSongs.map(song => this.renderSelectedSong(song))}
                    </ScrollView>
                </View>
            );
        }
    }

    renderSelectedSong(song) {
        return (
            <Badge
                key={song.key}
                containerStyle={styles.selectedSongBadge}
                onPress={() => this.onSongPress(song)}>

                <Text numberOfLines={1} style={styles.selectedSongText}>{song.name}</Text>
            </Badge>
        );
    }

    renderSongList() {
        if (this.props.isRequested && this.props.songs.length === 0) {
            return (
                <ActivityIndicator style={styles.loader}/>
            );
        }
        return (
            <SongList
                songs={this.props.songs}
                selectedSongs={this.props.selectedSongs}
                disableIfAdded={true}
                addedSongs={this.props.group && this.props.group.items}
                onSongPress={this.onSongPress.bind(this)}
                onEndReached={this.onEndReached.bind(this)}/>
        );
    }

    render() {
        return (
            <View style={styles.container}>
                <SearchBar
                    value={this.props.searchText}
                    onChangeText={this.props.searchSongs}
                    placeholder='Search songs...'
                    {...Styles.searchBar}
                    {...this.getClearIconStyle()}/>

                {this.renderSelectedSongsCarousel()}
                {this.renderSongList()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    loader: {
        marginTop: 20
    },
    selectedSongsCarousel: {
        padding: 10
    },
    selectedSongBadge: {
        marginRight: 5,
        backgroundColor: 'lightgrey'
    },
    selectedSongText: {
        paddingVertical: 5,
        maxWidth: 150,
        color: 'white'
    }
});

const mapStateToProps = (state) => ({...state.groupData, ...state.searchData, ...state.userData});

export default connect(mapStateToProps, {searchSongs, changeSelectedSongs})(SearchSong);
