import {OnboardingStepScreenTemplate, ThemedButton, ThemedTextInput, ThemedView} from '@/components';
import React from "react";
import {OnboardingStepScreenProps} from "@/utils/interfaces";

type Props = OnboardingStepScreenProps & {
    password: string;
    passwordConfirmation: string;
    onChangePassword: (text: string) => void;
    onChangePasswordConfirmation: (text: string) => void;
}

export function SetPassword(props: Props) {

    return (
        <OnboardingStepScreenTemplate
            title={'Créez un mot de passe'}
            subtitle={"Entrez votre mot de passe d’au moins 6 caractères. Il devra obligatoirement contenir au moins une lettre majuscule, au moins une lettre minuscule, au moins un chiffre et au moins une ponctuation."}
            addSpaceAtTheBottom={false}
        >
            <ThemedView className={'w-full flex flex-col gap-3'}>
                <ThemedTextInput
                    label={"Mot de passe"}
                    textContentType={"password"}
                    keyboardType={"visible-password"}
                    placeholder={"Ex: ******"}
                    secureTextEntry={true}
                    value={props.password}
                    onChangeText={(password) => props.onChangePassword(password)}
                />
                <ThemedTextInput
                    label={"Confirmation du mot de passe"}
                    textContentType={"password"}
                    keyboardType={"visible-password"}
                    placeholder={"Ex: ******"}
                    secureTextEntry={true}
                    value={props.passwordConfirmation}
                    onChangeText={(passwordConfirmation) => props.onChangePasswordConfirmation(passwordConfirmation)}
                />
            </ThemedView>

            <ThemedView className={'w-full flex flex-col gap-3'}>
                <ThemedButton
                    title={"Suivant"}
                    onPress={() => {
                        if (props.password !== props.passwordConfirmation) {
                            alert("Les mots de passe ne correspondent pas. Veuillez réessayer.");
                            return;
                        }
                        props.onNextPress();
                    }}
                    disabled={props.password === "" || props.passwordConfirmation === ""}
                />
            </ThemedView>
        </OnboardingStepScreenTemplate>
    );
}

