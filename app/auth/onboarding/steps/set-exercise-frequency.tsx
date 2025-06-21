import {OnboardingStepScreenTemplate, ThemedButton, ThemedView} from '@/components';
import React, {useState} from "react";
import {OnboardingStepScreenProps} from "@/utils/interfaces";
import {ExerciseFrequency} from "@rodinwm/rodin-models/frontend";

const frequencies = Object.values(ExerciseFrequency);

export default function SetExerciseFrequency(props: OnboardingStepScreenProps) {
    const [selectedFrequency, setSelectedFrequency] = useState<ExerciseFrequency | null>(null);

    return (
        <OnboardingStepScreenTemplate
            title={"Fréquence d'exercice"}
            subtitle={"Choisissez la fréquence à laquelle vous souhaitez réaliser l'exercice de concentration"}
            addSpaceAtTheBottom={false}
        >
            <ThemedView className={'w-full flex flex-col gap-3'}>
                {frequencies.map((frequency) => (
                    <ThemedButton
                        key={frequency}
                        title={frequency}
                        type={frequency === selectedFrequency ? "default" : "outlined"}
                        onPress={() => setSelectedFrequency(frequency)}
                    />
                ))}
            </ThemedView>

            <ThemedButton
                title={"Suivant"}
                disabled={selectedFrequency === null}
                onPress={props.onNextPress}
            />
        </OnboardingStepScreenTemplate>
    );
}

