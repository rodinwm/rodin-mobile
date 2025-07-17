import {OnboardingStepScreenTemplate, ThemedButton, ThemedTextInput, ThemedView} from '@/components';
import React, {useEffect, useState} from "react";
import {OnboardingStepScreenProps} from "@/utils/interfaces";
import {Profession} from "@/utils/models/model.enums";
import {modelService} from "@/utils/constants";

const professions = modelService.getEnumValues('Profession') as Profession[];

type Props = OnboardingStepScreenProps & {
    profession: Profession;
    onChangeProfession: (profession: Profession, customProfession?: string) => void;
}

export function SetProfession(props: Props) {
    const [selectedProfession, setSelectedProfession] = useState<Profession>(Profession.ETUDIANT);
    const [customProfession, setCustomProfession] = useState<string | undefined>(undefined);
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
                        title={modelService.getEnumLabel('Profession', profession)}
                        type={profession === selectedProfession ? "default" : "outlined"}
                        onPress={() => {
                            const newProfession = Profession[profession as keyof typeof Profession];
                            setSelectedProfession(newProfession);
                            props.onChangeProfession(newProfession, newProfession === Profession.AUTRE ? customProfession : undefined);
                            setCustomProfession("");
                        }}
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

