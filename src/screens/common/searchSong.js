import React, {Component} from 'react';
import {ActivityIndicator, LayoutAnimation, ScrollView, StyleSheet, Text, View} from 'react-native'
import PropTypes from 'prop-types';
import {SearchBar, Badge} from 'react-native-elements'
import SongList from './songList';
import {Styles} from '../../styles/appTheme';
import firebase from 'firebase';
import {snapshotToArray} from '../../utils/firebaseUtils';

const PAGE_SIZE = 25;
const FILTER_FIELDS = ['name', 'artist'];

export default class SearchSong extends Component {

    static propTypes = {
        onSongPress: PropTypes.func
    };

    static defaultProps = {
        onSongPress: () => null
    };

    state = {
        loading: true,
        songsCount: PAGE_SIZE,
        searchText: null,
        songs: [],
        selectedSongs: []
    };

    componentWillMount() {
        this.searchSongs();
    }

    onEndReached() {
        if (this.state.songs.length === this.state.songsCount) {
            this.setState({songsCount: this.state.songsCount + PAGE_SIZE});
            this.searchSongs(this.state.searchText);
        }
    }

    searchSongs(queryText) {
        this.setState({searchText: queryText});
        const promises = !queryText ?
            [firebase.database().ref('/songs').limitToFirst(this.state.songsCount).once('value')] :
            FILTER_FIELDS.map(field => firebase.database().ref('/songs')
                .orderByChild(field)
                .startAt(queryText)
                .endAt(`${queryText}\uf8ff`)
                .limitToFirst(this.state.songsCount)
                .once('value'));

        Promise.all(promises)
            .then(result => this.setState({
                songs: result.reduce((array, snapshot) => [...array, ...snapshotToArray(snapshot)], []),
                loading: false
            }))
            .catch(() => this.setState({loading: false}));
    }

    onSongPress(song) {
        const selectedSongs = this.state.selectedSongs.filter(selectedSong => selectedSong.key !== song.key);
        if (selectedSongs.length === this.state.selectedSongs.length) {
            selectedSongs.push(song);
        }
        if (selectedSongs.length === 0 || this.state.selectedSongs.length === 0) {
            LayoutAnimation.spring();
        }
        this.setState({selectedSongs});
        this.props.onSongPress(song, selectedSongs);
    }

    render() {
        return (
            <View style={styles.container}>
                <SearchBar
                    {...Styles.searchBar}
                    onChangeText={this.searchSongs.bind(this)}
                    onClearText={this.searchSongs.bind(this)}
                    placeholder='Search...'/>

                {this.renderSelectedSongsCarousel()}
                {this.renderList()}
            </View>
        );
    }

    renderSelectedSongsCarousel() {
        if (this.state.selectedSongs.length > 0) {
            return (
                <View>
                    <ScrollView
                        horizontal
                        keyboardShouldPersistTaps='handled'
                        ref={ref => this.scrollView = ref}
                        onContentSizeChange={() => this.scrollView.scrollToEnd()}
                        contentContainerStyle={styles.selectedSongsCarousel}>

                        {this.state.selectedSongs.map(song => this.renderSelectedSong(song))}
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

    renderList() {
        if (this.state.loading) {
            return (
                <ActivityIndicator style={styles.loader}/>
            );
        }
        return (
            <SongList
                songs={this.state.songs}
                selectedSongs={this.state.selectedSongs}
                onSongPress={this.onSongPress.bind(this)}
                onEndReached={this.onEndReached.bind(this)}/>
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
