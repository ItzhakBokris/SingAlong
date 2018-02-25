import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import PropTypes from 'prop-types';
import {Input, SongList} from '../../components';
import {Colors} from '../../styles';

export class EditGroupProperty extends Component {

    static propTypes = {
        value: PropTypes.string,
        groupSongs: PropTypes.array,
        placeholder: PropTypes.string.isRequired,
        onChange: PropTypes.func.isRequired
    };

    static defaultProps = {
        groupSongs: [],
        onChange: () => null
    };

    renderGroupSongs() {
        if (this.props.groupSongs.length > 0) {
            return (
                <View style={styles.container}>
                    <Text style={styles.songsHeader}>
                        {this.props.groupSongs.length} songs
                    </Text>

                    <SongList
                        containerStyle={styles.songListContainer}
                        songs={this.props.groupSongs}/>
                </View>
            );
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Input
                    value={this.props.value}
                    placeholder={this.props.placeholder}
                    onChangeText={this.props.onChange.bind(this)}/>

                {/*TODO: render group name*/}
                {this.renderGroupSongs()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    songListContainer: {
        shadowColor: 'black',
        shadowOffset: {width: 0, height: -2},
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 10
    },
    songsHeader: {
        padding: 10,
        fontWeight: 'bold',
        color: Colors.subtitleTextColor
    }
});
