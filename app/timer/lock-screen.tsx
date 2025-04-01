import {ThemedView} from '@/components/base/ThemedView';
import React, {useEffect, useState} from "react";
import {ThemedButton} from "@/components/base/ThemedButton";
import {ThemedText} from '@/components/base/ThemedText';
import LucideIcon from "@/components/base/LucideIcon";
import {AlertCard} from "@/components/AlertCard";
import ScreenTemplate from "@/components/layouts/ScreenTemplate";
import {Colors} from "@/utils/colors";
import {useNavigation} from "expo-router";

export default function Page() {
    const [timeLeft, setTimeLeft] = useState(30 * 60); // 30 minutes en secondes
    const [isRunning, setIsRunning] = useState(true);
    const navigation = useNavigation();

    let timer = setInterval(() => {
        if (isRunning) {
            setTimeLeft(prevTime => prevTime - 1);
        }
    }, 1000);

    useEffect(() => {
        if (timeLeft <= 0) {
            clearInterval(timer);
        }
        return () => clearInterval(timer);
    }, [isRunning, timeLeft]);

    // Formater le temps en MM:SS
    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <ScreenTemplate
            scrollEnabled={false}
            setHeightToScreenSize={true}
            backgroundImage={require('@/assets/images/wallpapers/nature-1.jpg')}
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
                    outlined={true}
                    radiusStyle={"default"}
                    paddingStyle={"mini"}
                    className={"flex flex-row gap-1 items-center justify-center"}
                    fillStyle={"inversed"}
                >
                    <LucideIcon name={'Brain'} size={14} inverseColor={true}/>
                    <ThemedText type={'miniExtraBold'} className={"text-center"} inverseColor={true}>
                        Temps de travail
                    </ThemedText>
                </ThemedView>

                <ThemedView
                    outlined={true}
                    radiusStyle={"default"}
                    paddingStyle={"default"}
                    className={'w-full'}
                    isBackgroundBlur={true}
                >
                    <ThemedText type={'logo'} className={"text-center mt-4 "}>
                        {formatTime(timeLeft)}
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
                        onPress={() => navigation.goBack()}
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
                message={"Phrase de motivation aléatoire ici"}
            />
        </ScreenTemplate>
    );
}

