import {ScreenTemplate, ThemedButton, ThemedText, ThemedView} from '@/components';
import React, {useEffect, useState} from "react";
import {useRouter} from "expo-router";
import {DateHelper} from "@/utils/helpers/dateHelper";
import {UIHelper} from "@/utils/helpers/UIHelper";
import Animated, {
    cancelAnimation,
    runOnJS,
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withTiming,
} from 'react-native-reanimated';


export default function Page() {
    const router = useRouter();
    // Game setup
    const [isRunning, setIsRunning] = useState(false);
    const [step, setStep] = useState<string>("Inspiration");
    // Timer setup
    const totalTime = 120; // 2m en secondes
    const [timeLeft, setTimeLeft] = useState(totalTime);
    // Animation
    const scale = useSharedValue(1);
    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{scale: scale.value}],
        };
    });


    // Gestion du temps global
    useEffect(() => {
        if (!isRunning) return;

        const timer = setInterval(() => {
            setTimeLeft(prevTime => {
                const newTime = prevTime - 1;
                if (newTime <= 0) {
                    setIsRunning(false);
                    clearInterval(timer);
                    cancelAnimation(scale);
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
        scale.value = withRepeat(
            withTiming(4, {duration: 5000}, () => {
                runOnJS(toggleStep)();
            }), // Change toutes les 5 secondes
            -1,
            true // reverse
        );
    }

    const toggleStep = () => {
        setStep(prev => prev === 'Inspiration' ? 'Expiration' : 'Inspiration');
        UIHelper.hapticImpact('feedback'); // optionnel
    };

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
                    {isGameStarted() ? step : 'Prenez quelques secondes pour souffler un peu'}
                </ThemedText>
            </ThemedView>

            {/* Container */}
            <ThemedView
                className={'flex-1 flex justify-center items-center'}
                paddingStyle={'small'}
                radiusStyle={"default"}
            >
                {/* Breathing circles

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
                </ThemedView>*/}

                <Animated.View
                    style={[{
                        width: 50, // 48 * 4 (tailwind rem units)
                        aspectRatio: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 9999,
                    }, animatedStyle]}
                    className={'bg-foreground-light/10 dark:bg-foreground-dark/10 border border-foreground-light/20 dark:border-foreground-dark/20'}
                />
                {/* Petit cercle blanc au centre */}
                <ThemedView
                    className={'absolute flex justify-center items-center'}
                    fillStyle={'inversed'}
                    radiusStyle={'full'}
                    paddingStyle={"default"}
                />
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