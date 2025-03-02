import {ThemedText} from '@/components/base/ThemedText';
import {ThemedView} from '@/components/base/ThemedView';
import React from "react";
import {ThemedButton} from "@/components/base/ThemedButton";
import {SafeAreaView} from "react-native-safe-area-context";
import {useNavigation, useRouter} from "expo-router";
import {ScrollView} from 'react-native';
import {HeaderSpacer} from "@/components/HeaderSpacer";

export default function Page() {
    const router = useRouter();
    const navigation = useNavigation();


    return (
        <ThemedView className={"w-full h-screen"} fillStyle={"default"}>
            <ScrollView
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
            >
                <SafeAreaView
                    className={"w-full h-full flex flex-col gap-14 p-6 pt-0"}
                >
                    {/* Header */}
                    <ThemedView className={'w-full flex flex-row items-center justify-between'}>
                        <ThemedButton
                            title={"Back"}
                            icon={{name: 'ChevronLeft'}}
                            showTitle={false}
                            type={"outlined"}
                            onPress={() => navigation.goBack()}
                        />

                        <ThemedText type={'title'} className={'text-center'}>
                            F.A.Q
                        </ThemedText>

                        <HeaderSpacer/>
                    </ThemedView>

                    {/* Contents */}
                    <ThemedView className={'w-full flex flex-col gap-3'}>
                        <ThemedText type={"title"}>
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
                        <ThemedText type={"title"}>
                            Exercices et jeux
                        </ThemedText>
                        <ThemedText type={"default"}>
                            Lis les instructions affichées avant chaque exercice. Concentre-toi et suis les consignes
                            pour progresser.
                        </ThemedText>
                    </ThemedView>

                    <ThemedView className={'w-full flex flex-col gap-3'}>
                        <ThemedText type={"title"}>
                            Suivi et progression
                        </ThemedText>
                        <ThemedText type={"default"}>
                            Consulte tes <ThemedText type={"defaultSemiBold"}>statistiques
                            personnelles</ThemedText> pour suivre tes progrès et voir l’impact de tes
                            sessions.
                        </ThemedText>
                    </ThemedView>

                    <ThemedView className={'w-full flex flex-col gap-3'}>
                        <ThemedText type={"title"}>
                            Un problème ?
                        </ThemedText>
                        <ThemedText type={"default"}>
                            Tu peux nous contacter via l’option <ThemedText
                            type={"defaultSemiBold"}>Feedback</ThemedText> dans les paramètres ou consulter notre FAQ.
                        </ThemedText>
                    </ThemedView>
                </SafeAreaView>
            </ScrollView>
        </ThemedView>
    );
}

