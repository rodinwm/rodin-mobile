import {
    LucideIcon,
    OnboardingStepScreenTemplate,
    ThemedButton,
    ThemedText,
    ThemedView,
    TimerSelect
} from '@/components';
import React, {useState} from "react";
import {OnboardingStepScreenProps} from "@/utils/interfaces";
import {TimerValue} from "@rodinwm/rodin-models/frontend";

export function SetDefaultTimer(props: OnboardingStepScreenProps) {
    const [workTime, setWorkTime] = useState<TimerValue>({hours: 0, minutes: 45, seconds: 0});
    const [breakTime, setBreakTime] = useState<TimerValue>({hours: 0, minutes: 10, seconds: 0});


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

                    <TimerSelect
                        initialValue={workTime}
                        onChange={(time) => setWorkTime(time)}
                    />
                </ThemedView>

                {/* Temps de repos */}
                <ThemedView className={'w-full flex flex-col gap-3'}>
                    <ThemedView className={'w-full flex flex-row items-center gap-3 opacity-60'}>
                        <LucideIcon name={'OctagonPause'}/>
                        <ThemedText type={'defaultSemiBold'}>Temps de repos</ThemedText>
                    </ThemedView>

                    <TimerSelect
                        initialValue={breakTime}
                        onChange={(time) => setBreakTime(time)}
                    />
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

