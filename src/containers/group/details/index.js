import React, {Component} from 'react';
import {ListView, StyleSheet, Text, View} from 'react-native';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import {List, ListItem} from 'react-native-elements';
import {Colors} from '../../../styles';

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
                {...listItemStyle}/>
        );
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.actionListContainer}>
                    <ListItem
                        title='Edit profile'
                        onPress={() => null}
                        leftIcon={{name: 'account-edit', type: 'material-community'}}
                        {...listItemStyle}/>

                    <ListItem
                        title='Invite member via link'
                        onPress={() => null}
                        leftIcon={{name: 'person-add'}}
                        {...listItemStyle}/>
                </View>

                <View style={styles.memberListContainer}>
                    <Text style={styles.membersCountTitle}>
                        {this.props.group.members.length} Members
                    </Text>

                    <List containerStyle={styles.list}>
                        <ListView
                            enableEmptySections
                            dataSource={this.membersDataSource}
                            renderRow={this.renderMemberRow.bind(this)}/>
                    </List>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    actionListContainer: {
        backgroundColor: 'white',
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
        paddingVertical: 10
    },
    memberListContainer: {
        flex: 1,
        marginTop: 15,
        backgroundColor: 'white',
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2
    },
    membersCountTitle: {
        padding: 15,
        color: Colors.blue,
        fontWeight: 'bold'
    },
    list: {
        borderTopWidth: 0,
        marginTop: 0,
        flex: 1
    },
    listItemContainer: {
        paddingHorizontal: 5,
        borderBottomWidth: 0
    },
    listItemTitleContainer: {
        marginLeft: 5
    },
    listItemRightTitle: {
        color: Colors.blue,
        fontWeight: 'bold',
        fontSize: 12
    }
});

const listItemStyle = {
    underlayColor: Colors.backgroundGrey,
    containerStyle: styles.listItemContainer,
    titleContainerStyle: styles.listItemTitleContainer,
    rightIcon: {color: 'transparent', style: {width: 5}}
};

const mapStateToProps = (state) => ({...state.groupData});

export default connect(mapStateToProps)(GroupDetails);
