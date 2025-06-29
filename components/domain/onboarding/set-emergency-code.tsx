import {OnboardingStepScreenTemplate, ThemedButton, ThemedTextInput, ThemedView} from '@/components';
import React from "react";
import {OnboardingStepScreenProps} from "@/utils/interfaces";

export function SetEmergencyCode(props: OnboardingStepScreenProps) {

    return (
        <OnboardingStepScreenTemplate
            title={"Code d'urgence"}
            subtitle={"Choisissez un code à 4 chiffres pour déverrouiller votre téléphone en cas d’urgence pendant une session."}
            addSpaceAtTheBottom={false}
        >
            <ThemedView className={'w-full flex flex-col gap-3'}>
                <ThemedTextInput
                    label={"Code"}
                    textContentType={"password"}
                    keyboardType={"number-pad"}
                    placeholder={"Ex: ****"}
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

