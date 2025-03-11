import {ThemedView} from '@/components/base/ThemedView';
import React, {useState} from "react";
import {ThemedButton} from "@/components/base/ThemedButton";
import OnboardingStepScreenTemplate from "@/components/layouts/OnboardingStepScreenTemplate";
import {OnboardingStepScreenProps} from "@/utils/interfaces";
import {Profession} from "@/utils/enums";

const professions = Object.values(Profession);

export default function SetProfession(props: OnboardingStepScreenProps) {
    const [selectedProfession, setSelectedProfession] = useState<Profession | null>(null);

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
            </ThemedView>

            <ThemedButton
                title={"Suivant"}
                disabled={selectedProfession === null}
                onPress={props.onNextPress}
            />
        </OnboardingStepScreenTemplate>
    );
}

