import {ThemedView} from '@/components/base/ThemedView';
import React from "react";
import {useNavigation, useRouter} from "expo-router";
import ThemedListTile from "@/components/base/ThemedListTile";
import ScreenTemplate from '@/components/layouts/ScreenTemplate';

export default function Page() {
    const router = useRouter();
    const navigation = useNavigation();


    return (
        <ScreenTemplate
            title={"Confidentialité"}
            headerLeftBtn={"backBtn"}
        >
            {/* Options */}
            <ThemedView className={'w-full flex flex-col gap-6'}>
                <ThemedListTile
                    icon={'User'}
                    title={'Données personnelles'}
                    subtitle={'Exporter en format PDF, Télécharger le tableau de suivi'}
                    onPress={() => router.push('/profile/privacy/personal-data')}
                />
                <ThemedListTile
                    icon={'KeyRound'}
                    title={'Sécurité'}
                    subtitle={"Code d'accès, Double authentification"}
                    onPress={() => router.push('/profile/personal-data')}
                />
                <ThemedListTile
                    icon={'Bell'}
                    title={'Notifications'}
                    subtitle={"Types de notifications, fréquence, intensité"}
                    onPress={() => router.push('/profile/personal-data')}
                />
                <ThemedListTile
                    icon={'Wrench'}
                    title={"Paramètres d'exercices"}
                    subtitle={"Temps de travail, fréquence de travail, configuration"}
                    onPress={() => router.push('/profile/personal-data')}
                />
                <ThemedListTile
                    icon={'Save'}
                    title={"Autres services"}
                    subtitle={"Stockage, langues"}
                    onPress={() => router.push('/profile/personal-data')}
                />
                <ThemedListTile
                    icon={'CircleEllipsis'}
                    title={"Plus d'informations"}
                    subtitle={"Politique de confidentilité, conditions d'utilisation"}
                    onPress={() => router.push('/profile/personal-data')}
                />
            </ThemedView>
        </ScreenTemplate>
    );
}

