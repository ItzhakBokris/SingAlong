import React, {Component} from 'react';
import {Dimensions, Platform, ScrollView, StyleSheet, Text, View} from 'react-native';
import PropTypes from 'prop-types';
import {Colors} from '../styles';

const FONT_SIZE = Platform.OS === 'ios' ? 20 : 18;
const AUTO_SCROLL_DELTA_OFFSET = Platform.OS === 'ios' ? 0.5 : 0.25;
const AUTO_SCROLL_DELTA_TIME = 10;

export class SongLyrics extends Component {

    static propTypes = {
        lyricsText: PropTypes.string.isRequired,
        showChords: PropTypes.bool,
        fontSizeScale: PropTypes.number,
        chordsColor: PropTypes.string,
        containerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
        autoScroll: PropTypes.bool,
        onUserScroll: PropTypes.func,
        onEndReached: PropTypes.func
    };

    static defaultProps = {
        showChords: false,
        fontSizeScale: 1,
        chordsColor: 'dodgerblue',
        containerStyle: {},
        autoScroll: false,
        onUserScroll: () => null,
        onEndReached: () => null
    };

    scrollTop = 0;
    autoScrollDeltaOffset = AUTO_SCROLL_DELTA_OFFSET;
    lyricsScrollViewHeight = Dimensions.get('window').height;
    lyricsContainerHeight = this.lyricsScrollViewHeight;
    isRtlLyrics = false;
    lyricsParts = [];

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
        this.scrollTop = this.scrollTop * newFontSizeScale / this.props.fontSizeScale;
        this.autoScrollDeltaOffset = AUTO_SCROLL_DELTA_OFFSET * newFontSizeScale;
    }

    fetchLyricsParts(lyricsText) {
        this.isRtlLyrics = /[א-ת]/g.test(lyricsText);
        const space = this.isRtlLyrics && Platform.OS === 'ios' ? ' ' : ' ';
        const chordRegex = /(\[[^\]]*\])+/g;
        const paragraphs = lyricsText.split(/[\n\r]{2,}/).filter(paragraph => !!paragraph.trim());
        this.lyricsParts = paragraphs.map(paragraph => {
            const sentences = paragraph.split(/[\n\r]/);
            return sentences.map(sentence => {
                const words = sentence.split(/[  ]+/);
                return words.map((word, wordIndex) => {
                    const wordParts = [];
                    let position = 0;
                    let regexResult;
                    while (regexResult = chordRegex.exec(word)) {
                        if (regexResult.index > 0) {
                            const text = word.substring(position, regexResult.index);
                            wordParts.push({type: 'text', text});
                            position = regexResult.index;
                        }
                        const text = regexResult[0].replace(/[\[\]]/g, ' ').trim();
                        wordParts.push({type: 'chord', text});
                        position += regexResult[0].length;
                    }
                    if (position < word.length) {
                        const text = word.substring(position, word.length);
                        wordParts.push({type: 'text', text});
                    }
                    const textParts = wordParts.filter(wordPart => wordPart.type === 'text');
                    if (textParts.length > 0) {
                        textParts[textParts.length - 1].text += (wordIndex < words.length - 1 ? space : '');
                    }
                    return wordParts;
                });
            });
        });
    }

    animateScrollFrame() {
        const startFrameTime = new Date().getTime();
        if (this.scrollView && this.lyricsContainerHeight > this.lyricsScrollViewHeight) {
            const scrollTop = this.scrollTop + this.autoScrollDeltaOffset;
            if (scrollTop + this.lyricsScrollViewHeight <= this.lyricsContainerHeight) {
                this.scrollView.scrollTo({y: scrollTop, animated: false});
            } else {
                this.props.onEndReached();
            }
        }
        const frameTime = new Date().getTime() - startFrameTime;
        const timeout = AUTO_SCROLL_DELTA_TIME - frameTime;
        setTimeout(() => this.props.autoScroll && this.animateScrollFrame(), timeout);
    }

    getSentenceStyle(space) {
        return [styles.sentence, this.isRtlLyrics && styles.rtlDirection, {
            marginTop: space ? 45 * this.props.fontSizeScale : 0
        }];
    }

    getChordContainerStyle() {
        return this.isRtlLyrics && styles.rtlDirection;
    }

    getWordWithChordsStyle() {
        return [styles.wordWithChords, this.isRtlLyrics && styles.rtlDirection];
    }

    getWordStyle(isTextLine) {
        return [styles.word, {
            fontSize: FONT_SIZE * this.props.fontSizeScale,
            fontWeight: isTextLine ? 'bold' : 'normal',
            lineHeight: (isTextLine ? FONT_SIZE : 45) * this.props.fontSizeScale
        }];
    }

    getChordStyle() {
        return [styles.chord, {
            fontSize: 14 * this.props.fontSizeScale,
            top: -3 * this.props.fontSizeScale,
            color: this.props.chordsColor
        }];
    }

    getChordsLineStyle() {
        return [styles.lineChord, {
            fontSize: 14 * this.props.fontSizeScale,
            lineHeight: FONT_SIZE * this.props.fontSizeScale,
            color: this.props.chordsColor
        }];
    }

    createLyricsWordParts(word, wordIndex, isTextLine, isChordsLine) {
        return word.map((wordPart, partIndex) => {
            if (isTextLine || wordPart.type === 'text') {
                return (
                    <Text key={wordIndex + partIndex} style={this.getWordStyle(isTextLine)}>
                        {wordPart.text}
                    </Text>
                );
            }
            if (this.props.showChords) {
                if (isChordsLine) {
                    return (
                        <Text key={wordIndex + partIndex} style={this.getChordsLineStyle()}>
                            {wordPart.text}
                        </Text>
                    );
                }
                return (
                    <View key={wordIndex + partIndex} style={this.getChordContainerStyle()}>
                        <Text style={this.getChordStyle()}>{wordPart.text}</Text>
                    </View>
                );
           }
        });
    }

    createLyricsWords(sentence, isTextLine, isChordsLine) {
        return sentence.map((word, wordIndex) => {
            const wordPartViews = this.createLyricsWordParts(word, wordIndex, isTextLine, isChordsLine);
            if (wordPartViews.length === 1) {
                return wordPartViews[0];
            }
            return (
                <View key={wordIndex} style={this.getWordWithChordsStyle()}>
                    {wordPartViews}
                </View>
            );
        });
    }

    createLyricsSentences() {
        let keyIndex = 0;
        return this.lyricsParts.map((paragraph, paragraphIndex) => {
            return paragraph.map((sentence, sentenceIndex) => {
                const containsText = sentence.some(word => word.some(wordPart => wordPart.type === 'text'));
                const containsChord = sentence.some(word => word.some(wordPart => wordPart.type === 'chord'));
                const isTextLine = containsText && !containsChord;
                const isChordsLine = containsChord && !containsText;
                const space = sentenceIndex === 0 && paragraphIndex > 0;
                return (
                    <View key={keyIndex++} style={this.getSentenceStyle(space)}>
                        {this.createLyricsWords(sentence, isTextLine, isChordsLine)}
                    </View>
                )
            });
        });
    }

    onScroll(event) {
        this.scrollTop = event.nativeEvent.contentOffset.y;
    }

    onScrollViewLayout(event) {
        this.lyricsScrollViewHeight = event.nativeEvent.layout.height;
    }

    onLyricsContainerLayout(event) {
        this.lyricsContainerHeight = event.nativeEvent.layout.height;
        if (this.scrollView) {
            this.scrollView.scrollTo({y: this.scrollTop, animated: false});
        }
    }

    render() {
        return (
            <ScrollView
                onScroll={this.onScroll.bind(this)}
                onLayout={this.onScrollViewLayout.bind(this)}
                ref={component => this.scrollView = component}
                onScrollBeginDrag={this.props.onUserScroll}
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
        color: 'white'
    },
    wordWithChords: {
        flexDirection: 'row'
    },
    chord: {
        color: 'dodgerblue',
        position: 'absolute',
        fontWeight: 'bold'
    },
    lineChord: {
        color: 'dodgerblue',
        fontWeight: 'bold'
    },
    rtlDirection: {
        flexDirection: 'row-reverse'
    }
});
