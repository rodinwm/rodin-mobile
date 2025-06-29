import {OnboardingStepScreenTemplate, ThemedButton, ThemedTextInput, ThemedView} from '@/components';
import React from "react";
import {OnboardingStepScreenProps} from "@/utils/interfaces";

export function SetPassword(props: OnboardingStepScreenProps) {

    return (
        <OnboardingStepScreenTemplate
            title={'Créez un mot de passe'}
            subtitle={"Entrez votre mot de passe d’au moins 6 caractères. Il devra obligatoirement contenir au moins une lettre majuscule, au moins une lettre minuscule, au moins un chiffre et au moins une ponctuation."}
            addSpaceAtTheBottom={false}
        >
            <ThemedView className={'w-full flex flex-col gap-3'}>
                <ThemedTextInput
                    label={"Mot de passe"}
                    textContentType={"password"}
                    keyboardType={"visible-password"}
                    placeholder={"Ex: ******"}
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

