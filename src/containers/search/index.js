import React, {Component} from 'react';
import {ActivityIndicator, LayoutAnimation, ScrollView, StyleSheet, Text, View} from 'react-native'
import {connect} from 'react-redux';
import {SearchBar, Badge} from 'react-native-elements'
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

    onEndReached() {
        const {songs, pageSize, isRequested, searchText, searchSongs} = this.props;
        if (songs.length > 0 && !isRequested && songs.length % pageSize === 0) {
            searchSongs(searchText, songs[songs.length - 1].name);
        }
    }

    onSongPress(song) {
        const {selectedSongs, changeSelectedSongs} = this.props;
        const newSelectedSongs = selectedSongs.filter(selectedSong => selectedSong.key !== song.key);
        if (newSelectedSongs.length === selectedSongs.length) {
            newSelectedSongs.push(song);
        }
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

    getAddedSongs() {

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
                    {...Styles.searchBar}
                    {...this.getClearIconStyle()}
                    onChangeText={this.props.searchSongs.bind(this)}
                    placeholder='Search...'/>

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

const mapStateToProps = (state) => ({...state.groupData, ...state.searchData});

export default connect(mapStateToProps, {searchSongs, changeSelectedSongs})(SearchSong);
