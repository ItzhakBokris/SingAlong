import React, {Component} from 'react';
import {StatusBar, View, StyleSheet, Linking} from 'react-native';
import {Router, Scene} from 'react-native-router-flux';
import {Styles} from '../../styles';
import EnterGroup from '../enterGroup';
import CreateGroup from '../enterGroup/createGroup'
import JoinGroup from '../enterGroup/joinGroup'
import LoadGroup from '../enterGroup/loadGroup'
import SongPage from '../group/song'
import Playlist from '../group/playlist';
import AddSongs from '../group/addSongs';
import GroupDetails from '../group/details';
import InviteMember from '../group/inviteMember';
import {showToastMessage} from '../../utils';
import {GroupConfig} from '../../config';

export default class Root extends Component {

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
                                key='enterGroup'
                                component={EnterGroup}/>

                            <Scene
                                backTitle='Back'
                                rightTitle='Next'
                                onRight={() => null}
                                key='createGroup'
                                title='New Group'
                                component={CreateGroup}/>

                            <Scene
                                backTitle='Back'
                                rightTitle='Join'
                                onRight={() => null}
                                key='joinGroup'
                                component={JoinGroup}/>
                        </Scene>

                        <Scene key='main' modal>
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
                                rightTitle='Add'
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
                                key='inviteMember'
                                title='Invite Member'
                                component={InviteMember}/>
                        </Scene>
                    </Scene>
                </Router>

                <LoadGroup uid={this.state.groupUid}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});