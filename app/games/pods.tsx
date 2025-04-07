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

export default function Page() {
    const router = useRouter();
    const totalTime = 90; // 1m30s en secondes
    const eachStepTime = totalTime / 30; // totalTime réparti en étapes de 90/30 = 3 secondes
    const [step, setStep] = useState(GameHelper.getEmptyPodsGameStep());
    const [timeLeft, setTimeLeft] = useState(totalTime);
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
        if (!isRunning) return;

        const timer = setInterval(() => {
            setTimeLeft(prevTime => {
                const newTime = prevTime - 1;

                // Action toutes les 6 secondes (sauf au tout début ou à la fin)
                if ((0 < newTime && newTime < totalTime) && (newTime % eachStepTime === 0)) {
                    console.info("🎯 Action toutes les 3 secondes !");
                    setStep(GameHelper.generatePodsGameStep());
                }

                // Stopper quand on atteint 0
                if (newTime <= 0) {
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

    const onPodTap = (pod: Pod) => {
        console.info(`Pod ${pod.color} tapped!`);
    }

    return (
        <ScreenTemplate
            title={"Pods"}
            headerLeftBtn={"backBtn"}
            setHeightToScreenSize={true}
            scrollEnabled={false}
        >
            <ThemedView
                className={'w-full'}
            >
                <ThemedText type={'logo'} className={"text-center mt-4 "}>
                    {DateHelper.formatTime(timeLeft)}
                </ThemedText>

                <ThemedText type={'subtitle'} className={"text-center"}>
                    Clic rapidement sur les lumières rouges et évite les lumières bleues.
                </ThemedText>
            </ThemedView>

            <FlatList
                data={step}
                numColumns={2}
                keyExtractor={(item) => item.id}
                scrollEnabled={false}
                nestedScrollEnabled={false}
                contentContainerClassName={"jutify-center items-center"}
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
                        disabled={!isRunning && timeLeft === 0}
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
                title={"Start"}
                disabled={isRunning}
                onPress={startGame}
            />
        </ScreenTemplate>
    );
}