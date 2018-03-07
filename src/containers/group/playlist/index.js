import React, {Component} from 'react';
import {View} from 'react-native';
import {connect} from 'react-redux';
import {SongList} from '../../../components';

class Playlist extends Component {

    render() {
        return (
            <View style={{flex: 1}}>
                <SongList
                    songs={this.props.groupSongs}
                    addedSongs={this.props.group.items}/>
            </View>
        );
    }
}

const mapStateToProps = (state) => ({...state.songData, ...state.groupData});

export default connect(mapStateToProps)(Playlist);
