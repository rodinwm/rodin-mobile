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

const messages = {
    welcome: "Concentrez vous uniquement sur le point blanc pendant tout l'exercice",
    inspiration: "Inspirez lentement",
    expiration: "Expirez tout doucement",
    finish: "Parfait ! Vous êtes maitenant prêt pour votre session de travail",
};

export default function Page() {
    const router = useRouter();
    // Game setup
    const isRunningShared = useSharedValue(false);
    const [isRunning, setIsRunning] = useState(false);
    const [step, setStep] = useState(messages.welcome);
    // Timer setup
    const totalTime = 60; // 1m en secondes
    const [timeLeft, setTimeLeft] = useState(totalTime);
    // Animations
    const scale = useSharedValue(1);
    const animatedCircleStyle = useAnimatedStyle(() => {
        return {
            transform: [{scale: scale.value}],
        };
    });
    const textOpacity = useSharedValue(1);
    const animatedTextStyle = useAnimatedStyle(() => ({
        opacity: textOpacity.value,
    }));


    // Gestion du temps global
    useEffect(() => {
        if (!isRunning) return;

        const timer = setInterval(() => {
            setTimeLeft(prevTime => {
                const newTime = prevTime - 1;
                if (newTime <= 0) {
                    setIsRunning(false);
                    isRunningShared.value = false;
                    clearInterval(timer);
                    cancelAnimation(scale);
                    toggleStepAnimation(messages.finish);
                    return 0;
                }

                return newTime;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [isRunning]);

    const startGame = () => {
        setIsRunning(true);
        isRunningShared.value = true;

        toggleStepAnimation(messages.inspiration);
        scale.value = withRepeat(
            withTiming(4, {duration: 5000}, () => {
                if (isRunningShared.value) {
                    runOnJS(toggleStepAnimation)();
                }
            }),
            -1,
            true
        );
    }

    const toggleStep = (newStep?: string) => {
        UIHelper.hapticImpact('feedback');
        if (newStep) {
            setStep(newStep);
        } else {
            setStep(current => current === messages.inspiration ? messages.expiration : messages.inspiration);
        }
    };

    const toggleStepAnimation = (newStep?: string) => {
        textOpacity.value = withTiming(0, {duration: 300}, () => {
            runOnJS(toggleStep)(newStep);
            textOpacity.value = withTiming(1, {duration: 300});
        });
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

                <Animated.View style={animatedTextStyle}>
                    <ThemedText type={'subtitle'} className={"text-center"}>
                        {step}
                    </ThemedText>
                </Animated.View>
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
                    }, animatedCircleStyle]}
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