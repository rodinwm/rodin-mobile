import {ThemedView} from '@/components/base/ThemedView';
import React, {useState} from "react";
import {ThemedButton} from "@/components/base/ThemedButton";
import OnboardingStepScreenTemplate from "@/components/layouts/OnboardingStepScreenTemplate";
import {OnboardingStepScreenProps} from "@/utils/interfaces";
import LucideIcon from "@/components/base/LucideIcon";
import {ThemedText} from "@/components/base/ThemedText";
import {TimerSelect} from "@/components/TimerSelect";

export default function SetDefaultTimer(props: OnboardingStepScreenProps) {
    const [workTime, setWorkTime] = useState({hour: 0, minute: 0, second: 0});
    const [breakTime, setBreakTime] = useState({hour: 0, minute: 0, second: 0});


    return (
        <OnboardingStepScreenTemplate
            title={'Choisissez votre temps de travail et repos par défaut'}
            subtitle={"Modifiable facilement et rapidement dans les réglages."}
            addSpaceAtTheBottom={false}
        >
            <ThemedView className={'w-full flex flex-col gap-3'}>
                {/* Temps de travail */}
                <ThemedView className={'w-full flex flex-col gap-3'}>
                    <ThemedView className={'w-full flex flex-row items-center gap-3 opacity-60'}>
                        <LucideIcon name={'Brain'}/>
                        <ThemedText type={'defaultSemiBold'}>Temps de travail</ThemedText>
                    </ThemedView>

                    <TimerSelect onChange={(time) => setWorkTime(time)}/>
                </ThemedView>

                {/* Temps de repos */}
                <ThemedView className={'w-full flex flex-col gap-3'}>
                    <ThemedView className={'w-full flex flex-row items-center gap-3 opacity-60'}>
                        <LucideIcon name={'OctagonPause'}/>
                        <ThemedText type={'defaultSemiBold'}>Temps de repos</ThemedText>
                    </ThemedView>

                    <TimerSelect onChange={(time) => setBreakTime(time)}/>
                </ThemedView>
            </ThemedView>
            <ThemedView className={'w-full flex flex-col gap-3'}>
                <ThemedButton
                    title={"Suivant"}
                    onPress={props.onNextPress}
                />
                <ThemedButton
                    title={"Ignorer"}
                    type={"outlined"}
                    onPress={props.onSkip}
                />
            </ThemedView>
        </OnboardingStepScreenTemplate>
    );
}

