import {OnboardingStepScreenTemplate, ThemedButton, ThemedTextInput, ThemedView} from '@/components';
import React from "react";
import {OnboardingStepScreenProps} from "@/utils/interfaces";

export default function SetPhoneNumber(props: OnboardingStepScreenProps) {

    return (
        <OnboardingStepScreenTemplate
            title={'Quel est votre numéro de mobile ?'}
            subtitle={"Ce numéro vous permettra de vous connecter et de réinitialiser votre mot de passe."}
        >
            <ThemedView className={'w-full flex flex-col gap-3'}>
                <ThemedTextInput
                    label={"Numéro de téléphone"}
                    textContentType={"telephoneNumber"}
                    keyboardType={"phone-pad"}
                    placeholder={"Ex: +330102030405"}
                />
                <ThemedButton
                    title={"Suivant"}
                    onPress={props.onNextPress}
                />
            </ThemedView>
        </OnboardingStepScreenTemplate>
    );
}

