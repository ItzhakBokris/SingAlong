import React, {Component} from 'react';
import {Text} from 'react-native';
import {connect} from 'react-redux';
import SongPage from '../../../core/songs/songPage';
import {fetchGroupSongs} from '../../../actions';

class GroupPage extends Component {

    componentWillMount() {
        this.props.fetchGroupSongs(this.props.group || {
            creator: 'Vvv',
            name: 'Sadf',
            participants: ['Vvv'],
            coverImage: null,
            songs: ['-L5LYaO8A_8PL0zIAr18']
        });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.group !== this.props.group) {
            this.props.fetchGroupSongs(nextProps.group);
        }
    }

    render() {
        if (this.props.songs.length > 0) {
            return (
                <SongPage song={this.props.songs[0]}/>
            );
        }
        // TODO: show loader
        return (
            <Text>...</Text>
        );
    }
}

const mapStateToProps = (state) => ({...state.groupData});

export default connect(mapStateToProps, {fetchGroupSongs})(GroupPage);


