import React, {Component} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import PropTypes from 'prop-types';
import {Actions} from 'react-native-router-flux';
import Toast from 'react-native-root-toast';
import {Colors} from '../../styles/appTheme';
import {Input} from '../../common';
import SongList from '../songs/songList';

export default class EditGroupProperty extends Component {

    static propTypes = {
        placeholder: PropTypes.string.isRequired,
        onValueChange: PropTypes.func.isRequired
    };

    static defaultProps = {
        value: '',
        errorMessage: 'Please provide a value',
        nextButton: 'Next',
        selectedSongs: [],
        groupName: '',
        isLoading: false,
        onNextPress: () => null,
    };

    componentWillMount() {
        this.updateNavBarRightButton(this.props);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.isLoading !== this.props.isLoading) {
            this.updateNavBarRightButton(nextProps);
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Input
                    value={this.props.value}
                    placeholder={this.props.placeholder}
                    onChangeText={this.props.onValueChange.bind(this)}/>

                {/*TODO: render group name*/}
                {this.renderSelectedSongs()}
            </View>
        );
    }

    renderSelectedSongs() {
        if (this.props.selectedSongs.length > 0) {
            return (
                <View style={styles.container}>
                    <Text style={styles.songsHeader}>
                        {this.props.selectedSongs.length} songs
                    </Text>

                    <SongList
                        containerStyle={styles.songListContainer}
                        songs={this.props.selectedSongs}/>
                </View>
            );
        }
    }

    updateNavBarRightButton(props) {
        if (props.isLoading) {
            // TODO: update right button to loader
            Actions.refresh({rightTitle: 'loading', onRight: () => null})
        } else {
            Actions.refresh({rightTitle: this.props.nextButton, onRight: this.onNextPress.bind(this)})
        }
    }

    onNextPress() {
        if (this.props.value) {
            this.props.onNextPress(this.props.value);
        } else {
            Toast.show(this.props.errorMessage, {
                duration: Toast.durations.SHORT,
                position: Toast.positions.BOTTOM,
                animation: true,
                hideOnPress: true
            });
        }
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
