import {ThemedView} from '@/components/base/ThemedView';
import React, {useEffect, useRef, useState} from "react";
import {useRouter} from "expo-router";
import ScreenTemplate from '@/components/layouts/ScreenTemplate';
import {ThemedButton} from "@/components/base/ThemedButton";
import {ThemedText} from "@/components/base/ThemedText";
import {DateHelper} from "@/utils/helpers/dateHelper";
import {FlatList} from "react-native";
import {GameHelper} from "@/utils/helpers/gameHelper";
import {ConcentrationExercise, PodColor} from "@/utils/enums";
import {Pod} from "@/utils/interfaces";
import {UIHelper} from "@/utils/helpers/uiHelper";

export default function Page() {
    const router = useRouter();
    // Game setup
    const [isRunning, setIsRunning] = useState(false);
    const [step, setStep] = useState(GameHelper.getEmptyPodsGameStep());
    // Timer setup
    const totalTime = 10; // 1m30s en secondes
    const stepTimerRef = useRef<NodeJS.Timeout | null>(null);
    const [timeLeft, setTimeLeft] = useState(totalTime);
    const [stepTimer, setStepTimer] = useState(1000); // Timer en millisecondes
    // Score & errors setup
    const [score, setScore] = useState(0);
    const [bestScore, setBestScore] = useState(0);
    const [errorCount, setErrorCount] = useState(0);

    // Chargement du meilleur score
    useEffect(() => {
        GameHelper.loadBestScore(ConcentrationExercise.Pods)
            .then((loadedBestScore: number) => setBestScore(loadedBestScore));
    }, []);

    // Gestion du temps global
    useEffect(() => {
        if (!isRunning) return;

        const timer = setInterval(() => {
            setTimeLeft(prevTime => {
                const newTime = prevTime - 1;
                if (newTime <= 0) {
                    if (score > bestScore) { // FIXME: The bestScore is not saved to AsyncStorage when the game is over
                        setBestScore(score);
                        GameHelper.saveBestScore(ConcentrationExercise.Pods, score).then();
                    }
                    setIsRunning(false);
                    clearInterval(timer);
                    return 0;
                }

                return newTime;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [isRunning]);

    const startStepTimer = () => {
        if (stepTimerRef.current) {
            clearTimeout(stepTimerRef.current);
        }
        stepTimerRef.current = setTimeout(generateNewPods, stepTimer);
    };

    const generateNewPods = () => {
        setStep(GameHelper.generatePodsGameStep());
        startStepTimer();
    };

    // Nouvel useEffect pour gérer le timer des pods
    useEffect(() => {
        if (!isRunning) return;

        // Démarrer le timer initial
        startStepTimer();

        return () => {
            if (stepTimerRef.current) {
                clearTimeout(stepTimerRef.current);
            }
        };
    }, [isRunning, stepTimer]);


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
        if (!isRunning) return;

        console.info(`Pod ${pod.color} tapped!`);
        if (pod.color === PodColor.Red) {
            UIHelper.hapticImpact();
            setScore(prevState => prevState + 1);
        } else {
            UIHelper.hapticImpact("error");
            setErrorCount(prevState => prevState + 1);
            setStep(GameHelper.generatePodsGameStep());
        }
        // Générer de nouveaux pods
        generateNewPods();
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