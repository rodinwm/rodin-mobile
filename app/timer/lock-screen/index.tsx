import {
    AlertCard,
    LucideIcon,
    MessageSheet,
    ScreenTemplate,
    ThemedButton,
    ThemedText,
    ThemedTextInput,
    ThemedView
} from '@/components';
import React, {useEffect, useState} from "react";
import {Colors} from "@/utils/colors";
import {DateService} from "@/utils/services/dateService";
import {useFocusEffect, useNavigation, useRouter} from "expo-router";
import {BackHandler} from "react-native";
import {UiService} from "@/utils/services/uiService";
import {useIsFocused} from "@react-navigation/native";

export default function Page() {
    const [timeLeft, setTimeLeft] = useState(30 * 60); // 30 minutes en secondes
    const [isRunning, setIsRunning] = useState(false);
    const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
    const [emergencyCode, setEmergencyCode] = useState('');
    const router = useRouter();
    const navigation = useNavigation();
    const isFocused = useIsFocused();

    let timer = setInterval(() => {
        if (isRunning) {
            setTimeLeft(prevTime => prevTime - 1);
        }
    }, 1000);

    /*
    useLayoutEffect(() => {
        if (!isFocused) return;

        navigation.setOptions({
            headerShown: false,
            gestureEnabled: false,
            presentation: 'transparentModal',
        });
    }, [navigation, isFocused]);
    */

    useEffect(() => {
        setEmergencyCode('');
    }, [isBottomSheetOpen]);

    useEffect(() => {
        if (timeLeft <= 0) {
            clearInterval(timer);
        }
        return () => clearInterval(timer);
    }, [isRunning, timeLeft]);

    // Android back button (physique)
    useFocusEffect(() => {
        const onBackPress = () => true; // bloque le retour
        const subscription = BackHandler.addEventListener("hardwareBackPress", onBackPress);
        return () => subscription.remove(); // ✅ la bonne manière de retirer le listener
    });

    return (
        <ScreenTemplate
            scrollEnabled={false}
            setHeightToScreenSize={true}
            backgroundImage={require('@/assets/images/wallpapers/nature-1.jpg')}
            bottomSheet={(
                <MessageSheet
                    title={"Code d'urgence"}
                    subtitle={"Entrez votre code d'urgence pour débloquer l'application et arrêter votre session."}
                    isOpen={isBottomSheetOpen}
                    onClose={() => setIsBottomSheetOpen(false)}
                    children={(
                        <ThemedTextInput
                            value={emergencyCode}
                            placeholder={"Ex: 1234"}
                            keyboardType={"number-pad"}
                            onChangeText={(text) => {
                                setEmergencyCode(text);
                            }}
                        />
                    )}
                    confirm={{
                        text: "Débloquer",
                        disabled: emergencyCode.length !== 4,
                        onPress: () => {
                            router.replace('/(tabs)')
                        }
                    }}
                />
            )}
        >
            {/* Message */}
            <ThemedView className={'w-full flex flex-col gap-3 justify-center items-center'}>
                <LucideIcon name={'LockKeyhole'} size={50} strokeWidth={1}/>
                <ThemedText type={'h1'} className={"text-center"}>
                    Téléphone verrouillé
                </ThemedText>
            </ThemedView>


            <ThemedView className={'w-full flex flex-col gap-4 justify-center items-center'}>
                <ThemedView
                    radiusStyle={"default"}
                    paddingStyle={"small"}
                    className={"flex flex-row gap-1 items-center justify-center"}
                    fillStyle={"inversed"}
                >
                    <LucideIcon name={'Brain'} size={14} inverseColor={true}/>
                    <ThemedText type={'miniExtraBold'} className={"text-center"} inverseColor={true}>
                        Temps de travail
                    </ThemedText>
                </ThemedView>

                <ThemedView
                    borderStyle={"opacity-20"}
                    radiusStyle={"default"}
                    paddingStyle={"default"}
                    className={'w-full'}
                    isBackgroundBlur={true}
                >
                    <ThemedText type={'logo'} className={"text-center"}>
                        {DateService.formatTime(timeLeft)}
                    </ThemedText>
                </ThemedView>

                <ThemedView className={'w-full flex flex-row gap-6 justify-center items-center'}>
                    <ThemedButton
                        title={"Accueil"}
                        icon={{name: 'House'}}
                        type={"outlined"}
                        isBackgroundBlur={true}
                        paddingStyle={"uniform"}
                        showTitle={false}
                        onPress={() => setIsBottomSheetOpen(true)}
                    />
                    <ThemedButton
                        title={isRunning ? "Pause" : "Play"}
                        icon={{
                            name: isRunning ? 'Pause' : 'Play',
                            color: isRunning ? Colors.background.light : Colors.background.success.light,
                        }}
                        showTitle={false}
                        isBackgroundBlur={true}
                        type={"outlined"}
                        paddingStyle={"uniform"}
                        onPress={() => setIsRunning(!isRunning)}
                    />
                    <ThemedButton
                        title={"Réinitialiser"}
                        icon={{name: 'RotateCw'}}
                        showTitle={false}
                        isBackgroundBlur={true}
                        type={"outlined"}
                        paddingStyle={"uniform"}
                        onPress={() => {
                            setTimeLeft(30 * 60);
                            setIsRunning(false);
                        }}
                    />
                </ThemedView>
            </ThemedView>

            <AlertCard
                icon={"Shrub"}
                title={"Motivation"}
                message={UiService.getTipOfTheDay()}
            />
        </ScreenTemplate>
    );
}

