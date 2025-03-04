import {ThemedText} from '@/components/base/ThemedText';
import {ThemedView} from '@/components/base/ThemedView';
import React from "react";
import {useNavigation, useRouter} from "expo-router";
import ScreenTemplate from "@/components/layouts/ScreenTemplate";

export default function Page() {
    const router = useRouter();
    const navigation = useNavigation();


    return (
        <ScreenTemplate
            title={"F.A.Q"}
            headerLeftBtn={"backBtn"}
        >
            {/* Contents */}
            <ThemedView className={'w-full flex flex-col gap-3'}>
                <ThemedText type={"h1"}>
                    Comment démarrer ?
                </ThemedText>
                <ThemedText type={"default"}>
                    Définis ton propre rythme : choisis la durée de ton temps de travail et celle de ta pause.
                </ThemedText>
                <ThemedText type={"default"}>
                    Prépare-toi avec un exercice de respiration guidée ou passe directement aux sessions.
                </ThemedText>
            </ThemedView>

            <ThemedView className={'w-full flex flex-col gap-3'}>
                <ThemedText type={"h1"}>
                    Exercices et jeux
                </ThemedText>
                <ThemedText type={"default"}>
                    Lis les instructions affichées avant chaque exercice. Concentre-toi et suis les consignes
                    pour progresser.
                </ThemedText>
            </ThemedView>

            <ThemedView className={'w-full flex flex-col gap-3'}>
                <ThemedText type={"h1"}>
                    Suivi et progression
                </ThemedText>
                <ThemedText type={"default"}>
                    Consulte tes <ThemedText type={"defaultSemiBold"}>statistiques
                    personnelles</ThemedText> pour suivre tes progrès et voir l’impact de tes
                    sessions.
                </ThemedText>
            </ThemedView>

            <ThemedView className={'w-full flex flex-col gap-3'}>
                <ThemedText type={"h1"}>
                    Un problème ?
                </ThemedText>
                <ThemedText type={"default"}>
                    Tu peux nous contacter via l’option <ThemedText
                    type={"defaultSemiBold"}>Feedback</ThemedText> dans les paramètres ou consulter notre FAQ.
                </ThemedText>
            </ThemedView>
        </ScreenTemplate>
    );
}

