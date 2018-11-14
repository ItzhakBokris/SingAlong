import React, {Component} from 'react';
import {Linking, StatusBar, StyleSheet, View} from 'react-native';
import {Router, Scene} from 'react-native-router-flux';
import PropTypes from 'prop-types';
import {Styles} from '../../styles';
import EnterGroup from '../enterGroup';
import CreateGroup from '../enterGroup/createGroup'
import JoinGroup from '../enterGroup/joinGroup'
import LoadGroup from '../enterGroup/loadGroup'
import SongPage from '../group/song'
import Playlist from '../group/playlist';
import AddSongs from '../group/addSongs';
import GroupDetails from '../group/details';
import EditProfile from '../group/editProfile';
import InviteMember from '../group/inviteMember';
import {showToastMessage} from '../../utils';
import {GroupConfig} from '../../config';
import {About} from '../about';
import {Welcome} from '../welcome';

export default class Root extends Component {

    static propTypes = {
        isNotFirstEntry: PropTypes.bool,
        isGroupConnected: PropTypes.bool
    };

    static defaultProps = {
        isNotFirstEntry: false,
        isGroupConnected: false
    };

    state = {
        groupUid: null
    };

    componentDidMount() {
        Linking.getInitialURL()
            .then(url => this.openGroupLink(url))
            .catch(error => showToastMessage(error.message));
        Linking.addEventListener('url', event => this.openGroupLink(event.url));
    }

    openGroupLink(groupLink) {
        if (groupLink) {
            this.setState({groupUid: groupLink.replace(GroupConfig.groupLinkPrefix, '')});
        }
    }

    onLoadGroup() {
        this.setState({groupUid: null});
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar {...Styles.statusBar}/>

                <Router {...Styles.navBar}>
                    <Scene hideNavBar key='root'>
                        <Scene key='onBoarding'>
                            <Scene
                                initial
                                hideNavBar
                                key='welcome'
                                component={Welcome}/>

                            <Scene
                                initial={this.props.isNotFirstEntry}
                                hideNavBar
                                key='enterGroup'
                                component={EnterGroup}/>

                            <Scene
                                backTitle='Back'
                                rightTitle=''
                                onRight={() => null}
                                key='createGroup'
                                title='New Group'
                                component={CreateGroup}/>

                            <Scene
                                backTitle='Back'
                                rightTitle=''
                                onRight={() => null}
                                key='joinGroup'
                                component={JoinGroup}/>
                        </Scene>

                        <Scene key='main' modal initial={this.props.isGroupConnected}>
                            <Scene
                                initial
                                hideNavBar
                                key='songPage'
                                component={SongPage}
                                {...Styles.translucentNavBar}/>

                            <Scene
                                backTitle='Back'
                                key='playlist'
                                title='Playlist'
                                component={Playlist}/>

                            <Scene
                                backTitle='Back'
                                rightTitle=''
                                onRight={() => null}
                                key='addSongs'
                                title='Add Songs'
                                component={AddSongs}/>

                            <Scene
                                backTitle='Back'
                                key='groupDetails'
                                component={GroupDetails}/>

                            <Scene
                                backTitle='Back'
                                key='about'
                                title='About'
                                component={About}/>

                            <Scene
                                backTitle='Back'
                                key='editProfile'
                                title='Edit Profile'
                                component={EditProfile}/>

                            <Scene
                                backTitle='Back'
                                key='inviteMember'
                                title='Invite Member'
                                component={InviteMember}/>
                        </Scene>
                    </Scene>
                </Router>

                <LoadGroup uid={this.state.groupUid} onLoadGroup={this.onLoadGroup.bind(this)}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});