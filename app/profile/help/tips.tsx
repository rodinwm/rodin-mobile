import {ScreenTemplate, ThemedText, ThemedView} from '@/components';
import React from "react";

export default function Page() {

    return (
        <ScreenTemplate
            title={"Conseils et astuces"}
            headerLeftBtn={"backBtn"}
        >
            {/* Contents */}
            <ThemedView className={'w-full flex flex-col gap-3'}>
                <ThemedText type={"h1"}>
                    Adapte ton rythme
                </ThemedText>
                <ThemedText type={"default"}>
                    Choisis tes propres durées de travail et de pause selon tes objectifs et ton énergie.
                </ThemedText>
            </ThemedView>

            <ThemedView className={'w-full flex flex-col gap-3'}>
                <ThemedText type={"h1"}>
                    Lis attentivement
                </ThemedText>
                <ThemedText type={"default"}>
                    Avant chaque exercice, prends le temps de lire les consignes pour bien comprendre les
                    attentes.
                </ThemedText>
            </ThemedView>

            <ThemedView className={'w-full flex flex-col gap-3'}>
                <ThemedText type={"h1"}>
                    Reste concentré
                </ThemedText>
                <ThemedText type={"default"}>
                    Pendant les sessions, évite les distractions. Active le mode "Ne pas déranger" pour
                    maximiser ton focus.
                </ThemedText>
            </ThemedView>

            <ThemedView className={'w-full flex flex-col gap-3'}>
                <ThemedText type={"h1"}>
                    Respecte les pauses
                </ThemedText>
                <ThemedText type={"default"}>
                    Les pauses sont essentielles pour éviter la fatigue mentale. Profite-en pour bouger,
                    respirer ou te détendre.
                </ThemedText>
            </ThemedView>

            <ThemedView className={'w-full flex flex-col gap-3'}>
                <ThemedText type={"h1"}>
                    Consulte tes progrès
                </ThemedText>
                <ThemedText type={"default"}>
                    Vérifie régulièrement tes statistiques pour observer ton évolution et rester motivé.
                </ThemedText>
            </ThemedView>
        </ScreenTemplate>
    );
}

