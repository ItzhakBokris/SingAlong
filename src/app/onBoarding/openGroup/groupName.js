import React, {Component} from "react";
import {StyleSheet} from "react-native";
import {Input} from '../../../common/index'
import {connect} from "react-redux";
import {groupCreate, groupCreatorNicknameChanged, groupNameChanged} from "../../../actions/index";

class GroupName extends Component {

    render() {
        const {groupName, groupNameChanged,} = this.props;
        return (
            <Input
                value={groupName}
                onChangeText={groupNameChanged.bind(this)}/>
        );
    }
}

const styles = StyleSheet.create({

});

const mapStateToProps = (state) => ({...state.groupCreation});
const actions = {groupNameChanged, groupCreatorNicknameChanged, groupCreate};

export default connect(mapStateToProps, actions)(GroupName);
