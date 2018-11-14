import React, {Component} from 'react';
import {Image, StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {Colors} from '../../styles';

export class Welcome extends Component {

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.topSection}>
                    <View style={styles.welcomeTextContainer}>
                        <Text style={styles.welcomeText}>ברוכים הבאים</Text>
                    </View>
                    <View style={styles.appLogoContainer}>
                        <Image style={styles.appLogo} source={require('../../../assets/appLogo.jpeg')}/>
                    </View>
                </View>

                <View style={styles.bottomSection}>
                    <Text style={styles.aboutText}>
                        ברוכים הבאים ל- <Text style={styles.appName}>SingAlong</Text>. אפליקציית השירה החברתית של ישראל.
                    </Text>
                    <Text style={styles.aboutText}>
                        מהיום כולם צופים בשירים יחד, מוסיפים שירים לפלייליסט, מזמינים חברים להצטרף ומנגנים בעזרת אקורדים!
                    </Text>
                    <TouchableHighlight style={styles.startButtonContainer} onPress={() => Actions.enterGroup()}>
                        <Text style={styles.startButton}>בואו נתחיל</Text>
                    </TouchableHighlight>
                </View>
            </View>
        );
    }
}

const LOGO_SIZE = 100;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    topSection: {
        flex: 2,
        alignItems: 'center'
    },
    welcomeTextContainer: {
        flex: 1,
        width: '100%',
        padding: 20,
        backgroundColor: Colors.primary,
        alignItems: 'center',
        justifyContent: 'center'
    },
    welcomeText: {
        color: 'white',
        fontSize: 48
    },
    appLogoContainer: {
        position: 'absolute',
        width: LOGO_SIZE,
        height: LOGO_SIZE,
        bottom: -LOGO_SIZE / 2,
        borderRadius: LOGO_SIZE / 4,
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 6},
        shadowOpacity: 0.4,
        shadowRadius: 10,
        elevation: 12,
        backgroundColor: 'transparent'
    },
    appLogo: {
        flex: 1,
        width: '100%',
        borderRadius: LOGO_SIZE / 4
    },
    bottomSection: {
        flex: 3,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: LOGO_SIZE / 2,
        paddingHorizontal: 20
    },
    aboutText: {
        color: Colors.darkGray,
        fontSize: 20,
        textAlign: 'center',
        paddingVertical: 5
    },
    appName: {
        fontWeight: 'bold'
    },
    startButtonContainer: {
        marginTop: 40,
    },
    startButton: {
        backgroundColor: Colors.blue,
        paddingVertical: 10,
        paddingHorizontal: 30,
        fontSize: 20,
        color: 'white'
    }
});
