import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import {updateGroupMember} from '../../../store/group/actions';
import {showToastMessage} from '../../../utils/index';
import {setActionBarRightButton} from '../../../utils';
import {changeNickname} from '../../../store/profileUpdating/actions';
import {EditProperty} from '../../../components';

class EditProfile extends Component {

    state = {
        isUpdating: false
    };

    componentWillMount() {
        setActionBarRightButton('Update', 'MaterialIcons', 'check', this.onUpdatePress.bind(this));
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.isRequested !== this.props.isRequested && !nextProps.isRequested) {
            if (!nextProps.error) {
                Actions.pop();
            } else {
                showToastMessage('Something went wrong please try again');
                this.setState({isUpdating: false});
            }
        }
    }

    onUpdatePress() {
        if (!this.state.isUpdating) {
            const {nickname, currentNickname, group, updateGroupMember} = this.props;
            if (!nickname) {
                showToastMessage('Please provide your nickname');
            } else if (group.members && group.members.indexOf(nickname) >= 0 && nickname !== currentNickname) {
                showToastMessage('A user with this nickname already exists');
            } else {
                this.setState({isUpdating: true});
                updateGroupMember(group, currentNickname, nickname);
            }
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <EditProperty
                    value={this.props.nickname}
                    placeholder='Enter your nickname'
                    onChange={this.props.changeNickname.bind(this)}/>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

const mapStateToProps = (state) => ({
    ...state.groupData,
    ...state.profileUpdatingData,
    currentNickname: state.userData.nickname
});

export default connect(mapStateToProps, {changeNickname, updateGroupMember})(EditProfile);
