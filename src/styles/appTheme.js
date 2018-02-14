import {Platform} from "react-native";
import {StatusBar} from 'react-native';

export const Colors = {
    darker: '#b71c1c',
    dark: '#d32f2f',
    primary: '#f44336',
    light: '#e57373',
    lighter: '#ffcdd2',

    success: '#5cb85c',
    info: '#5bc0de',
    warning: '#f0ad4e',
    danger: '#d9534f',

    subtitleTextColor: '#73808c',
    lightTextColor: '#aaa',
    lighterTextColor: '#ddd'
};

export const Styles = {
    navBar: Platform.OS === 'android' ? {
        navigationBarStyle: {
            backgroundColor: Colors.primary
        },
        titleStyle: {
            color: 'white'
        },
        rightButtonTextStyle: {
            color: 'white'
        },
        backButtonTintColor: 'white',
        backButtonTextStyle: 'white'
    } : null,

    translucentNavBar: {
        navigationBarStyle: {
            backgroundColor:'transparent',
            marginBottom:'-100%',
            borderBottomWidth: 0,
            marginTop: StatusBar.currentHeight,
            elevation: 0,
        }
    },

    statusBar: Platform.OS === 'android' ? {
        backgroundColor: Colors.dark
    } : null,

    translucentStatusBar: {
        translucent: true,
        backgroundColor: 'transparent',
        barStyle: 'light-content'
    },

    searchBar: Platform.OS === 'android' ? {
        lightTheme: true,
        noIcon: true,
        containerStyle: {
            backgroundColor: 'white',
            borderTopWidth: 0,
            borderBottomWidth: 0,
            elevation: 2
        },
        clearIcon: {
            color: '#86939e',
            name: 'clear',
            style: {
                marginTop: -4.5,
                fontSize: 24
            }
        },
        inputStyle: {
            fontSize: 18,
            backgroundColor: 'white',
            padding: 0
        }
    } : {
        lightTheme: true,
        containerStyle: {
            backgroundColor: 'white',
            borderTopWidth: 0
        },
        clearIcon: {
            color: '#86939e',
            name: 'clear'
        },
        inputStyle: {
            backgroundColor: '#eee',
            borderRadius: 7
        }
    },

    blurRadius: Platform.OS === 'ios' ? 5 : 1
};
