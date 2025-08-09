import {OnboardingStepScreenTemplate, ThemedButton, ThemedTextInput, ThemedView} from '@/components';
import React from "react";
import {OnboardingStepScreenProps} from "@/utils/interfaces";

type Props = OnboardingStepScreenProps & {
    email: string;
    onChangeEmail: (text: string) => void;
};

export function SetEmailAddress(props: Props) {

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
                    placeholder={"Ex: johndoe@gmail.com"}
                    value={props.email}
                    onChangeText={(email) => props.onChangeEmail(email)}
                />
            </ThemedView>

            <ThemedView className={'w-full flex flex-col gap-3'}>
                <ThemedButton
                    title={"Suivant"}
                    onPress={props.onNextPress}
                    disabled={props.email === ""}
                />
            </ThemedView>
        </OnboardingStepScreenTemplate>
    );
}

