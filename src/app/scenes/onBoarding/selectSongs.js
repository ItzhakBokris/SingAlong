import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import Toast from 'react-native-root-toast';
import SearchSong from '../../../core/songs/searchSong'
import {songSelected} from '../../../actions';

class SelectSongs extends Component {

    componentWillMount() {
        Actions.refresh({onRight: this.onNextPress.bind(this)})
    }

    render() {
        return (
            <SearchSong
                onSongPress={this.props.songSelected.bind(this)}
                selectedSongs={this.props.selectedSongs}/>
        );
    }

    onNextPress() {
        if (this.props.selectedSongs.length > 0) {
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

export default connect(mapStateToProps, {songSelected})(SelectSongs);
