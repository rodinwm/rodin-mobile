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

export default function Page() {
    const router = useRouter();
    const totalTime = 90; // 1m30s en secondes
    const eachStepTime = totalTime / 15; // 1m30s répartie en étapes de 90/15 = 6 secondes
    const [step, setStep] = useState(GameHelper.generatePodsGameStep());
    const [timeLeft, setTimeLeft] = useState(totalTime);
    const [isRunning, setIsRunning] = useState(false);

    let timer = setInterval(() => {
        if (isRunning) {
            const newTime = timeLeft - 1;
            setTimeLeft(newTime);
            if ((0 < newTime && newTime < totalTime) && (newTime % eachStepTime === 0)) {
                console.info("Action toutes les 6 secondes");
                setStep(GameHelper.generatePodsGameStep());
            }
        }
    }, 1000);

    useEffect(() => {
        if (timeLeft <= 0) {
            clearInterval(timer);
        }
        return () => clearInterval(timer);
    }, [isRunning, timeLeft]);

    const startGame = () => {
        setIsRunning(true);
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
                keyExtractor={(item, index) => index.toString()}
                scrollEnabled={false}
                nestedScrollEnabled={false}
                contentContainerClassName={"jutify-center items-center"}
                columnWrapperClassName="gap-10"
                ItemSeparatorComponent={() => (
                    <ThemedView paddingStyle={"default"}/>
                )}
                renderItem={({item, index}) => (
                    <ThemedButton
                        key={"pod-" + index}
                        title={"Pod"}
                        showTitle={false}
                        type={
                            item === PodColor.Blue ?
                                'blue' : item === PodColor.Red ?
                                    'danger' : 'default'
                        }
                        radiusStyle={"full"}
                        paddingStyle={"uniform-very-big"}
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