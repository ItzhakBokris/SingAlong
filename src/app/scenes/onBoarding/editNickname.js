import React, {Component} from "react";
import {connect} from "react-redux";
import {Actions} from 'react-native-router-flux';
import {clearData, groupCreate, nicknameChanged} from "../../../actions";
import EditGroupProperty from "../../../core/onBoarding/editGroupProperty";
import Toast from 'react-native-root-toast';

class EditNickname extends Component {

    state = {
        isLoading: false
    };

    componentWillReceiveProps(nextProps) {
        if (this.state.isLoading && nextProps.groupData !== this.props.groupData) {
            this.setState({isLoading: false});
            if (nextProps.groupData.group) {
                this.props.clearData();
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
                selectedSongs={this.props.selectedSongs}
                placeholder='Enter your nickname'
                errorMessage='Please provide your nickname'
                nextButton='Open'
                groupName={this.props.groupName}
                isLoading={this.state.isLoading}
                onValueChange={this.props.nicknameChanged.bind(this)}
                onNextPress={this.onOpenPress.bind(this)}/>
        );
    }

    onOpenPress() {
        const {groupName, nickname, selectedSongs, groupCreate} = this.props;
        groupCreate(groupName, nickname, selectedSongs);
        this.setState({isLoading: true});
    }
}

const mapStateToProps = (state) => ({...state.onBoarding, groupData: state.groupData});

export default connect(mapStateToProps, {nicknameChanged, groupCreate, clearData})(EditNickname);
