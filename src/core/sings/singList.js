import React, {Component} from 'react';
import {ListView, StyleSheet} from 'react-native'
import {Avatar, List, ListItem} from 'react-native-elements'
import {Colors} from "../../styles/appTheme";

class SingList extends Component {

    static defaultProps = {
        onEndReached: () => null,
        onSingPress: () => null,
        selectedSings: [],
        containerStyle: {}
    };

    componentWillMount() {
        this.updateSingsDataSource(this.props);
    }

    componentWillReceiveProps(nextProps) {
        this.updateSingsDataSource(nextProps);
    }

    updateSingsDataSource(props) {
        const dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.singsDataSource = dataSource.cloneWithRows(props.sings);
    }

    render() {
        return (
            <List containerStyle={[styles.list, this.props.containerStyle]}>
                <ListView
                    enableEmptySections
                    keyboardShouldPersistTaps='handled'
                    dataSource={this.singsDataSource}
                    renderRow={this.renderSingRow.bind(this)}
                    onEndReached={this.props.onEndReached.bind(this)}/>
            </List>
        );
    }

    renderSingRow(sing) {
        return (
            <ListItem
                key={sing.name}
                title={sing.name}
                subtitle={sing.artist}
                rightIcon={this.renderSingRightIcon(sing)}
                avatar={<Avatar medium source={{uri: sing.image}}/>}
                onPress={() => this.props.onSingPress(sing)}/>
        );
    }

    renderSingRightIcon(sing) {
        if (this.props.selectedSings.some(selectedSing => selectedSing.name === sing.name)) {
            return {name: 'check-circle', color: Colors.success};
        }
        return {color: 'transparent'};
    }
}

const styles = StyleSheet.create({
    list: {
        borderTopWidth: 0,
        marginTop: 0,
        flex: 1
    }
});

export default SingList;