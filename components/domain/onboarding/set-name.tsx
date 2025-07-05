import {OnboardingStepScreenTemplate, ThemedButton, ThemedTextInput, ThemedView} from '@/components';
import React from "react";
import {OnboardingStepScreenProps} from "@/utils/interfaces";

export function SetName(props: OnboardingStepScreenProps) {

    return (
        <OnboardingStepScreenTemplate
            title={"C'est quoi ton nom ?"}
            subtitle={"Il faut bien qu'on commence quelque part."}
            addSpaceAtTheBottom={false}
        >
            <ThemedView className={'w-full flex flex-col gap-3'}>
                <ThemedTextInput
                    label={"Prénom"}
                    placeholder={"Ex: William"}
                />
                <ThemedTextInput
                    label={"Nom"}
                    placeholder={"Ex: SIBI"}
                />
            </ThemedView>

            <ThemedView className={'w-full flex flex-col gap-3'}>
                <ThemedButton
                    title={"Suivant"}
                    onPress={props.onNextPress}
                />
            </ThemedView>
        </OnboardingStepScreenTemplate>
    );
}

