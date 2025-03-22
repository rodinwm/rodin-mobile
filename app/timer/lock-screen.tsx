import {ThemedView} from '@/components/base/ThemedView';
import React, {useEffect, useState} from "react";
import {ThemedButton} from "@/components/base/ThemedButton";
import {ThemedText} from '@/components/base/ThemedText';
import LucideIcon from "@/components/base/LucideIcon";
import {AlertCard} from "@/components/AlertCard";
import ScreenTemplate from "@/components/layouts/ScreenTemplate";
import {Colors} from "@/utils/colors";

export default function Page() {
    const [timeLeft, setTimeLeft] = useState(30 * 60); // 30 minutes en secondes
    const [isRunning, setIsRunning] = useState(true);

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
            setHeightToScreenSize={true}
        >
            {/* Message */}
            <ThemedView className={'w-full flex flex-col gap-3 justify-center items-center'}>
                <LucideIcon name={'LockKeyhole'} size={50} strokeWidth={1}/>
                <ThemedText type={'h1'} className={"text-center"}>
                    Téléphone verrouillé
                </ThemedText>
            </ThemedView>


            <ThemedView className={'w-full flex flex-col gap-4 justify-center items-center'}>
                <ThemedText type={'subtitle'} className={"text-center opacity-50"}>
                    Temps de travail
                </ThemedText>
                <ThemedView
                    //outlined={true}
                    radiusStyle={"default"}
                    paddingStyle={"default"}
                    fillStyle={"opacity-5"}
                    className={'w-full'}
                >
                    <ThemedText type={'logo'} className={"text-center mt-4 "}>
                        {formatTime(timeLeft)}
                    </ThemedText>
                </ThemedView>

                <ThemedView className={'w-full flex flex-row gap-14 justify-center items-center'}>
                    <ThemedButton
                        title={"Accueil"}
                        icon={{name: 'House'}}
                        type={"no-fill"}
                        showTitle={false}
                    />
                    <ThemedButton
                        title={isRunning ? "Pause" : "Play"}
                        icon={{
                            name: isRunning ? 'Pause' : 'Play',
                            color: isRunning ? Colors.background.light : Colors.background.success.light,
                        }}
                        showTitle={false}
                        type={"no-fill"}
                        onPress={() => setIsRunning(!isRunning)}
                    />
                    <ThemedButton
                        title={"Réinitialiser"}
                        icon={{name: 'RotateCw'}}
                        showTitle={false}
                        type={"no-fill"}
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

