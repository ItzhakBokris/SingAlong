import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import Toast from 'react-native-root-toast';
import SearchSong from '../common/searchSong'
import {changeGroupCreationSongs} from '../../actions/index';

class SelectSongs extends Component {

    componentWillMount() {
        Actions.refresh({onRight: this.onNextPress.bind(this)})
    }

    onSongPress(song, selectedSongs) {
        this.props.changeGroupCreationSongs(selectedSongs);
    }

    render() {
        return (
            <SearchSong onSongPress={this.onSongPress.bind(this)}/>
        );
    }

    onNextPress() {
        if (this.props.groupSongs.length > 0) {
            Actions.editGroupName();
        } else {
            Toast.show('Please select at least one song', {
                duration: Toast.durations.SHORT,
                position: Toast.positions.BOTTOM,
                animation: true,
                hideOnPress: true
            });
        }
    }
}

const mapStateToProps = (state) => ({...state.onBoarding});

export default connect(mapStateToProps, {changeGroupCreationSongs})(SelectSongs);
