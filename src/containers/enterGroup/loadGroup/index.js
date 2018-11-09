import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Actions} from 'react-native-router-flux';
import {fetchGroupByPinCode, fetchGroupByUid, leaveGroup} from '../../../store/group/actions';
import {showToastMessage} from '../../../utils';
import {Loader} from '../../../components/loader';

class LoadGroup extends Component {

    static propTypes = {
        pinCode: PropTypes.string,
        uid: PropTypes.string,
        onLoadGroup: PropTypes.func
    };

    static defaultProps = {
        onLoadGroup: () => null
    };

    state = {
        isLoading: false
    };

    componentWillMount() {
        this.tryLoadGroup(this.props);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.pinCode !== this.props.pinCode || nextProps.uid !== this.props.uid) {
            this.tryLoadGroup(nextProps);
        } else if (this.state.isLoading && !nextProps.isRequested) {
            if (!nextProps.error && nextProps.group) {
                this.props.onLoadGroup(nextProps.group);
                if (this.props.group) {
                    this.props.leaveGroup(this.props.group, this.props.nickname);
                    Actions.onBoarding({type: 'reset'});
                }
                Actions.joinGroup();
            } else {
                this.props.onLoadGroup(null);
                showToastMessage('Something went wrong please try again');
            }
            this.setState({isLoading: false});
        }
    }

    tryLoadGroup(props) {
        if (props.pinCode && (!props.group || props.pinCode !== props.group.pinCode)) {
            props.fetchGroupByPinCode(props.pinCode);
            this.setState({isLoading: true});
        } else if (props.uid && (!props.group || props.uid !== props.group.uid)) {
            props.fetchGroupByUid(props.uid);
            this.setState({isLoading: true});
        }
    }

    render() {
        return (
            <Loader
                show={this.state.isLoading}
                closable={false}
                message='Loading Group...'/>
        );
    }
}

const mapStateToProps = (state) => ({...state.groupData, ...state.userData});

export default connect(mapStateToProps, {fetchGroupByPinCode, fetchGroupByUid, leaveGroup})(LoadGroup);
