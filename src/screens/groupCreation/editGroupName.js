import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import {changeGroupCreationName} from '../../actions/index';
import EditGroupProperty from './common/editGroupProperty';

class EditGroupName extends Component {

    render() {
        return (
            <EditGroupProperty
                value={this.props.groupName}
                selectedSongs={this.props.groupSongs}
                placeholder='Enter group name'
                errorMessage='Please provide a group name'
                nextButton='Next'
                onValueChange={this.props.changeGroupCreationName.bind(this)}
                onNextPress={() => Actions.editNickname()}/>
        );
    }
}

const mapStateToProps = (state) => ({...state.onBoarding});

export default connect(mapStateToProps, {changeGroupCreationName})(EditGroupName);
