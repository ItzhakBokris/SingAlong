import {AsyncStorage} from 'react-native';

export class AppStorage {

    static set(key, value, onSuccess, onFailure) {
        try {
            value = !value ? '' : (typeof value === 'object' ? JSON.stringify(value) : value.toString());
            AsyncStorage.setItem(key, value).then(onSuccess).catch(onFailure);
        } catch (error) {
            if (onFailure) {
                onFailure(error);
            }
            console.log(error.message);
        }
    }

    static get(key, onSuccess, onFailure) {
        try {
            AsyncStorage.getItem(key).then(onSuccess).catch(onFailure);
        } catch (error) {
            if (onFailure) {
                onFailure(error);
            }
            console.log(error.message);
        }
    }
}
