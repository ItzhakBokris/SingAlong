import React, {Component} from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import {Section} from '../../components';
import {Colors, Styles} from '../../styles';
import {ListItem} from 'react-native-elements';
import RateAppDialog from '../rateAppDialog'

export class About extends Component {

    state = {
        showRateAppDialog: false
    };

    showHideRateAppDialog() {
        this.setState({showRateAppDialog: !this.state.showRateAppDialog});
    }

    render() {
        return (
            <ScrollView>
                <View style={styles.container}>
                    <Section containerStyle={styles.section}>
                        <View style={styles.appLogoContainer}>
                            <Image
                                style={styles.appLogo}
                                source={require('../../../assets/appLogoTransparent.png')}/>
                        </View>

                        <Text style={styles.paragraph}>
                            סינג-אלונג הינה אפליקציה חינמית שמיועדת לכם חובבי השירה והנגינה. בגרסא זו ניתן:
                        </Text>
                        <Text style={styles.paragraph}>{'\u2022'} לפתוח קבוצה ולהזמין חברים</Text>
                        <Text style={styles.paragraph}>{'\u2022'} להוסיף שירים לפלייליסט</Text>
                        <Text style={styles.paragraph}>{'\u2022'} לצפות באקורדים</Text>
                        <Text style={styles.paragraph}>{'\u2022'} לגלול את השיר בצורה אוטומטית</Text>
                        <Text style={styles.paragraph}>כיוון שהצפייה בשירים משותפת רק מנהל הקבוצה יכול להעביר
                            שירים.</Text>

                        <View style={styles.akumContainer}>
                            <Text style={[styles.paragraph, styles.akumParagraph]}>השירות פועל ברשיון אקום</Text>
                            <Image
                                style={styles.akumLogo}
                                source={require('../../../assets/akumLogo.png')}/>
                        </View>
                    </Section>

                    <Section>
                        <ListItem
                            title='הפידבק שלך מאוד חשוב לנו!'
                            subtitle="נתקלת בבעיה? חיפשת שיר ולא מצאת? נשמח לקבל הערות והצעות לשיפור."
                            subtitleNumberOfLines={null}
                            onPress={this.showHideRateAppDialog.bind(this)}
                            {...Styles.listActionItem}
                            titleStyle={[{...Styles.listActionItem.titleStyle}, styles.feedbackButtonText]}
                            subtitleStyle={styles.feedbackButtonText}/>
                    </Section>

                    <RateAppDialog
                        show={this.state.showRateAppDialog}
                        onDismiss={this.showHideRateAppDialog.bind(this)}/>
                </View>
            </ScrollView>
        );
    }
}

const sectionPaddingTop = 15;

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    section: {
        paddingVertical: sectionPaddingTop
    },
    appLogoContainer: {
        marginTop: -sectionPaddingTop,
        padding: 20,
        marginBottom: sectionPaddingTop,
        backgroundColor: Colors.primary
    },
    appLogo: {
        height: 100,
        alignSelf: 'center',
        resizeMode: 'contain'
    },
    paragraph: {
        fontSize: 16,
        paddingHorizontal: 15,
        paddingVertical: 3,
        textAlign: 'right'
    },
    akumContainer: {
        marginTop: sectionPaddingTop,
        flexDirection: 'row-reverse',
        alignItems: 'center'
    },
    akumParagraph: {
        color: 'black',
        fontWeight: 'bold'
    },
    akumLogo: {
        width: 50,
        height: 50
    },
    feedbackButtonText: {
        textAlign: 'right'
    }
});
