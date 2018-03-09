import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import {ViewPager} from 'rn-viewpager';
import {changeName, changeCreator, changeSongs} from '../../../store/groupCreation/actions';
import {createGroup} from '../../../store/group/actions';
import SearchSong from '../../search/index';
import {EditGroupProperty} from '../editGroupProperty';
import {showToastMessage} from '../../../utils/index';

class CreateGroup extends Component {

    componentWillMount() {
        Actions.refresh({
            onRight: this.onNextPress.bind(this),
            onBack: this.onBackPress.bind(this)
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
                Actions.refresh({rightTitle: 'Open', onRight: this.onNextPress.bind(this)});
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
            Actions.refresh({rightTitle: this.pager.state.page < steps.length - 2 ? 'Next' : 'Open'});
        } else {
            createGroup(name, creator, songs.map(song => song.key));
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
