import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import {ViewPager} from 'rn-viewpager';
import {changeCreator, changeName, changeSongs} from '../../../store/groupCreation/actions';
import {createGroup} from '../../../store/group/actions';
import SearchSong from '../../search/index';
import {EditGroupProperty} from '../editGroupProperty';
import {showToastMessage} from '../../../utils/index';
import {setActionBarRightButton} from '../../../utils';

class CreateGroup extends Component {

    state = {
        isCreating: false
    };

    componentWillMount() {
        setActionBarRightButton('Next', 'MaterialIcons', 'check', this.onNextPress.bind(this));
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.isRequested !== this.props.isRequested && !nextProps.isRequested) {
            if (!nextProps.error) {
                Actions.main({type: 'reset'});
            } else {
                showToastMessage('Something went wrong please try again');
                this.setState({isCreating: false});
            }
        }
        if (nextProps.selectedSongs !== this.props.selectedSongs) {
            this.props.changeSongs(nextProps.selectedSongs);
        }
    }

    onBackPress() {
        if (this.pager.state.page > 0) {
            this.pager.setPage(this.pager.state.page - 1)
        } else {
            Actions.pop();
        }
    }

    onNextPress() {
        if (!this.state.isAdding) {
            const {name, creator, songs, createGroup} = this.props;
            const steps = Object.values(CREATE_GROUP_STEPS);
            const step = steps[this.pager.state.page];
            switch (step) {
                case CREATE_GROUP_STEPS.SELECT_GROUP_SONGS:
                    if (songs.length === 0) {
                        return showToastMessage('Please select at least one song');
                    }
                    break;

                case CREATE_GROUP_STEPS.ENTER_GROUP_NAME:
                    if (!name) {
                        return showToastMessage('Please provide a group name');
                    }
                    break;

                case CREATE_GROUP_STEPS.ENTER_NICKNAME:
                    if (!creator) {
                        return showToastMessage('Please provide your nickname');
                    }
            }

            if (this.pager.state.page < steps.length - 1) {
                this.pager.setPage(this.pager.state.page + 1);
                Actions.refresh({rightTitle: this.pager.state.page < steps.length - 2 ? 'Next' : 'Create'});
            } else {
                this.setState({isCreating: true});
                createGroup(name, creator, songs.map(song => song.key));
            }
        }
    }

    renderStep(step) {
        switch (step) {
            case CREATE_GROUP_STEPS.SELECT_GROUP_SONGS:
                return (
                    <SearchSong/>
                );

            case CREATE_GROUP_STEPS.ENTER_GROUP_NAME:
                return (
                    <EditGroupProperty
                        value={this.props.name}
                        placeholder='Enter group name'
                        groupSongs={this.props.songs}
                        onChange={this.props.changeName}/>
                );

            case CREATE_GROUP_STEPS.ENTER_NICKNAME:
                return (
                    <EditGroupProperty
                        value={this.props.creator}
                        placeholder='Enter your nickname'
                        groupSongs={this.props.songs}
                        onChange={this.props.changeCreator}/>
                );
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <ViewPager
                    keyboardShouldPersistTaps='handled'
                    style={styles.container}
                    ref={component => this.pager = component}
                    scrollEnabled={false}>

                    <View>{this.renderStep(CREATE_GROUP_STEPS.ENTER_GROUP_NAME)}</View>
                    <View>{this.renderStep(CREATE_GROUP_STEPS.SELECT_GROUP_SONGS)}</View>
                    <View>{this.renderStep(CREATE_GROUP_STEPS.ENTER_NICKNAME)}</View>
                </ViewPager>
            </View>
        );
    }
}

const CREATE_GROUP_STEPS = {
    ENTER_GROUP_NAME: 'enter_group_name',
    SELECT_GROUP_SONGS: 'select_group_songs',
    ENTER_NICKNAME: 'enter_nickname'
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

const mapStateToProps = (state) => ({...state.searchData, ...state.groupCreationData});

const actions = {
    changeSongs,
    changeName,
    changeCreator,
    createGroup
};

export default connect(mapStateToProps, actions)(CreateGroup);
