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
import {useFocusEffect, useRouter} from "expo-router";
import {BackHandler} from "react-native";
import {UiService} from "@/utils/services/uiService";
import {useAuthUser} from "@/utils/hooks/useAuthUser";
import {ToastService} from "@/utils/services/toastService";
import {ToastType} from "@/utils/enums";
import {useCountdownTimer} from "@/utils/hooks/useCountdownTimer";

export default function Page() {
    const router = useRouter();
    const {authUser} = useAuthUser({});
    const {secondsLeft, isRunning, startTimer, stopTimer, resetTimer} = useCountdownTimer(30 * 60);
    const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
    const [emergencyCode, setEmergencyCode] = useState('');


    useEffect(() => {
        setEmergencyCode('');
    }, [isBottomSheetOpen]);

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
                            if (emergencyCode === authUser?.emergencyCode) {
                                setIsBottomSheetOpen(false);
                                resetTimer().then();
                                router.replace('/(tabs)')
                            } else {
                                UiService.hapticImpact("error");
                                ToastService.show({
                                    type: ToastType.Error,
                                    message: "Code d'urgence incorrect. Veuillez réessayer."
                                });
                            }
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
                        {DateService.formatTime(secondsLeft)}
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
                        onPress={isRunning ? stopTimer : startTimer}
                    />
                    <ThemedButton
                        title={"Réinitialiser"}
                        icon={{name: 'RotateCw'}}
                        showTitle={false}
                        isBackgroundBlur={true}
                        type={"outlined"}
                        paddingStyle={"uniform"}
                        onPress={resetTimer}
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

