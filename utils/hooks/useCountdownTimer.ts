import {useEffect, useRef, useState} from 'react';
import {AppState, AppStateStatus} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BackgroundTimer from 'react-native-background-timer';

const STORAGE_KEY = '@rodin_timer_start';
const REMAINING_KEY = '@rodin_timer_remaining';

export function useCountdownTimer(initialSeconds: number) {
    const [secondsLeft, setSecondsLeft] = useState<number>(initialSeconds);
    const [isRunning, setIsRunning] = useState(false);

    const appState = useRef(AppState.currentState);

    useEffect(() => {
        const subscription = AppState.addEventListener('change', handleAppStateChange);
        return () => subscription.remove();
    }, []);

    // 🔁 Lorsqu'on revient sur l'app
    async function handleAppStateChange(nextState: AppStateStatus) {
        if (appState.current.match(/inactive|background/) && nextState === 'active') {
            const start = await AsyncStorage.getItem(STORAGE_KEY);
            const remaining = await AsyncStorage.getItem(REMAINING_KEY);
            if (start && remaining) {
                const elapsed = Math.floor((Date.now() - parseInt(start)) / 1000);
                const left = parseInt(remaining) - elapsed;
                setSecondsLeft(Math.max(left, 0));
                if (left <= 0) stopTimer();
            }
        }
        appState.current = nextState;
    }

    const startTimer = async () => {
        const now = Date.now();
        await AsyncStorage.setItem(STORAGE_KEY, now.toString());
        await AsyncStorage.setItem(REMAINING_KEY, secondsLeft.toString());
        setIsRunning(true);

        BackgroundTimer.runBackgroundTimer(() => {
            setSecondsLeft(prev => {
                const next = prev - 1;
                AsyncStorage.setItem(REMAINING_KEY, next.toString()).catch(() => {
                });
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
        // ❌ NE SUPPRIME PAS le STORAGE_KEY ici pour permettre reprise
    };

    const resetTimer = async () => {
        stopTimer();
        setSecondsLeft(initialSeconds);
        await AsyncStorage.multiRemove([STORAGE_KEY, REMAINING_KEY]);
    };

    return {secondsLeft, isRunning, startTimer, stopTimer, resetTimer};
}