import React, {Component} from 'react';
import {Platform, StyleSheet, WebView} from 'react-native';
import PropTypes from 'prop-types';
import {Colors} from '../styles';

const AUTO_SCROLL_DELTA_OFFSET = 1;
const AUTO_SCROLL_DELTA_TIME = Platform.OS === 'ios' ? 10 : 20;
const MessageTypes = {ScrollY: 'scrollY', UserPressed: 'userPressed'};

export class SongLyrics extends Component {

    static propTypes = {
        lyricsText: PropTypes.string.isRequired,
        showChords: PropTypes.bool,
        fontSizeScale: PropTypes.number,
        chordsColor: PropTypes.string,
        padding: PropTypes.shape({horizontal: PropTypes.number, vertical: PropTypes.number}),
        autoScroll: PropTypes.bool,
        onPress: PropTypes.func
    };

    static defaultProps = {
        showChords: false,
        fontSizeScale: 1,
        chordsColor: 'dodgerblue',
        padding: {horizontal: 0, vertical: 0},
        autoScroll: false,
        onPress: () => null
    };

    state = {
        fixedLyrics: '',
        scrollOffset: 0,
        autoScrollDeltaOffset: AUTO_SCROLL_DELTA_OFFSET,
        autoScrollDeltaTime: AUTO_SCROLL_DELTA_TIME
    };

    scrollY = 0;

    componentWillMount() {
        this.updateLyrics(this.props);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.lyricsText !== this.props.lyricsText || nextProps.showChords !== this.props.showChords) {
            this.updateLyrics(nextProps);
        }
        if (nextProps.fontSizeScale !== this.props.fontSizeScale && this.props.fontSizeScale) {
            this.setState({
                autoScrollDeltaOffset: Math.max(AUTO_SCROLL_DELTA_OFFSET * nextProps.fontSizeScale, AUTO_SCROLL_DELTA_OFFSET),
                autoScrollDeltaTime: Math.max(AUTO_SCROLL_DELTA_TIME / nextProps.fontSizeScale, AUTO_SCROLL_DELTA_TIME)
            });
        }
    }

    updateLyrics(props) {
        this.setState({
            fixedLyrics: props.lyricsText
                .replace(/[  ]/g, ' ')
                .replace(/(\[)([^\]]*)(\])/g, props.showChords ? '<chord>$2</chord>' : '')
                .replace(/([^\s]*<chord>[^\s]*)/g, '<span>$1</span>')
                .replace(/[\n]/g, '<br>')
                .trim()
        });
    }

    createLyricsHtml() {
        const {fontSizeScale, showChords, padding, autoScroll} = this.props;
        const {autoScrollDeltaOffset, autoScrollDeltaTime, fixedLyrics} = this.state;
        // language=HTML
        return `
            <html>
                <head>
                    <script>
                        document.addEventListener("scroll", onScroll, false);

                        let userTouch = false;
                        function onScroll() {
                            window.postMessage('{"${MessageTypes.ScrollY}": ' + window.scrollY + '}');
                            if (userTouch) {
                               window.postMessage('{"${MessageTypes.UserPressed}": true}'); 
                               userTouch = false;
                            }
                        }
                        function onTouchStart() { userTouch = true; }
                        function animateScrollFrame() { 
                            const startFrameTime = new Date().getTime();
                            window.scrollBy(0, ${autoScrollDeltaOffset});
                            const frameTime = new Date().getTime() - startFrameTime;
                            setTimeout(animateScrollFrame, ${autoScrollDeltaTime} - frameTime); 
                        }
                        window.scrollTo(0, ${this.scrollY});
                        if (${autoScroll}) {
                            animateScrollFrame();  
                        }
                    </script>
                    <style>
                        body {
                            direction: ${/[א-ת]+/g.test(fixedLyrics) ? 'rtl' : 'ltr'};
                            padding: ${Math.max(padding.vertical, showChords ? 10 : 0)}px ${padding.horizontal}px;
                            font-family: Arial, sans-serif;
                            margin: 0;
                            color: ${Colors.lighterGrey}; 
                            text-align: center; 
                            font-size: ${20 * fontSizeScale}px;
                            line-height: ${34 * fontSizeScale * (showChords ? 1.25 : 1)}px; 
                        }
                        span {
                            white-space: nowrap;
                        }
                        chord {
                            position: relative;
                            color: ${this.props.chordsColor};
                            top: -1.2em;
                            font-size: 0.8em;
                            font-weight: bold;
                            display: inline-block;
                            width: 0;
                            overflow: visible;
                        }
                    </style>
                </head>
                <body onScroll="onScroll()" onclick="onTouchStart()">
                    <div ontouchstart="onTouchStart()">${fixedLyrics}</div>
                </body>
                <script>window.scrollTo(0, ${this.scrollY})</script>
            </html>
        `;
    }

    onWebViewMessage(event) {
        const messageData = JSON.parse(event.nativeEvent.data);
        if (messageData[MessageTypes.ScrollY]) {
            this.scrollY = messageData[MessageTypes.ScrollY];
        }
        if (messageData[MessageTypes.UserPressed]) {
            this.props.onPress();
        }
    }

    render() {
        return (
            <WebView
                source={{html: this.createLyricsHtml()}}
                scrollEnabled={true}
                scalesPageToFit={false}
                onMessage={this.onWebViewMessage.bind(this)}
                style={[styles.lyricsWebView]}/>
        );
    }
}

const styles = StyleSheet.create({
    lyricsWebView: {
        backgroundColor: 'transparent'
    }
});
