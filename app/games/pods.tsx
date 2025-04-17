import {ThemedView} from '@/components/base/ThemedView';
import React, {useEffect, useState} from "react";
import {useRouter} from "expo-router";
import ScreenTemplate from '@/components/layouts/ScreenTemplate';
import {ThemedButton} from "@/components/base/ThemedButton";
import {ThemedText} from "@/components/base/ThemedText";
import {DateHelper} from "@/utils/helpers/dateHelper";
import {FlatList} from "react-native";
import {GameHelper} from "@/utils/helpers/gameHelper";
import {PodColor} from "@/utils/enums";
import {Pod} from "@/utils/interfaces";
import {UIHelper} from "@/utils/helpers/uiHelper";

export default function Page() {
    const router = useRouter();
    const totalTime = 90; // 1m30s en secondes
    const eachStepTime = 1;//totalTime / 30; // totalTime réparti en étapes de 90/30 = 3 secondes
    const [step, setStep] = useState(GameHelper.getEmptyPodsGameStep());
    const [timeLeft, setTimeLeft] = useState(totalTime);
    const [isRunning, setIsRunning] = useState(false);
    const [bestScore, setBestScore] = useState(0);
    const [score, setScore] = useState(0);
    const [errorCount, setErrorCount] = useState(0);

    useEffect(() => {
        if (!isRunning) return;

        const timer = setInterval(() => {
            setTimeLeft(prevTime => {
                const newTime = prevTime - 1;

                // Action toutes les 6 secondes (sauf au tout début ou à la fin)
                if ((0 < newTime && newTime < totalTime) && (newTime % eachStepTime === 0)) {
                    console.info("🎯 Action toutes les secondes !");
                    setStep(GameHelper.generatePodsGameStep());
                }

                // Stopper quand on atteint 0
                if (newTime <= 0) {
                    setIsRunning(false);
                    clearInterval(timer);
                    return 0;
                }

                return newTime;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [isRunning]);


    const startGame = () => {
        setStep(GameHelper.generatePodsGameStep());
        setIsRunning(true);
    }

    const isGameStarted = () => {
        return timeLeft < totalTime;
    }

    const isGameOver = () => {
        return !isRunning && timeLeft === 0;
    }

    const onPodTap = (pod: Pod) => {
        console.info(`Pod ${pod.color} tapped!`);
        if (pod.color === PodColor.Red) {
            UIHelper.hapticImpact();
            setScore(prevState => prevState + 1);
            setStep(GameHelper.generatePodsGameStep());
            console.info(`Yessss !`);
        } else {
            UIHelper.hapticImpact("error");
            setErrorCount(prevState => prevState + 1);
            setStep(GameHelper.generatePodsGameStep());
        }
    }

    return (
        <ScreenTemplate
            title={"Pods"}
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
                    Clic sur les pods rouges et évite les autres
                </ThemedText>

                <ThemedView
                    className={'w-full flex flex-row gap-2 justify-center items-center'}
                >
                    <ThemedView
                        className={"mt-4 w-fit flex flex-row gap-2 justify-center items-center"}
                        radiusStyle={"default"}
                        paddingStyle={"mini"}
                        fillStyle={'opacity-15'}
                    >
                        <ThemedText type={'miniExtraBold'}>
                            Meilleur score : {bestScore}
                        </ThemedText>
                    </ThemedView>
                    <ThemedView
                        className={"mt-4 w-fit flex flex-row gap-2 justify-center items-center"}
                        radiusStyle={"default"}
                        paddingStyle={"mini"}
                        fillStyle={'opacity-15'}
                    >
                        <ThemedText type={'miniExtraBold'}>
                            Score : {score}
                        </ThemedText>
                    </ThemedView>
                    <ThemedView
                        className={"mt-4 w-fit flex flex-row gap-2 justify-center items-center"}
                        radiusStyle={"default"}
                        paddingStyle={"mini"}
                        fillStyle={'opacity-15'}
                    >
                        <ThemedText type={'miniExtraBold'}>
                            Erreurs : {errorCount}
                        </ThemedText>
                    </ThemedView>
                </ThemedView>
            </ThemedView>

            <FlatList
                data={step}
                numColumns={2}
                keyExtractor={(item) => item.id}
                scrollEnabled={false}
                nestedScrollEnabled={false}
                contentContainerClassName={"justify-center items-center"}
                columnWrapperClassName="gap-10"
                ItemSeparatorComponent={() => (
                    <ThemedView paddingStyle={"default"}/>
                )}
                renderItem={({item}) => (
                    <ThemedButton
                        key={"pod-" + item.id}
                        title={"Pod"}
                        showTitle={false}
                        radiusStyle={"full"}
                        paddingStyle={"uniform-very-big"}
                        disabled={isGameOver()}
                        onPress={() => onPodTap(item)}
                        type={
                            item.color === PodColor.Blue ? 'blue' :
                                item.color === PodColor.Red ? 'danger' :
                                    item.color === PodColor.Orange ? 'warning' :
                                        item.color === PodColor.Green ? 'success' :
                                            'default'
                        }
                    />
                )}
            />

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