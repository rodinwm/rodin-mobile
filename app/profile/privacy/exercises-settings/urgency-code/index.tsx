import {ScreenTemplate, ThemedButton, ThemedText, ThemedTextInput, ThemedView} from '@/components';
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
            title={"Code d'urgence"}
            headerLeftBtn={"backBtn"}
        >
            <ThemedView className={'w-full flex flex-col gap-4'}>
                <ThemedText>
                    <ThemedText type={"defaultSemiBold"}>Rappel:</ThemedText> Le code d'urgence vous permet
                    de déverrouiller l'application lors de vos sessions de travail.
                </ThemedText>
                <ThemedText>
                    Pour le modifier, renseignez d'abord le code actuel, puis le nouveau code.
                </ThemedText>
            </ThemedView>

            <ThemedView className={'w-full flex flex-col gap-3'}>
                <ThemedTextInput
                    label={"Code actuel"}
                    textContentType={"password"}
                    placeholder={"Ex: ****"}
                />
                <ThemedTextInput
                    label={"Nouveau code"}
                    textContentType={"password"}
                    placeholder={"Ex: ****"}
                />
                <ThemedTextInput
                    label={"Confirmation du nouveau code"}
                    textContentType={"password"}
                    placeholder={"Ex: ****"}
                />
            </ThemedView>
            <ThemedButton
                title={"Enregistrer"}
            />
        </ScreenTemplate>
    );
}

