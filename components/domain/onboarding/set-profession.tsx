import {OnboardingStepScreenTemplate, ThemedButton, ThemedTextInput, ThemedView} from '@/components';
import React, {useEffect, useState} from "react";
import {OnboardingStepScreenProps} from "@/utils/interfaces";
import {Profession} from '@rodinwm/rodin-models/frontend';
import {modelService} from "@/utils/constants";


const professions = modelService.getProfessions();

export function SetProfession(props: OnboardingStepScreenProps) {
    const [selectedProfession, setSelectedProfession] = useState<Profession | null>(null);
    const [customProfession, setCustomProfession] = useState("");
    const [showCustomProfessionInput, setShowCustomProfessionInput] = useState(false);

    useEffect(() => {
        if (selectedProfession === Profession.AUTRE) {
            setShowCustomProfessionInput(true);
        } else {
            setShowCustomProfessionInput(false);
        }
    }, [selectedProfession]);

    return (
        <OnboardingStepScreenTemplate
            title={"Quel est votre profession ?"}
            addSpaceAtTheBottom={false}
        >
            <ThemedView className={'w-full flex flex-col gap-3'}>
                {professions.map((profession) => (
                    <ThemedButton
                        key={profession}
                        title={profession}
                        type={profession === selectedProfession ? "default" : "outlined"}
                        onPress={() => setSelectedProfession(profession)}
                    />
                ))}

                {showCustomProfessionInput && (
                    <ThemedView className={'w-full flex flex-col gap-3'}>
                        <ThemedTextInput
                            placeholder={"Profession"}
                            value={customProfession}
                            onChangeText={(text) => {
                                setCustomProfession(text);
                            }}
                        />
                    </ThemedView>
                )}
            </ThemedView>

            <ThemedButton
                title={"Suivant"}
                disabled={(selectedProfession === null) || (selectedProfession === Profession.AUTRE && customProfession === "")}
                onPress={props.onNextPress}
            />
        </OnboardingStepScreenTemplate>
    );
}

