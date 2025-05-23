import {OnboardingStepScreenTemplate, ThemedButton, ThemedTextInput, ThemedView} from '@/components';
import React from "react";
import {OnboardingStepScreenProps} from "@/utils/interfaces";

export default function ChoosePseudo(props: OnboardingStepScreenProps) {

    return (
        <OnboardingStepScreenTemplate
            title={'Choisissez un pseudo'}
            subtitle={"Attention vous ne pourrez changer de pseudo qu'une seule fois."}
        >
            <ThemedView className={'w-full flex flex-col gap-3'}>
                <ThemedTextInput
                    label={"Pseudo"}
                    placeholder={"Ex: mvxence"}
                />
                <ThemedButton
                    title={"Suivant"}
                    onPress={props.onNextPress}
                />
            </ThemedView>
        </OnboardingStepScreenTemplate>
    );
}

