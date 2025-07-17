import {OnboardingStepScreenTemplate, ThemedButton, ThemedTextInput, ThemedView} from '@/components';
import React from "react";
import {OnboardingStepScreenProps} from "@/utils/interfaces";
import {ToastService} from "@/utils/services/toastService";
import {ToastType} from "@/utils/enums";


type Props = OnboardingStepScreenProps & {
    emergencyCode: string;
    emergencyCodeConfirmation: string;
    onChangeEmergencyCode: (text: string) => void;
    onChangeEmergencyCodeConfirmation: (text: string) => void;
};

export function SetEmergencyCode(props: Props) {

    return (
        <OnboardingStepScreenTemplate
            title={"Code d'urgence"}
            subtitle={"Choisissez un code à 4 chiffres pour déverrouiller votre téléphone en cas d’urgence pendant une session."}
            addSpaceAtTheBottom={false}
        >
            <ThemedView className={'w-full flex flex-col gap-3'}>
                <ThemedTextInput
                    label={"Code"}
                    textContentType={"password"}
                    keyboardType={"number-pad"}
                    placeholder={"Ex: ****"}
                    secureTextEntry={true}
                    value={props.emergencyCode}
                    onChangeText={(emergencyCode) => props.onChangeEmergencyCode(emergencyCode)}
                />
                <ThemedTextInput
                    label={"Confirmation du code"}
                    textContentType={"password"}
                    keyboardType={"number-pad"}
                    placeholder={"Ex: ****"}
                    secureTextEntry={true}
                    value={props.emergencyCodeConfirmation}
                    onChangeText={(emergencyCodeConfirmation) => props.onChangeEmergencyCodeConfirmation(emergencyCodeConfirmation)}
                />
            </ThemedView>

            <ThemedView className={'w-full flex flex-col gap-3'}>
                <ThemedButton
                    title={"Suivant"}
                    onPress={() => {
                        if (props.emergencyCode !== props.emergencyCodeConfirmation) {
                            ToastService.show({
                                type: ToastType.Error,
                                message: "Les codes ne correspondent pas. Veuillez réessayer."
                            });
                            return;
                        }
                        props.onNextPress();
                    }}
                    disabled={props.emergencyCode === "" || props.emergencyCodeConfirmation === ""}
                />
            </ThemedView>
        </OnboardingStepScreenTemplate>
    );
}

