import React, {Component} from 'react';
import {ListView, StyleSheet, View} from 'react-native';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import {List, ListItem, Text} from 'react-native-elements';
import {Colors, Styles} from '../../../styles';
import {Section} from '../../../components';

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
            const dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
            this.membersDataSource = dataSource.cloneWithRows(props.group.members);
        }
    }

    getRightTitle(member) {
        return member === this.props.group.creator ? 'Group Admin' : '';
    }

    renderMemberRow(member) {
        return (
            <ListItem
                key={member}
                title={member}
                onPress={() => null}
                rightTitle={this.getRightTitle(member)}
                rightTitleStyle={styles.listItemRightTitle}
                leftIcon={{name: 'user-circle', size: 32, type: 'font-awesome'}}
                {...Styles.listActionItem}/>
        );
    }

    render() {
        return (
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

                <Section containerStyle={styles.membersContainer}>
                    <Text style={styles.membersCountTitle}>
                        {this.props.group.members.length} Members
                    </Text>

                    <List containerStyle={styles.listContainer}>
                        <ListView
                            enableEmptySections
                            dataSource={this.membersDataSource}
                            renderRow={this.renderMemberRow.bind(this)}/>
                    </List>
                </Section>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    membersContainer: {
        flex: 1
    },
    membersCountTitle: {
        color: Colors.blue,
        fontWeight: 'bold',
        paddingTop: 5,
        paddingLeft: 15,
        paddingBottom: 10
    },
    listContainer: {
        borderTopWidth: 0,
        marginTop: 0,
        flex: 1
    },
    listItemRightTitle: {
        color: Colors.blue,
        fontWeight: 'bold',
        fontSize: 12
    }
});

const mapStateToProps = (state) => ({...state.groupData});

export default connect(mapStateToProps)(GroupDetails);
