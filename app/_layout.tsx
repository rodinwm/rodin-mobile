import {DarkTheme, DefaultTheme, ThemeProvider} from '@react-navigation/native';
import {useFonts} from 'expo-font';
import {Stack} from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import {StatusBar} from 'expo-status-bar';
import {useEffect} from 'react';
import 'react-native-reanimated';
import './app.css';

import {useColorScheme} from '@/hooks/useColorScheme';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync().then();

export default function RootLayout() {
    const colorScheme = useColorScheme();
    const [loaded] = useFonts({
        "FunnelDisplay-Light": require('@/assets/fonts/FunnelDisplay/FunnelDisplay-Light.ttf'),
        "FunnelDisplay-Regular": require('@/assets/fonts/FunnelDisplay/FunnelDisplay-Regular.ttf'),
        "FunnelDisplay-Medium": require('@/assets/fonts/FunnelDisplay/FunnelDisplay-Medium.ttf'),
        "FunnelDisplay-SemiBold": require('@/assets/fonts/FunnelDisplay/FunnelDisplay-SemiBold.ttf'),
        "FunnelDisplay-Bold": require('@/assets/fonts/FunnelDisplay/FunnelDisplay-Bold.ttf'),
        "FunnelDisplay-ExtraBold": require('@/assets/fonts/FunnelDisplay/FunnelDisplay-ExtraBold.ttf'),
    });

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync().then();
        }
    }, [loaded]);

    if (!loaded) {
        return null;
    }

    return (
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            <Stack>
                <Stack.Screen name="(tabs)" options={{headerShown: false}}/>
                <Stack.Screen name="+not-found"/>
            </Stack>
            <StatusBar style="auto"/>
        </ThemeProvider>
    );
}
