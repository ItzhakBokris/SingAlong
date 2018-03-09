import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Actions} from 'react-native-router-flux';
import {fetchGroupByPinCode, fetchGroupByUid} from '../../../store/group/actions';
import {showToastMessage} from '../../../utils';
import {Loader} from '../../../components/loader';

class LoadGroup extends Component {

    state = {
        isLoading: false
    };

    static propTypes = {
        pinCode: PropTypes.string,
        uid: PropTypes.string
    };

    componentWillMount() {
        this.tryLoadGroup(this.props);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.pinCode !== this.props.pinCode || nextProps.uid !== this.props.uid) {
            this.tryLoadGroup(nextProps);
        } else if (this.state.isLoading && !nextProps.isRequested) {
            if (!nextProps.error && nextProps.group) {
                Actions.joinGroup();
            } else {
                showToastMessage('Something went wrong please try again');
            }
            this.setState({isLoading: false});
        }
    }

    tryLoadGroup(props) {
        if (props.pinCode) {
            props.fetchGroupByPinCode(props.pinCode);
            this.setState({isLoading: true});
        } else if (props.uid) {
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

const mapStateToProps = (state) => ({...state.groupData});

export default connect(mapStateToProps, {fetchGroupByPinCode, fetchGroupByUid})(LoadGroup);