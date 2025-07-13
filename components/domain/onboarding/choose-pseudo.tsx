import {OnboardingStepScreenTemplate, ThemedButton, ThemedTextInput, ThemedView} from '@/components';
import React from "react";
import {OnboardingStepScreenProps} from "@/utils/interfaces";

type Props = OnboardingStepScreenProps & {
    pseudo: string;
    onChangePseudo: (text: string) => void;
};

export function ChoosePseudo(props: Props) {

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
                    value={props.pseudo}
                    onChangeText={(pseudo) => props.onChangePseudo(pseudo)}
                />
            </ThemedView>

            <ThemedView className={'w-full flex flex-col gap-3'}>
                <ThemedButton
                    title={"Suivant"}
                    onPress={props.onNextPress}
                    disabled={props.pseudo === ""}
                />
            </ThemedView>
        </OnboardingStepScreenTemplate>
    );
}

