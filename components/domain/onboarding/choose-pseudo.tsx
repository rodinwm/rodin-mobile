import {OnboardingStepScreenTemplate, ThemedButton, ThemedTextInput, ThemedView} from '@/components';
import React from "react";
import {OnboardingStepScreenProps} from "@/utils/interfaces";

export function ChoosePseudo(props: OnboardingStepScreenProps) {

    return (
        <OnboardingStepScreenTemplate
            title={'Choisissez un pseudo'}
            subtitle={"Attention vous ne pourrez changer de pseudo qu'une seule fois."}
            addSpaceAtTheBottom={false}
        >
            <ThemedView className={'w-full flex flex-col gap-3'}>
                <ThemedTextInput
                    label={"Pseudo"}
                    placeholder={"Ex: mvxence"}
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

