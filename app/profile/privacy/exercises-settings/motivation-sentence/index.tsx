import {
    ScreenTemplate,
    ThemedButton,
    ThemedCheckbox,
    ThemedListTile,
    ThemedText,
    ThemedTextInput,
    ThemedView
} from '@/components';
import React, {useEffect, useState} from "react";
import {useRouter} from "expo-router";
import {motivationSentences} from "@/assets/static/motivation-sentences";

export default function Page() {
    const router = useRouter();
    const [selectedSentence, setSelectedSentence] = useState(motivationSentences[0]);
    const [customSentence, setCustomSentence] = useState("");
    const [showCustomSentenceInput, setShowCustomSentenceInput] = useState(false);

    useEffect(() => {
        if (selectedSentence.id === 0) {
            setShowCustomSentenceInput(true);
        } else {
            setShowCustomSentenceInput(false);
        }
    }, [selectedSentence]);

    return (
        <ScreenTemplate
            title={"Phrase de motivation"}
            headerLeftBtn={"backBtn"}
        >
            <ThemedView className={'w-full flex flex-col gap-3'}>
                <ThemedText className={"mb-6"}>
                    Choisit la phrase qui te mettra au travail parmis celles ci-dessous.
                </ThemedText>
                {motivationSentences.map((sentence, index: number) => (
                    <ThemedListTile
                        key={`sentence-${index}`}
                        title={sentence.sentence}
                        onPress={() => setSelectedSentence(sentence)}
                        icon={sentence.id === 0 ? {name: "Star"} : undefined} // Pour les fonctionnalités payantes
                        suffixIcon={(
                            <ThemedCheckbox isChecked={sentence === selectedSentence} disabled={true}/>
                        )}
                    />
                ))}
            </ThemedView>

            {showCustomSentenceInput && (
                <ThemedView className={'w-full flex flex-col gap-3'}>
                    <ThemedText className={"mb-6"}>
                        Pour personnaliser la phrase de motivation, rentre la dans le champ ci-dessous.
                    </ThemedText>

                    <ThemedTextInput
                        placeholder={"Phrase de motivation"}
                        value={customSentence}
                        onChangeText={(text) => {
                            setCustomSentence(text);
                        }}
                    />
                    <ThemedButton
                        title={"Enregistrer"}
                        disabled={customSentence === ""}
                    />
                </ThemedView>
            )}
        </ScreenTemplate>
    );
}

