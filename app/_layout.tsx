import {DarkTheme, DefaultTheme, ThemeProvider} from '@react-navigation/native';
import {useFonts} from 'expo-font';
import {Stack} from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import {StatusBar} from 'expo-status-bar';
import {useEffect} from 'react';
import 'react-native-reanimated';
import './app.css';

import {useColorScheme} from '@/utils/hooks/useColorScheme';
import {SafeAreaProvider} from "react-native-safe-area-context";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync().then();

export default function RootLayout() {
    const colorScheme = useColorScheme();
    const [fontLoaded] = useFonts({
        "FunnelDisplay-Light": require('@/assets/fonts/FunnelDisplay/FunnelDisplay-Light.ttf'),
        "FunnelDisplay-Regular": require('@/assets/fonts/FunnelDisplay/FunnelDisplay-Regular.ttf'),
        "FunnelDisplay-Medium": require('@/assets/fonts/FunnelDisplay/FunnelDisplay-Medium.ttf'),
        "FunnelDisplay-SemiBold": require('@/assets/fonts/FunnelDisplay/FunnelDisplay-SemiBold.ttf'),
        "FunnelDisplay-Bold": require('@/assets/fonts/FunnelDisplay/FunnelDisplay-Bold.ttf'),
        "FunnelDisplay-ExtraBold": require('@/assets/fonts/FunnelDisplay/FunnelDisplay-ExtraBold.ttf'),
        "FunnelDisplay-VariableFontWeight": require('@/assets/fonts/FunnelDisplay/FunnelDisplay-VariableFontWeight.ttf'),
    });

    useEffect(() => {
        if (fontLoaded) {
            SplashScreen.hideAsync().then();
        }
    }, [fontLoaded]);

    if (!fontLoaded) {
        return null;
    }

    return (
        <SafeAreaProvider>
            <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
                <Stack>
                    <Stack.Screen name="(tabs)" options={{headerShown: false}}/>
                    <Stack.Screen name="timer/index" options={{headerShown: false}}/>
                    <Stack.Screen name="+not-found"/>
                </Stack>
                <StatusBar style="auto"/>
            </ThemeProvider>
        </SafeAreaProvider>
    );
}
