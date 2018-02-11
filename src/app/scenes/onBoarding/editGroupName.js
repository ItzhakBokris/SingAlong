import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import {groupNameChanged} from '../../../actions';
import EditGroupProperty from '../../../core/groups/editGroupProperty';

class EditGroupName extends Component {

    render() {
        return (
            <EditGroupProperty
                value={this.props.groupName}
                selectedSings={this.props.selectedSings}
                placeholder='Enter group name'
                errorMessage='Please provide a group name'
                nextButton='Next'
                onValueChange={this.props.groupNameChanged.bind(this)}
                onNextPress={() => Actions.editNickname()}/>
        );
    }
}

const mapStateToProps = (state) => ({...state.onBoarding});

export default connect(mapStateToProps, {groupNameChanged})(EditGroupName);
