import React, {Component} from 'react';
import {Platform, StyleSheet, WebView} from 'react-native';
import PropTypes from 'prop-types';
import {Colors} from '../styles';

const AUTO_SCROLL_DELTA_OFFSET = Platform.OS === 'ios' ? 0.25 : 0.125;
const AUTO_SCROLL_DELTA_TIME = 10;
const MessageTypes = {ScrollTop: 'scrollTop', UserPressed: 'userPressed'};

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
        autoScrollDeltaOffset: AUTO_SCROLL_DELTA_OFFSET
    };

    scrollTop = 0;

    componentWillMount() {
        this.updateLyrics(this.props);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.lyricsText !== this.props.lyricsText || nextProps.showChords !== this.props.showChords) {
            this.updateLyrics(nextProps);
        }
        if (nextProps.fontSizeScale !== this.props.fontSizeScale && this.props.fontSizeScale) {
            this.setState({autoScrollDeltaOffset: AUTO_SCROLL_DELTA_OFFSET * nextProps.fontSizeScale});
        }
    }

    updateLyrics(props) {
        this.setState({
            fixedLyrics: props.lyricsText
                .replace(/[  ]+/g, ' ')
                .replace(/(\[)([^\]]*)(\])/g, props.showChords ? '<chord>$2</chord>' : '')
                .replace(/([^\s]*<chord>[^\s]*)/g, '<span>$1</span>')
                .replace(/[\n\r]+/g, '<br>')
                .trim()
        });
    }

    createLyricsHtml() {
        const {fontSizeScale, showChords, padding, autoScroll} = this.props;
        const {autoScrollDeltaOffset, fixedLyrics} = this.state;
        // language=HTML
        return `
            <html>
                <head>
                    <meta name="viewport" content="initial-scale=1, maximum-scale=1">
                    <script>
                        let lyricsContent = null;
                        let offsetTop = 0;   
                        let userPressed = false;
                        let userScrolled = false;
                        window.scrollTo(0, ${this.scrollTop});
                        function postEvent(name, value) {
                            try {
                                window.postMessage(JSON.stringify({[name]: value}));
                            }
                            catch (error) {}
                        }
                        function onTouchStart() {
                            //document.getElementById('aaa').innerText += '-pressed-';
                            // userPressed = true;
                            // lyricsContent.style.transform = 'translateY(0px)'
                            // window.scrollBy(0, offsetTop);
                            // offsetTop = 0;
                            postEvent('${MessageTypes.UserPressed}', true);
                        }
                        function onScroll() {
                            //document.getElementById('aaa').innerText += '-scrolled-';
                            if (offsetTop > 0) {
                                document.getElementById('aaa').innerText = 'cleared';

                                lyricsContent.style.transform = 'translateY(0px)'
                                window.scrollBy(0, Math.ceil(offsetTop));
                                offsetTop = 0; 
                            }
                            document.getElementById('aaa').innerText = (/cleared/.test(document.getElementById('aaa').innerText) ? 'cleared ' : '') + window.scrollY;
                            postEvent('${MessageTypes.ScrollTop}', window.scrollY);
                        }
                        function animateScrollFrame() { 
                            if (window.scrollY + offsetTop + window.innerHeight < document.body.scrollHeight) {
                                const startFrameTime = new Date().getTime();
                                offsetTop += ${autoScrollDeltaOffset};
                                lyricsContent.style.transform = 'translateY(-' + offsetTop + 'px)';
                                postEvent('${MessageTypes.ScrollTop}', offsetTop + window.scrollY);
                                const frameTime = new Date().getTime() - startFrameTime;
                                setTimeout(animateScrollFrame, ${AUTO_SCROLL_DELTA_TIME} - frameTime); 
                            }
                        }
                        setTimeout(() => {
                            lyricsContent = document.getElementById('lyricsContent');
                            if (${autoScroll}) {
                                animateScrollFrame();  
                            }
                        });
                    </script>
                    <style>
                        * {
                           -webkit-user-select: none;
                        }
                        body {
                            direction: ${/[א-ת]+/g.test(fixedLyrics) ? 'rtl' : 'ltr'};
                            padding: ${Math.max(padding.vertical, showChords ? 10 : 0)}px ${padding.horizontal}px;
                            font-family: Arial, sans-serif;
                            margin: 0;
                            color: ${Colors.lighterGrey}; 
                            text-align: center; 
                            font-size: ${20 * fontSizeScale}px;
                            line-height: ${40 * fontSizeScale}px; 
                        }
                        span {
                            white-space: nowrap;
                        }
                        chord {
                            position: relative;
                            color: ${this.props.chordsColor};
                            top: ${-24 * fontSizeScale}px;
                            font-size: ${16 * fontSizeScale}px;
                            font-weight: bold;
                            display: inline-block;
                            width: 0;
                            overflow: visible;
                        }
                    </style>
                </head>
                <body onScroll='onScroll()' onclick='onTouchStart()'>
                    <div id="aaa" style="position:fixed;z-index:10;background-color:red;left:0;top:0;width:100px;color:black;font-size:12px;text-wrap:normal;height:100px"></div>
                    <div id='lyricsContent' ontouchstart='onTouchStart()'>${fixedLyrics}</div>
                </body>
                <script>
                    window.scrollTo(0, ${this.scrollTop});
                </script>
            </html>
        `;
    }

    onWebViewMessage(event) {
        const messageData = JSON.parse(event.nativeEvent.data);
        if (messageData[MessageTypes.ScrollTop]) {
            this.scrollTop = messageData[MessageTypes.ScrollTop];
            console.log("scrollTop: " + this.scrollTop);
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
                scalesPageToFit={Platform.OS !== 'ios'}
                onMessage={this.onWebViewMessage.bind(this)}
                injectJavaScript={'window.scrollTo(0, ' + this.scrollTop + ')'}
                injectedJavaScript={'window.scrollTo(0, ' + this.scrollTop + ')'}
                style={styles.lyricsWebView}/>
        );
    }
}

const styles = StyleSheet.create({
    lyricsWebView: {
        backgroundColor: 'transparent'
    }
});
