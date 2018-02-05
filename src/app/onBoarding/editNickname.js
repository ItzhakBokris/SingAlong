import React, {Component} from "react";
import {connect} from "react-redux";
import {Actions} from "react-native-router-flux";
import Toast from 'react-native-root-toast';
import {Input} from '../../common/index'
import {nicknameChanged} from "../../actions/index";

class EditNickname extends Component {

    componentWillMount() {
        Actions.refresh({onRight: this.onNextPress.bind(this)})
    }

    render() {
        return (
            <Input
                value={this.props.nickname}
                placeholder="Enter your nickname"
                onChangeText={this.props.nicknameChanged.bind(this)}/>
        );
    }

    onNextPress() {
        if (this.props.nickname) {
            Actions.editGroupName();
        } else {
            Toast.show('Please provide your nickname', {
                duration: Toast.durations.SHORT,
                position: Toast.positions.BOTTOM,
                animation: true,
                hideOnPress: true
            });
        }
    }
}

const mapStateToProps = (state) => ({...state.onBoarding});

export default connect(mapStateToProps, {nicknameChanged})(EditNickname);
