import {
    LucideIcon,
    OnboardingStepScreenTemplate,
    ThemedButton,
    ThemedText,
    ThemedView,
    TimerSelect
} from '@/components';
import React from "react";
import {OnboardingStepScreenProps} from "@/utils/interfaces";
import {TimerValue} from "@rodinwm/rodin-models/frontend";

type Props = OnboardingStepScreenProps & {
    defaultWorkTime: TimerValue;
    defaultBreakTime: TimerValue;
    onChangeDefaultWorkTime: (value: TimerValue) => void;
    onChangeDefaultBreakTime: (value: TimerValue) => void;
};

export function SetDefaultTimer(props: Props) {
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
                        initialValue={props.defaultWorkTime}
                        onChange={props.onChangeDefaultWorkTime}
                    />
                </ThemedView>

                {/* Temps de repos */}
                <ThemedView className={'w-full flex flex-col gap-3'}>
                    <ThemedView className={'w-full flex flex-row items-center gap-3 opacity-60'}>
                        <LucideIcon name={'OctagonPause'}/>
                        <ThemedText type={'defaultSemiBold'}>Temps de repos</ThemedText>
                    </ThemedView>

                    <TimerSelect
                        initialValue={props.defaultBreakTime}
                        onChange={props.onChangeDefaultBreakTime}
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

