import React, {Component} from "react";
import {StyleSheet, View} from "react-native";
import {Button, FormInput, FormLabel} from "react-native-elements";
import {Colors} from "../styles/appTheme";

export default class OpenGroupComponent extends Component {
    render() {
        return (
            <View style={styles.container}>
                <FormLabel>Group Name</FormLabel>
                <FormInput
                    underlineColorAndroid='lightgrey'
                    placeholder="Please enter group name..."
                    onChangeText={() => console.log(111)}/>

                <FormLabel>Nickname</FormLabel>
                <FormInput
                    underlineColorAndroid='lightgrey'
                    placeholder="Please enter your nickname..."
                    onChangeText={() => console.log(111)}/>

                <Button
                    disabled
                    backgroundColor={Colors.primary}
                    onPress={() => console.log(11)}
                    buttonStyle={styles.createButton}
                    title='Create'/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    createButton: {
        marginTop: 50,
        marginHorizontal: 20
    }
});