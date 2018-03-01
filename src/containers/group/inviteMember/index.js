import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {connect} from 'react-redux';
import {Colors, Styles} from '../../../styles';
import {Section} from '../../../components';
import ListItem from 'react-native-elements/src/list/ListItem';

class InviteMember extends Component {

    render() {
        return (
            <View style={styles.container}>
                <Section containerStyle={styles.invitationContainer}>
                    <Text style={styles.invitationHeader}>Group Pin Code</Text>
                    <Text style={styles.pinCode}>{this.props.group.pinCode}</Text>
                </Section>

                <Section containerStyle={styles.invitationContainer}>
                    <Text style={styles.invitationHeader}>Invite via Link</Text>

                    <Text style={styles.groupLink}>{this.props.group.link}</Text>

                    <ListItem
                        title='Copy link'
                        onPress={() => null}
                        leftIcon={{name: 'content-copy', type: 'material-community'}}
                        {...Styles.listActionItem}/>

                    <ListItem
                        title='Share link'
                        onPress={() => null}
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
