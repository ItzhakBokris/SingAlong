import React, {Component} from 'react';
import SongPage from '../../../core/songs/songPage';

export default class GroupPage extends Component {

    render() {
        const song = {
            name: 'Song Name',
            artist: 'Artist Name',
            coverImage: 'https://www.desktopbackground.org/download/540x960/2014/03/07/727832_full-hd-justin-timberlake-wallpapers_2600x1941_h.jpg'
        };
        return (
            <SongPage song={song}/>
        );
    }
}
