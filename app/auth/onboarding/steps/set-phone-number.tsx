import {ThemedView} from '@/components/base/ThemedView';
import React from "react";
import {ThemedButton} from "@/components/base/ThemedButton";
import {ThemedTextInput} from "@/components/base/ThemedTextInput";
import OnboardingStepScreenTemplate from "@/components/layouts/OnboardingStepScreenTemplate";
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

