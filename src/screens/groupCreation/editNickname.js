import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import {clearGroupCreationData, createGroup, changeGroupCreationNickname} from '../../actions/index';
import EditGroupProperty from './common/editGroupProperty';
import Toast from 'react-native-root-toast';

class EditNickname extends Component {

    state = {
        isLoading: false
    };

    componentWillReceiveProps(nextProps) {
        if (this.state.isLoading && (nextProps.group|| nextProps.error)) {
            this.setState({isLoading: false});
            if (!nextProps.error) {
                this.props.clearGroupCreationData();
                Actions.main();
            } else {
                Toast.show('Something went wrong please try again', {
                    duration: Toast.durations.SHORT,
                    position: Toast.positions.BOTTOM,
                    animation: true,
                    hideOnPress: true
                });
            }
        }
    }

    render() {
        return (
            <EditGroupProperty
                value={this.props.nickname}
                selectedSongs={this.props.groupSongs}
                placeholder='Enter your nickname'
                errorMessage='Please provide your nickname'
                nextButton='Open'
                groupName={this.props.groupName}
                isLoading={this.state.isLoading}
                onValueChange={this.props.changeGroupCreationNickname.bind(this)}
                onNextPress={this.onOpenPress.bind(this)}/>
        );
    }

    onOpenPress() {
        const {groupName, nickname, groupSongs, createGroup} = this.props;
        createGroup(groupName, nickname, groupSongs.map(song => song.key));
        this.setState({isLoading: true});
    }
}

const mapStateToProps = (state) => ({...state.onBoarding, ...state.groupData});

export default connect(mapStateToProps, {changeGroupCreationNickname, createGroup, clearGroupCreationData})(EditNickname);
