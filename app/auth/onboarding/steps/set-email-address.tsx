import {ThemedView} from '@/components/base/ThemedView';
import React from "react";
import {ThemedButton} from "@/components/base/ThemedButton";
import {ThemedTextInput} from "@/components/base/ThemedTextInput";
import OnboardingStepScreenTemplate from "@/components/layouts/OnboardingStepScreenTemplate";
import {OnboardingStepScreenProps} from "@/utils/interfaces";

export default function SetEmailAddress(props: OnboardingStepScreenProps) {

    return (
        <OnboardingStepScreenTemplate
            title={'Quel est votre adresse e-mail ?'}
            subtitle={"Cette adresse e-mail vous permettra de vous connecter et de réinitialiser votre mot de passe."}
        >
            <ThemedView className={'w-full flex flex-col gap-3'}>
                <ThemedTextInput
                    label={"Email"}
                    textContentType={"emailAddress"}
                    keyboardType={"email-address"}
                    placeholder={"Ex: alexandretahi@gmail.com"}
                />
                <ThemedButton
                    title={"Suivant"}
                    onPress={props.onNextPress}
                />
            </ThemedView>
        </OnboardingStepScreenTemplate>
    );
}

