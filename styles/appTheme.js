import {Platform} from "react-native";

export const Colors = {
    darker: '#271345',
    dark: '#3d1d6e',
    primary: '#6a33be',
    light: '#a17bdc',
    lighter: '#bea4e6',
    lightTextColor: '#aaa'
};

export const Styles = {
    navigationBar: Platform.OS !== 'ios' ? {
        navigationBarStyle: {
            backgroundColor: Colors.primary
        },
        titleStyle: {
            color: 'white'
        },
        backButtonTintColor: 'white',
        backButtonTextStyle: 'white'
    } : null,
    statusBar: Platform.OS !== 'ios' ? {
        backgroundColor: Colors.dark
    } : null
};
