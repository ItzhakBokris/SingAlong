import React, {Component} from 'react';
import {StyleSheet, Text, View, Clipboard, Share} from 'react-native';
import {connect} from 'react-redux';
import {Colors, Styles} from '../../../styles';
import {Section} from '../../../components';
import ListItem from 'react-native-elements/src/list/ListItem';
import {GroupConfig} from '../../../config';
import {showToastMessage} from '../../../utils';

class InviteMember extends Component {

    getGroupLink() {
        return GroupConfig.groupLinkPrefix + this.props.group.uid;
    }

    copyGroupLink() {
        Clipboard.setString(this.getGroupLink());
        showToastMessage('Group link copied')
    }

    shareGroupLink() {
        Share.share({
            message: 'Click the link to join a SingAlong group: ' + this.getGroupLink(),
            url: this.getGroupLink(),
            title: 'Join to group \"' + this.props.group.name + '\"'
        }).catch(() => showToastMessage('Something went wrong please try again'));
    }

    render() {
        return (
            <View style={styles.container}>
                <Section containerStyle={styles.invitationContainer} firstChild>
                    <Text style={styles.invitationHeader}>Group Pin Code</Text>
                    <Text style={styles.pinCode}>{this.props.group.pinCode}</Text>
                </Section>

                <Section containerStyle={styles.invitationContainer}>
                    <Text style={styles.invitationHeader}>Invite via Link</Text>
                    <Text style={styles.groupLink}>{this.getGroupLink()}</Text>

                    <ListItem
                        title='Copy link'
                        onPress={this.copyGroupLink.bind(this)}
                        leftIcon={{name: 'content-copy', type: 'material-community'}}
                        {...Styles.listActionItem}/>

                    <ListItem
                        title='Share link'
                        onPress={this.shareGroupLink.bind(this)}
                        leftIcon={{name: 'share', type: 'material-community'}}
                        {...Styles.listActionItem}/>
                </Section>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    invitationContainer: {
        paddingVertical: 20
    },
    invitationHeader: {
        color: Colors.blue,
        fontWeight: 'bold',
        marginLeft: 15
    },
    pinCode: {
        fontSize: 22,
        marginTop: 10,
        marginLeft: 15,
        fontStyle: 'italic'
    },
    groupLink: {
        padding: 15
    }
});

const mapStateToProps = (state) => ({...state.groupData});

export default connect(mapStateToProps)(InviteMember);
