import {ThemedView} from '@/components/base/ThemedView';
import React from "react";
import {ThemedButton} from "@/components/base/ThemedButton";
import {ThemedTextInput} from "@/components/base/ThemedTextInput";
import OnboardingStepScreenTemplate from "@/components/layouts/OnboardingStepScreenTemplate";
import {OnboardingStepScreenProps} from "@/utils/interfaces";

export default function SetEmergencyCode(props: OnboardingStepScreenProps) {

    return (
        <OnboardingStepScreenTemplate
            title={"Code d'urgence"}
            subtitle={"Choisissez un code à 4 chiffres pour déverrouiller votre téléphone en cas d’urgence pendant une session."}
        >
            <ThemedView className={'w-full flex flex-col gap-3'}>
                <ThemedTextInput
                    label={"Code"}
                    textContentType={"password"}
                    keyboardType={"number-pad"}
                    placeholder={"Ex: ****"}
                />
                <ThemedButton
                    title={"Suivant"}
                    onPress={props.onNextPress}
                />
            </ThemedView>
        </OnboardingStepScreenTemplate>
    );
}

