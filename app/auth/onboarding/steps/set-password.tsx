import {ThemedView} from '@/components/base/ThemedView';
import React from "react";
import {ThemedButton} from "@/components/base/ThemedButton";
import {ThemedTextInput} from "@/components/base/ThemedTextInput";
import OnboardingStepScreenTemplate from "@/components/layouts/OnboardingStepScreenTemplate";
import {OnboardingStepScreenProps} from "@/utils/interfaces";

export default function SetPassword(props: OnboardingStepScreenProps) {

    return (
        <OnboardingStepScreenTemplate
            title={'Créez un mot de passe'}
            subtitle={"Entrez votre mot de passe d’au moins 6 caractères. Il devra obligatoirement contenir au moins une lettre majuscule, au moins une lettre minuscule, au moins un chiffre et au moins une ponctuation."}
        >
            <ThemedView className={'w-full flex flex-col gap-3'}>
                <ThemedTextInput
                    label={"Mot de passe"}
                    textContentType={"password"}
                    keyboardType={"visible-password"}
                    placeholder={"Ex: ******"}
                />
                <ThemedButton
                    title={"Suivant"}
                    onPress={props.onNextPress}
                />
            </ThemedView>
        </OnboardingStepScreenTemplate>
    );
}

