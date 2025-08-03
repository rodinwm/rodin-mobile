import {useEffect, useState} from 'react';
import {Keyboard, KeyboardEvent, Platform} from 'react-native';

export function useKeyboard() {
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);
    const [keyboardHeight, setKeyboardHeight] = useState(0);

    useEffect(() => {
        const showEvent = Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow';
        const hideEvent = Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide';

        const onKeyboardShow = (event: KeyboardEvent) => {
            setKeyboardVisible(true);
            setKeyboardHeight(event.endCoordinates.height);
        };

        const onKeyboardHide = () => {
            setKeyboardVisible(false);
            setKeyboardHeight(0);
        };

        const showSub = Keyboard.addListener(showEvent, onKeyboardShow);
        const hideSub = Keyboard.addListener(hideEvent, onKeyboardHide);

        return () => {
            showSub.remove();
            hideSub.remove();
        };
    }, []);

    return {isKeyboardVisible, keyboardHeight};
}