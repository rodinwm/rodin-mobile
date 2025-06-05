import {OnboardingStepScreenTemplate, ThemedButton, ThemedTextInput, ThemedView} from '@/components';
import React from "react";
import {OnboardingStepScreenProps} from "@/utils/interfaces";

export default function SetEmailAddress(props: OnboardingStepScreenProps) {

    return (
        <OnboardingStepScreenTemplate
            title={'Quel est votre adresse e-mail ?'}
            subtitle={"Cette adresse e-mail vous permettra de vous connecter et de réinitialiser votre mot de passe."}
            addSpaceAtTheBottom={false}
        >
            <ThemedView className={'w-full flex flex-col gap-3'}>
                <ThemedTextInput
                    label={"Email"}
                    textContentType={"emailAddress"}
                    keyboardType={"email-address"}
                    placeholder={"Ex: alexandretahi@gmail.com"}
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

