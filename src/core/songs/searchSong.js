import React, {Component} from 'react';
import {ActivityIndicator, LayoutAnimation, ScrollView, StyleSheet, Text, View} from 'react-native'
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {SearchBar, Badge} from 'react-native-elements'
import SongList from "./songList";
import {Styles} from "../../styles/appTheme";
import {searchSongs} from '../../actions';

const PAGE_SIZE = 25;

class SearchSong extends Component {

    static propTypes = {
        onSongPress: PropTypes.func.isRequired
    };

    static defaultProps = {
        selectedSongs: []
    };

    state = {
        loading: true,
        songsCount: PAGE_SIZE,
        searchText: null
    };

    componentWillMount() {
        this.props.searchSongs(this.state.songsCount);
    }

    componentWillUpdate(nextProps, nextState) {
        const {selectedSongs, searchedSongs, searchSongs} = this.props;
        const {searchText, songsCount} = this.state;

        if (nextProps.searchedSongs !== searchedSongs) {
            this.setState({loading: false});
        }
        if (selectedSongs.length !== nextProps.selectedSongs.length &&
            (selectedSongs.length === 0 || nextProps.selectedSongs.length === 0)) {
            LayoutAnimation.spring();
        }
        if (nextState.searchText !== searchText || nextState.songsCount !== songsCount) {
            searchSongs(nextState.songsCount, nextState.searchText);
        }
    }

    onQueryTextChange(searchText) {
        this.setState({songsCount: PAGE_SIZE, searchText});
    }

    onEndReached() {
        if (this.props.searchedSongs.length === this.state.songsCount) {
            this.setState({songsCount: this.state.songsCount + PAGE_SIZE});
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <SearchBar
                    {...Styles.searchBar}
                    onChangeText={this.onQueryTextChange.bind(this)}
                    onClearText={this.onQueryTextChange.bind(this)}
                    placeholder='Search...'/>

                {this.renderSelectedSongsCarousel()}
                {this.renderList()}
            </View>
        );
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
                onPress={() => this.props.onSongPress(song)}>

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
                songs={this.props.searchedSongs}
                selectedSongs={this.props.selectedSongs}
                onSongPress={this.props.onSongPress.bind(this)}
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

const mapStateToProps = (state) => ({searchedSongs: state.searchedSongs});

export default connect(mapStateToProps, {searchSongs})(SearchSong);


