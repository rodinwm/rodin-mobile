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
                            Conseils et astuces
                        </ThemedText>

                        <HeaderSpacer/>
                    </ThemedView>

                    {/* Contents */}
                    <ThemedView className={'w-full flex flex-col gap-3'}>
                        <ThemedText type={"title"}>
                            Adapte ton rythme
                        </ThemedText>
                        <ThemedText type={"default"}>
                            Choisis tes propres durées de travail et de pause selon tes objectifs et ton énergie.
                        </ThemedText>
                    </ThemedView>

                    <ThemedView className={'w-full flex flex-col gap-3'}>
                        <ThemedText type={"title"}>
                            Lis attentivement
                        </ThemedText>
                        <ThemedText type={"default"}>
                            Avant chaque exercice, prends le temps de lire les consignes pour bien comprendre les
                            attentes.
                        </ThemedText>
                    </ThemedView>

                    <ThemedView className={'w-full flex flex-col gap-3'}>
                        <ThemedText type={"title"}>
                            Reste concentré
                        </ThemedText>
                        <ThemedText type={"default"}>
                            Pendant les sessions, évite les distractions. Active le mode "Ne pas déranger" pour
                            maximiser ton focus.
                        </ThemedText>
                    </ThemedView>

                    <ThemedView className={'w-full flex flex-col gap-3'}>
                        <ThemedText type={"title"}>
                            Respecte les pauses
                        </ThemedText>
                        <ThemedText type={"default"}>
                            Les pauses sont essentielles pour éviter la fatigue mentale. Profite-en pour bouger,
                            respirer ou te détendre.
                        </ThemedText>
                    </ThemedView>

                    <ThemedView className={'w-full flex flex-col gap-3'}>
                        <ThemedText type={"title"}>
                            Consulte tes progrès
                        </ThemedText>
                        <ThemedText type={"default"}>
                            Vérifie régulièrement tes statistiques pour observer ton évolution et rester motivé.
                        </ThemedText>
                    </ThemedView>
                </SafeAreaView>
            </ScrollView>
        </ThemedView>
    );
}

