import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import SearchSong from '../../search'
import {addSongsToGroup} from '../../../store/song/actions';
import {setActionBarRightButton, showToastMessage} from '../../../utils';
import {decreaseStepsBeforeRate} from '../../../store/app/actions';

class AddSongs extends Component {

    state = {
        isAdding: false
    };

    componentWillMount() {
        setActionBarRightButton('Add', 'MaterialIcons', 'check', this.onAddPress.bind(this));
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.isAddRequested !== this.props.isAddRequested && !nextProps.isAddRequested) {
            if (!nextProps.addError) {
                this.props.decreaseStepsBeforeRate();
                Actions.pop();
            } else {
                showToastMessage('Something went wrong please try again');
                this.setState({isAdding: false});
            }
        }
    }

    onAddPress() {
        if (!this.state.isAdding) {
            const {group, nickname, selectedSongs, addSongsToGroup} = this.props;
            if (selectedSongs.length > 0) {
                this.setState({isAdding: true});
                addSongsToGroup(group, nickname, selectedSongs.map(song => song.key));
            } else {
                showToastMessage('Please select at lease one song');
            }
        }
    }

    render() {
        return (
            <SearchSong/>
        );
    }
}

const mapStateToProps = (state) => ({...state.groupData, ...state.userData, ...state.songData, ...state.searchData});

export default connect(mapStateToProps, {addSongsToGroup, decreaseStepsBeforeRate})(AddSongs);
