import {DarkTheme, DefaultTheme, ThemeProvider} from '@react-navigation/native';
import {useFonts} from 'expo-font';
import {Stack} from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import {StatusBar} from 'expo-status-bar';
import {useEffect} from 'react';
import 'react-native-reanimated';
import './app.css';
import {Appearance, Dimensions} from 'react-native';

import {useColorScheme} from '@/utils/hooks/useColorScheme';
import {SafeAreaProvider} from "react-native-safe-area-context";
import {GestureHandlerRootView} from "react-native-gesture-handler";
import Routes from "@/app/routes";
import ToastManager from "toastify-react-native";
import {FontHelper} from "@/utils/helpers/fontHelper";
import {FontWeightEnum} from "@/utils/enums";
import {Colors} from "@/utils/colors";
import {AppearanceHelper} from "@/utils/helpers/appearanceHelper";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync().then();

export default function RootLayout() {
    const colorScheme = useColorScheme() ?? 'light';
    const appearance = Appearance.getColorScheme();

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
        // Font loading
        if (fontLoaded) {
            SplashScreen.hideAsync().then();
        }

        // Appearance setting up
        AppearanceHelper.loadSavedTheme().then((loadedTheme) => {
            AppearanceHelper.applyTheme(loadedTheme);
        });

    }, [fontLoaded]);

    if (!fontLoaded) {
        return null;
    }

    return (
        <GestureHandlerRootView>
            <SafeAreaProvider>
                <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
                    <Stack>
                        {Routes.map((route) => (
                            <Stack.Screen
                                key={route}
                                name={route}
                                options={{headerShown: false}}
                            />
                        ))}
                        <Stack.Screen name="+not-found"/>
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
                            fontFamily: FontHelper.getMainFontStatic(FontWeightEnum.Regular)
                        }}
                        style={{
                            borderRadius: 18,
                            padding: 10,
                            backgroundColor: Colors.background.toast[colorScheme],
                            color: Colors.background.toast[colorScheme],
                            borderWidth: 1,
                            borderColor: Colors.background[colorScheme == "light" ? "dark" : "light"] + '11',
                            // Shadow
                            shadowColor: "#000000", // Couleur de l'ombre
                            shadowOffset: {width: 0, height: 10}, // Décalage vertical
                            shadowOpacity: 0.2, // Opacité de l'ombre
                            shadowRadius: 10, // Taille du flou de l'ombre
                            elevation: 8, // Ombre pour Android
                        }}
                    />

                    <StatusBar style="auto"/>
                </ThemeProvider>
            </SafeAreaProvider>
        </GestureHandlerRootView>
    );
}
