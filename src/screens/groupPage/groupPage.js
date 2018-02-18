import React, {Component} from 'react';
import {Text} from 'react-native';
import {connect} from 'react-redux';
import SongPage from './songPage/songPage';
import {fetchGroupSongs} from '../../actions/index';

class GroupPage extends Component {

    componentWillReceiveProps(nextProps) {
        if (nextProps.group !== this.props.group) {
            this.props.fetchGroupSongs(nextProps.group);
        }
    }

    render() {
        console.log(this.props.songs);
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


