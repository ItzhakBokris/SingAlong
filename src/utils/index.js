import Toast from 'react-native-root-toast';
export * from './appStorage';
export * from './firebaseUtils'

export const showToastMessage = (message, duration) => Toast.show(message, {
    duration: duration || Toast.durations.SHORT,
    position: Toast.positions.BOTTOM,
    animation: true,
    hideOnPress: true
});

export const generateUid = () => 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    let r = Math.random() * 16 | 0;
    let v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
});

export const hashCode = (text) => {
    let hash = 0;
    for (let i = 0; i < text.length; i++) {
        hash = ((hash << 5) - hash) + text.charCodeAt(i);
        hash |= 0; // convert to 32bit integer
    }
    return (hash >= 0 ? '0' : '1') + Math.abs(hash);
};
