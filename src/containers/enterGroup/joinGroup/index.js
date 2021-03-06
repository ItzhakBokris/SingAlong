import React, {Component} from 'react';
import {BackHandler, StyleSheet, View} from 'react-native';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import {clearGroup, joinToGroup} from '../../../store/group/actions';
import {EditProperty} from '../../../components';
import {showToastMessage} from '../../../utils/index';
import {changeNickname} from '../../../store/groupJoining/actions';
import {setActionBarRightButton} from '../../../utils';

class JoinGroup extends Component {

    state = {
        isJoining: false
    };

    componentWillMount() {
        setActionBarRightButton('Join', 'MaterialIcons', 'check', this.onNextPress.bind(this));
        Actions.refresh({
            onBack: this.onBackPress.bind(this),
            title: 'Join to ' + this.props.group.name
        });
    }

    componentDidMount() {
        this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.onBackPress.bind(this));
    }

    componentWillUnmount() {
        this.backHandler.remove();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.isRequested !== this.props.isRequested && !nextProps.isRequested) {
            if (!nextProps.error) {
                Actions.main({type: 'reset'});
            } else {
                showToastMessage('Something went wrong please try again');
                this.setState({isJoining: false});
            }
        }
    }

    onNextPress() {
        if (!this.state.isJoining) {
            const {nickname, group, joinToGroup} = this.props;
            if (!nickname) {
                showToastMessage('Please provide your nickname');
            } else if (group.members && group.members.indexOf(nickname) >= 0) {
                showToastMessage('A user with this nickname already exists');
            } else {
                this.setState({isJoining: true});
                joinToGroup(group, nickname);
            }
        }
    }

    onBackPress() {
        this.props.clearGroup(this.props.group);
        Actions.pop();
        return true;
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

const mapStateToProps = (state) => ({...state.groupData, ...state.groupJoiningData});

export default connect(mapStateToProps, {changeNickname, joinToGroup, clearGroup})(JoinGroup);
