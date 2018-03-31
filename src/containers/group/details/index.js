import React, {Component} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import {ListItem, Text} from 'react-native-elements';
import {Colors, Styles} from '../../../styles';
import {Section} from '../../../components';
import {leaveGroup} from '../../../store/group/actions';

class GroupDetails extends Component {

    componentWillMount() {
        this.updateMembersDataSource(this.props);
    }

    componentWillReceiveProps(nextProps) {
        this.updateMembersDataSource(nextProps);
    }

    updateMembersDataSource(props) {
        if (props.group) {
            Actions.refresh({title: props.group.name});
        }
    }

    leaveGroup() {
        this.props.leaveGroup(this.props.group, this.props.nickname);
        Actions.onBoarding({type: 'reset'});
    }

    renderMember(member, isAdmin) {
        return (
            <ListItem
                key={member}
                title={member}
                onPress={() => null}
                rightTitle={isAdmin ? 'Group Admin' : ''}
                rightTitleStyle={styles.listItemRightTitle}
                leftIcon={{name: 'user-circle', size: 32, type: 'font-awesome'}}
                {...Styles.listActionItem}/>
        );
    }

    renderMembersSection() {
        const {members, admin} = this.props.group;
        if (members && admin) {
            return (
                <Section>
                    <Text style={styles.membersCountTitle}>
                        {this.props.group.members.length} Members
                    </Text>
                    {members.map(member => this.renderMember(member, member === admin))}
                </Section>
            );
        }
    }

    render() {
        return (
            <ScrollView>
                <View style={styles.container}>
                    <Section>
                        <ListItem
                            title='Edit profile'
                            onPress={() => null}
                            leftIcon={{name: 'account-edit', type: 'material-community'}}
                            {...Styles.listActionItem}/>

                        <ListItem
                            title='Invite member'
                            onPress={() => Actions.inviteMember()}
                            leftIcon={{name: 'person-add'}}
                            {...Styles.listActionItem}/>
                    </Section>

                    {this.renderMembersSection()}

                    <Section>
                        <ListItem
                            title='Leave group'
                            onPress={this.leaveGroup.bind(this)}
                            leftIcon={{name: 'logout', type: 'material-community', color: Colors.danger}}
                            {...Styles.listActionItem}
                            titleStyle={{...Styles.listActionItem.titleStyle, color: Colors.danger}}/>
                    </Section>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    membersCountTitle: {
        color: Colors.blue,
        fontWeight: 'bold',
        paddingTop: 5,
        paddingLeft: 15,
        paddingBottom: 10
    },
    listItemRightTitle: {
        color: Colors.blue,
        fontWeight: 'bold',
        fontSize: 12
    }
});

const mapStateToProps = (state) => ({...state.groupData, ...state.userData});

export default connect(mapStateToProps, {leaveGroup})(GroupDetails);
