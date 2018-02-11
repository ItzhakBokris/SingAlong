import React, {Component} from "react";
import {connect} from "react-redux";
import {Actions} from 'react-native-router-flux';
import {clearData, groupCreate, nicknameChanged} from "../../../actions";
import EditGroupProperty from "../../../core/onBoarding/editGroupProperty";

class EditNickname extends Component {

    state = {
        isLoading: false
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.group !== this.props.group && nextProps.group.name) {
            this.props.clearData();
            this.setState({isLoading: false});
            Actions.main();
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

const mapStateToProps = (state) => ({...state.onBoarding, group: state.group});

export default connect(mapStateToProps, {nicknameChanged, groupCreate, clearData})(EditNickname);
