import React, {Component} from "react";
import {connect} from "react-redux";
import {Actions} from "react-native-router-flux";
import {Input} from '../../common/index'
import {groupCreate, groupNameChanged} from "../../actions/index";
import Toast from "react-native-root-toast";

class EditGroupName extends Component {

    componentWillMount() {
        Actions.refresh({onRight: this.onOpenPress.bind(this)})
    }

    render() {
        return (
            <Input
                value={this.props.groupName}
                placeholder="Enter group name"
                onChangeText={this.props.groupNameChanged.bind(this)}/>
        );
    }

    onOpenPress() {
        const {groupName, nickname, groupCreate} = this.props;
        if (groupName) {
            groupCreate(groupName, nickname);
        } else {
            Toast.show('Please provide a group name', {
                duration: Toast.durations.SHORT,
                position: Toast.positions.BOTTOM,
                animation: true,
                hideOnPress: true
            });
        }
    }
}

const mapStateToProps = (state) => ({...state.onBoarding});

export default connect(mapStateToProps, {groupNameChanged, groupCreate})(EditGroupName);
