import {Platform} from "react-native";

export const Colors = {
    darker: '#271345',
    dark: '#3d1d6e',
    primary: '#6a33be',
    light: '#a17bdc',
    lighter: '#bea4e6',

    success: '#5cb85c',
    info: '#5bc0de',
    warning: '#f0ad4e',
    danger: '#d9534f',

    subtitleTextColor: '#73808c',
    lightTextColor: '#aaa'
};

export const Styles = {
    navigationBar: Platform.OS === 'android' ? {
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

    statusBar: Platform.OS === 'android' ? {
        backgroundColor: Colors.dark
    } : null,

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
    }
};
