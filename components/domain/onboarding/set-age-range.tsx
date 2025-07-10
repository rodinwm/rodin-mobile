import {OnboardingStepScreenTemplate, ThemedButton, ThemedView} from '@/components';
import React, {useState} from "react";
import {OnboardingStepScreenProps} from "@/utils/interfaces";
import {AgeRange} from "@rodinwm/rodin-models/frontend";
import {modelService} from "@/utils/constants";

const ageRanges = modelService.getAgeRanges();

export function SetAgeRange(props: OnboardingStepScreenProps) {
    const [selectedAgeRange, setSelectedAgeRange] = useState<AgeRange | null>(null);

    return (
        <OnboardingStepScreenTemplate
            title={"Quel age avez-vous ?"}
            subtitle={"Choisissez la tranche d'age qui vous correspond parmi celles listées ci-dessous."}
            addSpaceAtTheBottom={false}
        >
            <ThemedView className={'w-full flex flex-col gap-3'}>
                {ageRanges.map((ageRange) => (
                    <ThemedButton
                        key={ageRange}
                        title={ageRange}
                        type={ageRange === selectedAgeRange ? "default" : "outlined"}
                        onPress={() => setSelectedAgeRange(ageRange)}
                    />
                ))}
            </ThemedView>

            <ThemedButton
                title={"Suivant"}
                disabled={selectedAgeRange === null}
                onPress={props.onNextPress}
            />
        </OnboardingStepScreenTemplate>
    );
}

