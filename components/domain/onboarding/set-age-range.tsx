import {OnboardingStepScreenTemplate, ThemedButton, ThemedView} from '@/components';
import React, {useState} from "react";
import {OnboardingStepScreenProps} from "@/utils/interfaces";
import {AgeRange} from "@/utils/models/model.enums";
import {modelService} from "@/utils/constants";

const ageRanges = modelService.getEnumValues('AgeRange') as AgeRange[];

type Props = OnboardingStepScreenProps & {
    ageRange: AgeRange;
    onChangeAgeRange: (ageRange: AgeRange) => void;
}

export function SetAgeRange(props: Props) {
    const [selectedAgeRange, setSelectedAgeRange] = useState<AgeRange>(AgeRange.AGE_18_24);

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
                        title={modelService.getEnumLabel('AgeRange', ageRange)}
                        type={ageRange === selectedAgeRange ? "default" : "outlined"}
                        onPress={() => {
                            const newAgeRange = AgeRange[ageRange as keyof typeof AgeRange];
                            setSelectedAgeRange(newAgeRange);
                            props.onChangeAgeRange(newAgeRange);
                        }}
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

