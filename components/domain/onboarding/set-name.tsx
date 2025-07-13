import {OnboardingStepScreenTemplate, ThemedButton, ThemedTextInput, ThemedView} from '@/components';
import React from "react";
import {OnboardingStepScreenProps} from "@/utils/interfaces";

type Props = OnboardingStepScreenProps & {
    firstname: string;
    lastname: string;
    onChangeFirstName: (text: string) => void;
    onChangeLastName: (text: string) => void;
};

export function SetName(props: Props) {

    return (
        <OnboardingStepScreenTemplate
            title={"C'est quoi ton nom ?"}
            subtitle={"Il faut bien qu'on commence quelque part."}
            addSpaceAtTheBottom={false}
        >
            <ThemedView className={'w-full flex flex-col gap-3'}>
                <ThemedTextInput
                    label={"Prénom"}
                    placeholder={"Ex: William"}
                    value={props.firstname}
                    onChangeText={(firstname) => props.onChangeFirstName(firstname)}
                />
                <ThemedTextInput
                    label={"Nom"}
                    placeholder={"Ex: SIBI"}
                    value={props.lastname}
                    onChangeText={(lastname) => props.onChangeLastName(lastname)}
                />
            </ThemedView>

            <ThemedView className={'w-full flex flex-col gap-3'}>
                <ThemedButton
                    title={"Suivant"}
                    disabled={props.firstname === "" || props.lastname === ""}
                    onPress={props.onNextPress}
                />
            </ThemedView>
        </OnboardingStepScreenTemplate>
    );
}

