import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import SearchSong from '../../search'
import {addSongsToGroup} from '../../../store/song/actions';
import {showToastMessage} from '../../../utils';

class AddSongs extends Component {

    componentWillMount() {
        Actions.refresh({onRight: this.onAddPress.bind(this)});
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.isAddRequested !== this.props.isAddRequested) {
            if (nextProps.isAddRequested) {
                Actions.refresh({rightTitle: 'Loading', onRight: () => null})
            } else if (!nextProps.addError) {
                Actions.pop();
            } else {
                showToastMessage('Something went wrong please try again');
                Actions.refresh({rightTitle: 'Add', onRight: this.onAddPress.bind(this)});
            }
        }
    }

    onAddPress() {
        const {group, nickname, selectedSongs, addSongsToGroup} = this.props;
        if (selectedSongs.length > 0) {
            addSongsToGroup(group, nickname, selectedSongs.map(song => song.key));
        } else {
            showToastMessage('Please select at lease one song');
        }
    }

    render() {
        return (
            <SearchSong/>
        );
    }
}

const mapStateToProps = (state) => ({...state.groupData, ...state.userData, ...state.songData, ...state.searchData});

export default connect(mapStateToProps, {addSongsToGroup})(AddSongs);
