import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import {clearGroup, joinToGroup} from '../../../store/group/actions';
import {EditGroupProperty} from '../editGroupProperty';
import {showError} from '../../../utils/index';
import {changeNickname} from '../../../store/groupJoining/actions';

class JoinGroup extends Component {

    componentWillMount() {
        Actions.refresh({
            onRight: this.onNextPress.bind(this),
            onBack: () => {
                this.props.clearGroup();
                Actions.pop();
            }
        });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.isRequested !== this.props.isRequested) {
            if (nextProps.isRequested) {
                Actions.refresh({rightTitle: 'Loading', onRight: () => null})
            } else if (!nextProps.error) {
                Actions.main();
            } else {
                showError('Something went wrong please try again');
                Actions.refresh({rightTitle: 'Join', onRight: this.onNextPress.bind(this)});
            }
        }
    }

    onNextPress() {
        if (!this.props.nickname) {
            showError('Please provide your nickname');
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
