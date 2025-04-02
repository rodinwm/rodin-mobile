import {ThemedView} from '@/components/base/ThemedView';
import React from "react";
import {useNavigation, useRouter} from "expo-router";
import ThemedListTile from "@/components/base/ThemedListTile";
import ScreenTemplate from '@/components/layouts/ScreenTemplate';
import LucideIcon from "@/components/base/LucideIcon";
import {ThemedText} from "@/components/base/ThemedText";

export default function Page() {
    const router = useRouter();
    const navigation = useNavigation();


    return (
        <ScreenTemplate
            title={"Données personnelles"}
            headerLeftBtn={"backBtn"}
        >
            <ThemedText>
                <ThemedText type={"defaultSemiBold"}>Exportation des données:</ThemedText> Exporter mes progrès (fichier
                PDF ou tableau de suivi).
            </ThemedText>

            {/* Options */}
            <ThemedView className={'w-full flex flex-col gap-6'}>
                <ThemedListTile
                    title={'Fichier PDF'}
                    suffixIcon={(
                        <LucideIcon name={"Download"}/>
                    )}
                />
                <ThemedListTile
                    title={'Tableau de suivi'}
                    suffixIcon={(
                        <LucideIcon name={"Download"}/>
                    )}
                />
            </ThemedView>
        </ScreenTemplate>
    );
}

