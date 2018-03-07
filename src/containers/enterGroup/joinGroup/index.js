import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import {clearGroup, joinToGroup} from '../../../store/group/actions';
import {EditGroupProperty} from '../editGroupProperty';
import {showToastMessage} from '../../../utils/index';
import {changeNickname} from '../../../store/groupJoining/actions';

class JoinGroup extends Component {

    componentWillMount() {
        Actions.refresh({
            onRight: this.onNextPress.bind(this),
            onBack: () => {
                this.props.clearGroup();
                Actions.pop();
            },
            title: 'Join to ' + this.props.group.name
        });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.isRequested !== this.props.isRequested) {
            if (nextProps.isRequested) {
                Actions.refresh({rightTitle: 'Loading', onRight: () => null})
            } else if (!nextProps.error) {
                Actions.main();
            } else {
                showToastMessage('Something went wrong please try again');
                Actions.refresh({rightTitle: 'Join', onRight: this.onNextPress.bind(this)});
            }
        }
    }

    onNextPress() {
        if (!this.props.nickname) {
            showToastMessage('Please provide your nickname');
        } else if (this.props.group.members.indexOf(this.props.nickname) >= 0) {
            showToastMessage('A user with this nickname already exists');
        } else {
            this.props.joinToGroup(this.props.group, this.props.nickname);
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <EditGroupProperty
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
