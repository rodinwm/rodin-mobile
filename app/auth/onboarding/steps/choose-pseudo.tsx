import {ThemedView} from '@/components/base/ThemedView';
import React from "react";
import {ThemedButton} from "@/components/base/ThemedButton";
import {ThemedTextInput} from "@/components/base/ThemedTextInput";
import OnboardingStepScreenTemplate from "@/components/layouts/OnboardingStepScreenTemplate";

interface Props {
    onNextPress?: () => void;
}

export default function ChoosePseudo(props: Props) {

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

