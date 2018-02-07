import React, {Component} from "react";
import {connect} from "react-redux";
import {Actions} from "react-native-router-flux";
import {Input} from '../../common/index'
import {groupCreate, groupNameChanged, clearData} from "../../actions";
import Toast from "react-native-root-toast";

class EditGroupName extends Component {

    componentWillMount() {
        this.updateNavBarRightButton(false);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.group !== this.props.group) {
            if (nextProps.group.name) {
                this.props.clearData();
            } else {
                Toast.show('Sorry, something went wrong', {
                    duration: Toast.durations.SHORT,
                    position: Toast.positions.BOTTOM,
                    animation: true,
                    hideOnPress: true
                });
            }
            this.updateNavBarRightButton(false);
        }
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
            this.updateNavBarRightButton(true);
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

    updateNavBarRightButton(isLoading) {
        if (isLoading) {
            // TODO: update right button to loader
            Actions.refresh({rightTitle: "loading", onRight: () => null})
        } else {
            Actions.refresh({rightTitle: "Next", onRight: this.onOpenPress.bind(this)})
        }
    }
}

const mapStateToProps = (state) => ({...state.onBoarding, group: state.group});

export default connect(mapStateToProps, {groupNameChanged, groupCreate, clearData})(EditGroupName);
