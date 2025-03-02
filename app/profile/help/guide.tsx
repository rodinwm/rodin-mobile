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
                    className={"w-full h-screen flex flex-col gap-14 p-6 pt-0"}
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
                            Guide d'utilisation
                        </ThemedText>

                        <HeaderSpacer/>
                    </ThemedView>

                    {/* Contents */}
                    <ThemedView className={'w-full flex flex-col gap-3'}>
                        <ThemedText type={"title"}>
                            C’est quoi Rodin ?
                        </ThemedText>
                        <ThemedText type={"default"}>
                            Une application pour améliorer ta concentration et optimiser ton temps de travail grâce à
                            des exercices de respiration, des exercices cognitifs, et des outils pour gérer ton temps de
                            travail et repos.
                        </ThemedText>
                    </ThemedView>

                    <ThemedView className={'w-full flex flex-col gap-3'}>
                        <ThemedText type={"title"}>
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
                        <ThemedText type={"title"}>
                            Pourquoi Rodin ?
                        </ThemedText>
                        <ThemedText type={"default"}>
                            Pour booster ton focus, gérer ton énergie, et progresser chaque jour.
                        </ThemedText>
                        <ThemedText type={"default"}>
                            Rappelle-toi : chaque exercice est conçu pour améliorer ta concentration.
                        </ThemedText>
                    </ThemedView>
                </SafeAreaView>
            </ScrollView>
        </ThemedView>
    );
}

