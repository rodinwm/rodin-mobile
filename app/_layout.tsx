import {DarkTheme, DefaultTheme, ThemeProvider} from '@react-navigation/native';
import {useFonts} from 'expo-font';
import {Stack} from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import {StatusBar} from 'expo-status-bar';
import {useEffect, useState} from 'react';
import 'react-native-reanimated';
import './app.css';
import {Appearance, Dimensions} from 'react-native';

import {useColorScheme} from '@/utils/hooks/useColorScheme';
import {SafeAreaProvider} from "react-native-safe-area-context";
import {GestureHandlerRootView} from "react-native-gesture-handler";
import ToastManager from "toastify-react-native";
import {FontService} from "@/utils/services/fontService";
import {FontWeightEnum} from "@/utils/enums";
import {Colors} from "@/utils/colors";
import {AppearanceService} from "@/utils/services/appearanceService";
import {PreloadService} from "@/utils/services/preloadService";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync().then();

// Set the animation options. This is optional.
SplashScreen.setOptions({
    duration: 1000,
    fade: true,
});

export default function RootLayout() {
    const colorScheme = useColorScheme() ?? 'light';
    const appearance = Appearance.getColorScheme();
    const [resourcesLoaded, setResourcesLoaded] = useState(false);

    const [fontLoaded] = useFonts({
        // Base
        "FunnelDisplay-Light": require('@/assets/fonts/FunnelDisplay/FunnelDisplay-Light.ttf'),
        "FunnelDisplay-Regular": require('@/assets/fonts/FunnelDisplay/FunnelDisplay-Regular.ttf'),
        "FunnelDisplay-Medium": require('@/assets/fonts/FunnelDisplay/FunnelDisplay-Medium.ttf'),
        "FunnelDisplay-SemiBold": require('@/assets/fonts/FunnelDisplay/FunnelDisplay-SemiBold.ttf'),
        "FunnelDisplay-Bold": require('@/assets/fonts/FunnelDisplay/FunnelDisplay-Bold.ttf'),
        "FunnelDisplay-ExtraBold": require('@/assets/fonts/FunnelDisplay/FunnelDisplay-ExtraBold.ttf'),
        "FunnelDisplay-VariableFontWeight": require('@/assets/fonts/FunnelDisplay/FunnelDisplay-VariableFontWeight.ttf'),
        // Poppins
        "Poppins-Black": require('@/assets/fonts/Poppins/Poppins-Black.ttf'),
    });

    // Preload assets
    useEffect(() => {
        PreloadService.preloadResources().then((isAssetsLoaded) => {
            setResourcesLoaded(fontLoaded && isAssetsLoaded);
            SplashScreen.hideAsync().then();
        }).catch((error) => {
            console.warn("Error loading assets:", error);
        });
    }, [fontLoaded]);

    // Apply saved theme
    useEffect(() => {
        AppearanceService.loadSavedTheme().then((loadedTheme) => {
            AppearanceService.applyTheme(loadedTheme);
        });
    }, []);

    if (!resourcesLoaded) {
        return null;
    }

    return (
        <GestureHandlerRootView style={{flex: 1}}>
            <SafeAreaProvider>
                <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
                    <Stack screenOptions={{headerShown: false}}>
                        {/*
                        <Stack.Screen name="+not-found"/>
                        */}
                    </Stack>

                    <ToastManager
                        width={Dimensions.get("screen").width * 0.9}
                        height={"auto"}
                        theme={colorScheme}
                        duration={3000}
                        position={"top"}
                        animationIn={"slideInDown"}
                        animationOut={"slideOutUp"}
                        showProgressBar={false}
                        showCloseIcon={false}
                        textStyle={{
                            fontFamily: FontService.getMainFontStatic(FontWeightEnum.Regular)
                        }}
                        style={{
                            borderRadius: 18,
                            padding: 10,
                            backgroundColor: Colors.background.toast[colorScheme],
                            color: Colors.background.toast[colorScheme],
                            borderWidth: 1,
                            borderColor: Colors.background[colorScheme == "light" ? "dark" : "light"] + '11',
                            // Shadow
                            shadowColor: "#000000",
                            shadowOffset: {width: 0, height: 10},
                            shadowOpacity: 0.2,
                            shadowRadius: 10,
                            elevation: 8, // Ombre pour Android
                        }}
                    />

                    <StatusBar style="auto"/>
                </ThemeProvider>
            </SafeAreaProvider>
        </GestureHandlerRootView>
    );
}
