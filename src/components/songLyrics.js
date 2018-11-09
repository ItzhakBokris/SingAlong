import React, {Component} from 'react';
import {Dimensions, Platform, ScrollView, StyleSheet, Text, View} from 'react-native';
import PropTypes from 'prop-types';

const FONT_SIZE = Platform.OS === 'ios' ? 20 : 18;
const CHORD_FONT_SIZE = 14;
const CHORDS_LINE_HEIGHT = 45;
const AUTO_SCROLL_DELTA_OFFSET = Platform.OS === 'ios' ? 0.5 : 0.25;
const AUTO_SCROLL_DELTA_TIME = 10;
const HEBREW_CHARS_REQUIRED_PROPORTION_FOR_RTL = 0.25;

export class SongLyrics extends Component {

    static propTypes = {
        lyricsText: PropTypes.string.isRequired,
        showChords: PropTypes.bool,
        fontSizeScale: PropTypes.number,
        chordsColor: PropTypes.string,
        containerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
        autoScroll: PropTypes.bool,
        onEndReached: PropTypes.func
    };

    static defaultProps = {
        showChords: false,
        fontSizeScale: 1,
        chordsColor: 'dodgerblue',
        containerStyle: {},
        autoScroll: false,
        onEndReached: () => null
    };

    state = {
        scrollTop: 0,
        autoScrollDeltaOffset: AUTO_SCROLL_DELTA_OFFSET,
        lyricsScrollViewHeight: Dimensions.get('window').height,
        lyricsContainerHeight: Dimensions.get('window').height,
        lyricsParts: [],
        isRtlLyrics: false,
        autoScrollEnabled: true
    };

    shouldComponentUpdate(nextProps) {
        // Changing of all the current state properties don't need to re-render the component.
        return nextProps !== this.props;
    }

    componentWillMount() {
        this.fetchLyricsParts(this.props.lyricsText);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.fontSizeScale !== this.props.fontSizeScale) {
            this.updateScrolling(nextProps.fontSizeScale);
        }
        if (nextProps.lyricsText !== this.props.lyricsText) {
            this.fetchLyricsParts(nextProps.lyricsText);
        }
        if (nextProps.autoScroll && !this.props.autoScroll) {
            this.animateScrollFrame();
        }
    }

    updateScrolling(newFontSizeScale) {
        this.setState({
            scrollTop: this.state.scrollTop * newFontSizeScale / this.props.fontSizeScale,
            autoScrollDeltaOffset: AUTO_SCROLL_DELTA_OFFSET * newFontSizeScale
        });
    }

    isHebrew(text) {
        text = text.replace(/[^a-zא-ת]/ig, '');
        const result = text.match(/[א-ת]/g) || '';
        return result.length / text.length > HEBREW_CHARS_REQUIRED_PROPORTION_FOR_RTL;
    }

    fetchLyricsParts(lyricsText) {
        const chordRegex = /(\[[^\]]*\])+/g;
        const isRtlLyrics = this.isHebrew(lyricsText.replace(chordRegex, ''));
        const paragraphs = lyricsText.split(/[\n\r]{2,}/).filter(paragraph => !!paragraph.trim());
        const lyricsParts = paragraphs.map(paragraph => {
            const sentences = paragraph.split(/[\n\r]/);
            return sentences.map(sentence => {
                let words = sentence.split(/[  ]+/).map(word => {
                    const parts = [];
                    let position = 0;
                    let regexResult;
                    while (regexResult = chordRegex.exec(word)) {
                        if (regexResult.index > 0) {
                            const text = word.substring(position, regexResult.index);
                            parts.push({type: 'text', text});
                            position = regexResult.index;
                        }
                        let text = regexResult[0].replace(/[\[\]]/g, ' ').trim();
                        parts.push({type: 'chord', text});
                        position += regexResult[0].length;
                    }
                    if (position < word.length) {
                        const text = word.substring(position, word.length);
                        parts.push({type: 'text', text});
                    }
                    const haveText = parts.some(part => part.type === 'text');
                    const haveChords = parts.some(part => part.type === 'chord');
                    const isRtl = parts.some(part => /[א-ת]/.test(part.text));
                    return {parts, haveText, haveChords, isRtl};
                });
                const haveText = words.some(word => word.haveText);
                const haveChords = words.some(word => word.haveChords);
                const isRtl = words.some(word => word.isRtl);
                if (isRtlLyrics && !haveText) {
                    words = words.reverse();
                }
                return {words, haveText, haveChords, isRtl};
            });
        });
        this.setState({lyricsParts, isRtlLyrics})
    }

    animateScrollFrame() {
        const startFrameTime = new Date().getTime();
        const {
            autoScrollEnabled,
            lyricsContainerHeight,
            lyricsScrollViewHeight,
            scrollTop,
            autoScrollDeltaOffset
        } = this.state;

        if (autoScrollEnabled && this.scrollView && lyricsContainerHeight > lyricsScrollViewHeight) {
            const newScrollTop = scrollTop + autoScrollDeltaOffset;
            if (newScrollTop + lyricsScrollViewHeight <= lyricsContainerHeight) {
                this.scrollView.scrollTo({y: newScrollTop, animated: false});
            } else {
                this.props.onEndReached();
            }
        }
        const frameTime = new Date().getTime() - startFrameTime;
        const timeout = AUTO_SCROLL_DELTA_TIME - frameTime;
        setTimeout(() => this.props.autoScroll && this.animateScrollFrame(), timeout);
    }

    getSentenceStyle(space, isRtl) {
        return [styles.sentence, isRtl && styles.rtlDirection, {
            marginTop: space ? CHORDS_LINE_HEIGHT * this.props.fontSizeScale : 0
        }];
    }

    getChordContainerStyle(isRtl) {
        return isRtl && styles.rtlDirection;
    }

    getWordStyle(isRtl) {
        return [styles.word, isRtl && styles.rtlDirection, {
            marginRight: (FONT_SIZE / 6) * this.props.fontSizeScale,
            marginLeft: (FONT_SIZE / 6) * this.props.fontSizeScale
        }];
    }

    getWordTextPartStyle(isTextLine) {
        return [styles.wordTextPart, {
            fontSize: FONT_SIZE * this.props.fontSizeScale,
            fontWeight: isTextLine ? 'bold' : 'normal',
            lineHeight: (isTextLine ? FONT_SIZE : CHORDS_LINE_HEIGHT) * this.props.fontSizeScale
        }];
    }

    getWordChordPartStyle(isChordWord) {
        return [styles.wordChordPart, {
            fontSize: CHORD_FONT_SIZE * this.props.fontSizeScale,
            position: !isChordWord ? 'absolute' : 'relative',
            top: -3 * this.props.fontSizeScale,
            lineHeight: FONT_SIZE * this.props.fontSizeScale,
            color: this.props.chordsColor
        }];
    }

    getChordContainerStyle(isRtl) {
        return isRtl && styles.rtlDirection;
    }

    createLyricsWordParts(word, wordIndex, isTextLine) {
        return word.parts.map((wordPart, partIndex) => {
            if (wordPart.type === 'text') {
                return (
                    <Text key={wordIndex + partIndex} style={this.getWordTextPartStyle(isTextLine)}>
                        {wordPart.text}
                    </Text>
                );
            }
            if (this.props.showChords) {
                return (
                    <View key={wordIndex + partIndex} style={this.getChordContainerStyle(word.isRtl)}>
                        <Text style={this.getWordChordPartStyle(!word.haveText)}>
                            {wordPart.text}
                        </Text>
                    </View>
                );
            }
        });
    }

    createLyricsWords(sentence) {
        return sentence.words.map((word, wordIndex) => {
            const wordPartViews = this.createLyricsWordParts(word, wordIndex, !sentence.haveChords);
            return (
                <View key={wordIndex} style={this.getWordStyle(word.isRtl)}>
                    {wordPartViews}
                </View>
            );
        });
    }

    createLyricsSentences() {
        let keyIndex = 0;
        return this.state.lyricsParts.map((paragraph, paragraphIndex) => {
            return paragraph.map((sentence, sentenceIndex) => {
                const space = sentenceIndex === 0 && paragraphIndex > 0;
                const isRtl = sentence.isRtl || (!sentence.haveText && this.state.isRtlLyrics);
                return (
                    <View key={keyIndex++} style={this.getSentenceStyle(space, isRtl)}>
                        {this.createLyricsWords(sentence)}
                    </View>
                )
            });
        });
    }

    onScroll(event) {
        this.setState({scrollTop: event.nativeEvent.contentOffset.y});
    }

    setAutoScrollEnabled(isEnabled) {
        this.setState({autoScrollEnabled: isEnabled});
    }

    onScrollViewLayout(event) {
        this.setState({lyricsScrollViewHeight: event.nativeEvent.layout.height});
    }

    onLyricsContainerLayout(event) {
        this.setState({lyricsContainerHeight: event.nativeEvent.layout.height});
        if (this.scrollView) {
            this.scrollView.scrollTo({y: this.state.scrollTop, animated: false});
        }
    }

    render() {
        return (
            <ScrollView
                onScroll={this.onScroll.bind(this)}
                onLayout={this.onScrollViewLayout.bind(this)}
                ref={component => this.scrollView = component}
                onScrollBeginDrag={this.setAutoScrollEnabled.bind(this, false)}
                onScrollEndDrag={this.setAutoScrollEnabled.bind(this, true)}
                onMomentumScrollBegin={this.setAutoScrollEnabled.bind(this, false)}
                onMomentumScrollEnd={this.setAutoScrollEnabled.bind(this, true)}
                scrollEventThrottle={AUTO_SCROLL_DELTA_TIME}>

                <View onLayout={this.onLyricsContainerLayout.bind(this)} style={this.props.containerStyle}>
                    {this.createLyricsSentences()}
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    sentence: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center'
    },
    word: {
        flexDirection: 'row'
    },
    wordTextPart: {
        fontFamily: 'Arial',
        color: 'white'
    },
    wordChordPart: {
        fontFamily: 'Arial',
        color: 'dodgerblue',
        fontWeight: 'bold'
    },
    rtlDirection: {
        flexDirection: 'row-reverse'
    }
});
