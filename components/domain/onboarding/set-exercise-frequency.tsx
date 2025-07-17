import {OnboardingStepScreenTemplate, ThemedButton, ThemedView} from '@/components';
import React, {useState} from "react";
import {OnboardingStepScreenProps} from "@/utils/interfaces";
import {modelService} from "@/utils/constants";
import {ExerciseFrequency} from "@/utils/models/model.enums";

const frequencies = modelService.getEnumValues('ExerciseFrequency') as ExerciseFrequency[];

type Props = OnboardingStepScreenProps & {
    exerciseFrequency: ExerciseFrequency;
    onChangeExerciseFrequency: (frequency: ExerciseFrequency) => void;
}

export function SetExerciseFrequency(props: Props) {
    const [selectedFrequency, setSelectedFrequency] = useState<ExerciseFrequency>(ExerciseFrequency.ONE_PER_SESSION);

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
                        title={modelService.getEnumLabel('ExerciseFrequency', frequency)}
                        type={frequency === selectedFrequency ? "default" : "outlined"}
                        onPress={() => {
                            const newFrequency = ExerciseFrequency[frequency as keyof typeof ExerciseFrequency];
                            setSelectedFrequency(newFrequency);
                            props.onChangeExerciseFrequency(newFrequency);
                        }}
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

