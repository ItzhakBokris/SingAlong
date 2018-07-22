import React, {Component} from 'react';
import {connect} from 'react-redux';
import {ActivityIndicator, StyleSheet, Text, TextInput, View} from 'react-native';
import {Button, Rating} from 'react-native-elements';
import {Colors} from '../../styles';
import {Dialog} from '../../components';
import {showToastMessage} from '../../utils';
import {decreaseStepsBeforeRate, rateApp} from '../../store/app/actions';
import PropTypes from 'prop-types';

class RateAppDialog extends Component {

    static propTypes = {
        show: PropTypes.bool,
        onDismiss: PropTypes.func
    };

    static defaultProps = {
        show: false,
        onDismiss: () => null
    };

    state = {
        isDialogVisible: true,
        rating: null,
        feedback: '',
        rateSuccess: false
    };

    componentWillMount() {
        this.setState({isDialogVisible: this.props.show});
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.error) {
            showToastMessage('Something went wrong please try again');
        } else if (!nextProps.isRequested && this.props.isRequested) {
            this.setState({rateSuccess: true});
        }
        if (nextProps.show !== this.props.show) {
            this.setState({isDialogVisible: nextProps.show});
        }
    }

    onRating(rating) {
        this.setState({rating});
    }

    onFeedbackChange(text) {
        this.setState({feedback: text});
    }

    closeDialog() {
        this.setState({isDialogVisible: false});
    }

    onDismiss() {
        this.props.decreaseStepsBeforeRate();
        this.props.onDismiss();
        this.setState({rating: null, feedback: null, rateSuccess: false});
    }

    submit() {
        if (this.state.rating || this.state.feedback) {
            this.props.rateApp(this.state.rating, this.state.feedback, this.props.nickname)
        } else {
            showToastMessage('You should rate the app or leave a feedback before submitting');
        }
    }

    renderBeforeRatingContent() {
        return [
            <Text style={styles.title} key='title'>
                Love Sing Along?
            </Text>,

            <Text style={styles.bodyText} key='body'>
                {/*Help us improve SingAlong. Please Leave here your feedback.*/}
                נתקלתם בבעיות?
                יש לכם הערות או הצעות לשיפור?
                עיזרו לנו לשפר את SingAlong.
            </Text>,

            <Rating
                key='rating'
                showRating
                type="star"
                fractions={1}
                startingValue={null}
                imageSize={40}
                onFinishRating={this.onRating.bind(this)}/>,

            <TextInput
                key='feedback'
                style={styles.feedbackInput}
                multiline={true}
                onChangeText={this.onFeedbackChange.bind(this)}
                // placeholder={'Please write your feedback'}
                placeholder={'אנא כתוב את ההערות וההצעות שלך'}/>,

            <View style={styles.buttonsBar} key='buttons'>
                <Button
                    clear
                    text='NO THANKS'
                    textStyle={styles.cancelButtonTitle}
                    onPress={this.closeDialog.bind(this)}/>

                <Button
                    clear
                    text='SUBMIT'
                    textStyle={styles.submitButtonTitle}
                    onPress={this.submit.bind(this)}/>
            </View>
        ];
    }

    renderLoader() {
        if (this.props.isRequested) {
            return <ActivityIndicator style={styles.loader}/>;
        }
    }

    renderAfterRatingContent() {
        return [
            <Text style={styles.title} key='title'>
                Thank you!
            </Text>,

            <Text style={styles.bodyText} key='body'>
                {/*Help us improve SingAlong. Please Leave here your feedback.*/}
                Thanks for helping us improve SingAlong.
            </Text>,
        ];
    }

    renderDialogContent() {
        if (!this.state.rateSuccess) {
            return this.renderBeforeRatingContent();
        } else {
            return this.renderAfterRatingContent();
        }
    }

    render() {
        return (
            <Dialog
                show={this.state.isDialogVisible}
                contentContainerStyle={styles.contentContainerStyle}
                onDismiss={this.onDismiss.bind(this)}>

                {this.renderDialogContent()}
                {this.renderLoader()}
            </Dialog>
        );
    }
}

const styles = StyleSheet.create({
    contentContainerStyle: {
        width: 320
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold'
    },
    bodyText: {
        textAlign: 'center',
        marginVertical: 15
    },
    feedbackInput: {
        width: 280,
        maxHeight: 200,
        marginVertical: 25,
        padding: 20,
        paddingTop: 20,
        textAlign: 'center',
        borderStyle: 'dashed',
        borderColor: Colors.lighterGrey,
        borderWidth: 1,
        borderRadius: 5
    },
    cancelButtonTitle: {
        fontSize: 14,
        color: Colors.lighterGrey
    },
    submitButtonTitle: {
        fontSize: 14,
        color: Colors.blue
    },
    buttonsBar: {
        flexDirection: 'row'
    },
    loader: {
        marginTop: 10
    }
});

const mapStateToProps = (state) => ({...state.userData, ...state.appData});

export default connect(mapStateToProps, {rateApp, decreaseStepsBeforeRate})(RateAppDialog);
