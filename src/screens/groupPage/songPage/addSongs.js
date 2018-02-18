import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Actions, ActionConst} from 'react-native-router-flux';
import SearchSong from '../../common/searchSong'
import {addSongsToGroup} from '../../../actions/index';

class AddSongs extends Component {

    state = {
        songsToAdd: []
    };

    componentWillMount() {
        Actions.refresh({
            onRight: () => {
                this.props.addSongsToGroup(this.props.group, this.state.songsToAdd.map(song => song.key));
                Actions.groupPage({type: ActionConst.BACK});
            }
        });
    }

    onSongPress(song, selectedSongs) {
        this.setState({songsToAdd: selectedSongs});
    }

    render() {
        return (
            <SearchSong onSongPress={this.onSongPress.bind(this)}/>
        );
    }
}

const mapStateToProps = (state) => ({...state.groupData});

export default connect(mapStateToProps, {addSongsToGroup})(AddSongs);
