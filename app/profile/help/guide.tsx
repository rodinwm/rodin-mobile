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
            title={"Guide d'utilisation"}
            headerLeftBtn={"backBtn"}
        >

            {/* Contents */}
            <ThemedView className={'w-full flex flex-col gap-3'}>
                <ThemedText type={"h1"}>
                    C’est quoi Rodin ?
                </ThemedText>
                <ThemedText type={"default"}>
                    Une application pour améliorer ta concentration et optimiser ton temps de travail grâce à
                    des exercices de respiration, des exercices cognitifs, et des outils pour gérer ton temps de
                    travail et repos.
                </ThemedText>
            </ThemedView>

            <ThemedView className={'w-full flex flex-col gap-3'}>
                <ThemedText type={"h1"}>
                    Comment ça marche ?
                </ThemedText>
                {
                    [
                        'Choisis un de nos 3 exercices',
                        'Prépare-toi avec un des exercice choisis',
                        'Révise grâce à l’application',
                        'Consulte tes progrès et récompenses',
                    ].map((step, index) => (
                        <ThemedText
                            key={"how-its-work-" + index}
                        >
                            {index + 1}. {step}
                        </ThemedText>
                    ))
                }
            </ThemedView>

            <ThemedView className={'w-full flex flex-col gap-3'}>
                <ThemedText type={"h1"}>
                    Pourquoi Rodin ?
                </ThemedText>
                <ThemedText type={"default"}>
                    Pour booster ton focus, gérer ton énergie, et progresser chaque jour.
                </ThemedText>
                <ThemedText type={"default"}>
                    Rappelle-toi : chaque exercice est conçu pour améliorer ta concentration.
                </ThemedText>
            </ThemedView>
        </ScreenTemplate>
    );
}

