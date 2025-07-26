import {useEffect, useRef, useState} from 'react';
import {AppState, AppStateStatus} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BackgroundTimer from 'react-native-background-timer';

const STORAGE_KEY = '@rodin_timer_start';

export function useCountdownTimer(initialSeconds: number) {
    const [secondsLeft, setSecondsLeft] = useState<number>(initialSeconds);
    const [isRunning, setIsRunning] = useState(false);

    const appState = useRef(AppState.currentState);

    useEffect(() => {
        const subscription = AppState.addEventListener('change', handleAppStateChange);
        return () => subscription.remove();
    }, []);

    async function handleAppStateChange(nextState: AppStateStatus) {
        if (appState.current.match(/inactive|background/) && nextState === 'active') {
            const start = await AsyncStorage.getItem(STORAGE_KEY);
            if (start) {
                const elapsed = Math.floor((Date.now() - parseInt(start)) / 1000);
                setSecondsLeft(prev => Math.max(initialSeconds - elapsed, 0));
                if (elapsed >= initialSeconds) stopTimer();
            }
        }
        appState.current = nextState;
    }

    const startTimer = async () => {
        await AsyncStorage.setItem(STORAGE_KEY, Date.now().toString());
        setSecondsLeft(initialSeconds);
        setIsRunning(true);

        BackgroundTimer.runBackgroundTimer(() => {
            setSecondsLeft(prev => {
                const next = prev - 1;
                if (next <= 0) {
                    stopTimer();
                    return 0;
                }
                return next;
            });
        }, 1000);
    };

    const stopTimer = () => {
        BackgroundTimer.stopBackgroundTimer();
        setIsRunning(false);
        AsyncStorage.removeItem(STORAGE_KEY).catch(() => {
        });
    };

    const resetTimer = () => {
        stopTimer();
        setSecondsLeft(initialSeconds);
    };

    return {secondsLeft, isRunning, startTimer, stopTimer, resetTimer};
}