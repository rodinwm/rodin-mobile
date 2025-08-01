import {useEffect, useRef, useState} from 'react';
import {AppState, AppStateStatus} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BackgroundTimer from 'react-native-background-timer';

const STORAGE_KEY = '@rodin_timer_start';
const REMAINING_KEY = '@rodin_timer_remaining';

type UseCountdownTimerOptions = {
    initialSeconds: number;
    onFinish?: () => void;
};

export function useCountdownTimer({initialSeconds, onFinish}: UseCountdownTimerOptions) {
    const [secondsLeft, setSecondsLeft] = useState(initialSeconds);
    const [isRunning, setIsRunning] = useState(false);
    const appState = useRef(AppState.currentState);
    const finishedRef = useRef(false); // Pour éviter d'appeler onFinish plusieurs fois

    useEffect(() => {
        const subscription = AppState.addEventListener('change', handleAppStateChange);
        return () => subscription.remove();
    }, []);

    async function handleAppStateChange(nextState: AppStateStatus) {
        if (appState.current.match(/inactive|background/) && nextState === 'active') {
            const start = await AsyncStorage.getItem(STORAGE_KEY);
            const remaining = await AsyncStorage.getItem(REMAINING_KEY);

            if (start && remaining) {
                const startTimestamp = parseInt(start, 10);
                const remainingSeconds = parseInt(remaining, 10);
                const now = Date.now();
                const elapsed = Math.floor((now - startTimestamp) / 1000);
                const newSecondsLeft = Math.max(remainingSeconds - elapsed, 0);

                setSecondsLeft(newSecondsLeft);

                if (newSecondsLeft <= 0) {
                    stopTimer();
                    if (onFinish && !finishedRef.current) {
                        finishedRef.current = true;
                        onFinish();
                    }
                }
            }
        }

        appState.current = nextState;
    }

    const startTimer = async () => {
        const now = Date.now();
        await AsyncStorage.setItem(STORAGE_KEY, now.toString());
        await AsyncStorage.setItem(REMAINING_KEY, secondsLeft.toString());

        setIsRunning(true);
        finishedRef.current = false;

        BackgroundTimer.stopBackgroundTimer(); // reset any existing
        BackgroundTimer.runBackgroundTimer(() => {
            setSecondsLeft(prev => {
                const next = prev - 1;

                if (next <= 0) {
                    stopTimer();
                    if (onFinish && !finishedRef.current) {
                        finishedRef.current = true;
                        onFinish();
                    }
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

    const resetTimer = async () => {
        stopTimer();
        finishedRef.current = false;
        setSecondsLeft(initialSeconds);
        await AsyncStorage.multiRemove([STORAGE_KEY, REMAINING_KEY]);
    };

    return {secondsLeft, isRunning, startTimer, stopTimer, resetTimer};
}