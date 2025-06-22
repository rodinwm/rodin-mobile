import {DefaultTimerSheet, ScreenTemplate, ThemedCheckbox, ThemedListTile, ThemedText, ThemedView} from '@/components';
import React, {useState} from "react";
import {useNavigation, useRouter} from "expo-router";
import {ConcentrationExercise} from "@rodinwm/rodin-models/frontend";

const exercises = Object.values(ConcentrationExercise);

export default function Page() {
    const router = useRouter();
    const navigation = useNavigation();
    const [defaultExercise, setDefaultExercise] = useState<ConcentrationExercise>(ConcentrationExercise.PODS);
    const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

    return (
        <ScreenTemplate
            title={"Paramètres d'exercices"}
            headerLeftBtn={"backBtn"}
            bottomSheet={(
                <DefaultTimerSheet
                    isOpen={isBottomSheetOpen}
                    onClose={() => setIsBottomSheetOpen(false)}
                />
            )}
        >
            <ThemedView className={'w-full flex flex-col gap-3'}>
                <ThemedText type={'h1'} className={"mb-6"}>Exercice par défaut</ThemedText>
                {exercises.map((exo, index: number) => (
                    <ThemedListTile
                        key={`exercise-${index}`}
                        title={exo}
                        onPress={() => setDefaultExercise(exo)}
                        suffixIcon={(
                            <ThemedCheckbox isChecked={exo === defaultExercise} disabled={true}/>
                        )}
                    />
                ))}
            </ThemedView>

            <ThemedView className={'w-full flex flex-col gap-3'}>
                <ThemedText type={'h1'} className={"mb-6"}>Autres</ThemedText>
                <ThemedListTile
                    title={'Session par défaut'}
                    onPress={() => setIsBottomSheetOpen(true)}
                />
                <ThemedListTile
                    title={'Phrase de motivation'}
                    onPress={() => router.push('/profile/privacy/exercises-settings/motivation-sentence')}
                />
                <ThemedListTile
                    title={"Code d'urgence"}
                    onPress={() => router.push('/profile/privacy/exercises-settings/urgency-code')}
                />
            </ThemedView>
        </ScreenTemplate>
    );
}

