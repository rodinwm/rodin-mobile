import {ScreenTemplate, ThemedButton, ThemedText, ThemedView} from '@/components';
import React, {useEffect, useState} from "react";
import {useRouter} from "expo-router";
import {DateHelper} from "@/utils/helpers/dateHelper";
import {UIHelper} from "@/utils/helpers/UIHelper";

export default function Page() {
    const router = useRouter();
    // Game setup
    const [isRunning, setIsRunning] = useState(false);
    // Timer setup
    const totalTime = 30; // 1m30s en secondes
    const [timeLeft, setTimeLeft] = useState(totalTime);

    // Gestion du temps global
    useEffect(() => {
        if (!isRunning) return;

        const timer = setInterval(() => {
            setTimeLeft(prevTime => {
                const newTime = prevTime - 1;
                if (newTime <= 0) {
                    setIsRunning(false);
                    clearInterval(timer);
                    UIHelper.hapticImpact('error');
                    return 0;
                }

                return newTime;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [isRunning]);

    const startGame = () => {
        setIsRunning(true);
    }

    const isGameStarted = () => {
        return timeLeft < totalTime;
    }

    const isGameOver = () => {
        return !isRunning && timeLeft === 0;
    }

    return (
        <ScreenTemplate
            title={"Respiration"}
            headerLeftBtn={"backBtn"}
            setHeightToScreenSize={true}
            scrollEnabled={false}
        >
            <ThemedView
                className={'w-full flex flex-col justify-center items-center'}
            >
                <ThemedText type={'logo'} className={"text-center"}>
                    {DateHelper.formatTime(timeLeft)}
                </ThemedText>

                <ThemedText type={'subtitle'} className={"text-center"}>
                    Prenez quelques secondes pour souffler un peu
                </ThemedText>
            </ThemedView>

            {/* Container */}
            <ThemedView
                className={'flex-1 flex justify-center items-center'}
                paddingStyle={'small'}
                radiusStyle={"default"}
                borderStyle={"default"}
            >
                {/* Breathing circles */}
                <ThemedView
                    className={'w-48 aspect-square flex justify-center items-center'}
                    fillStyle={'opacity-10'}
                    radiusStyle={'full'}
                    paddingStyle={"default"}
                    borderStyle={'default'}
                    borderWidth={2}
                >
                    <ThemedView
                        className={'flex justify-center items-center'}
                        fillStyle={'inversed'}
                        radiusStyle={'full'}
                        paddingStyle={"default"}
                    />
                </ThemedView>
            </ThemedView>


            <ThemedButton
                title={isGameOver() ? 'Suivant' : "Start"}
                disabled={isRunning || (isGameStarted() && !isGameOver())}
                onPress={() => {
                    if (isGameOver()) {
                        router.push('/timer/lock-screen');
                    } else {
                        startGame();
                    }
                }}
            />
        </ScreenTemplate>
    );
}