import {OnboardingStepScreenTemplate, ThemedButton, ThemedTextInput, ThemedView} from '@/components';
import React from "react";
import {OnboardingStepScreenProps} from "@/utils/interfaces";

type Props = OnboardingStepScreenProps & {
    phoneNumber?: string;
    onChangePhoneNumber: (text: string) => void;
};

export function SetPhoneNumber(props: Props) {

    return (
        <OnboardingStepScreenTemplate
            title={'Quel est votre numéro de mobile ?'}
            subtitle={"Ce numéro vous permettra de vous connecter et de réinitialiser votre mot de passe."}
            addSpaceAtTheBottom={false}
        >
            <ThemedView className={'w-full flex flex-col gap-3'}>
                <ThemedTextInput
                    label={"Numéro de téléphone"}
                    textContentType={"telephoneNumber"}
                    keyboardType={"phone-pad"}
                    placeholder={"Ex: +330102030405"}
                    value={props.phoneNumber}
                    onChangeText={(phoneNumber) => props.onChangePhoneNumber(phoneNumber)}
                />
            </ThemedView>

            <ThemedView className={'w-full flex flex-col gap-3'}>
                <ThemedButton
                    title={"Suivant"}
                    onPress={props.onNextPress}
                    disabled={props.phoneNumber === ""}
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

