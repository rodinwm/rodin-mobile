import {ScreenTemplate, ThemedListTile, ThemedView} from '@/components';
import React from "react";
import {useNavigation, useRouter} from "expo-router";

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
                    icon={{name: 'User'}}
                    title={'Données personnelles'}
                    subtitle={'Exporter en format PDF, Télécharger le tableau de suivi'}
                    onPress={() => router.push('/profile/privacy/personal-data')}
                />
                <ThemedListTile
                    icon={{name: 'KeyRound'}}
                    title={'Sécurité'}
                    subtitle={"Code d'accès, Double authentification"}
                    onPress={() => router.push('/profile/privacy/security')}
                />
                <ThemedListTile
                    icon={{name: 'Bell'}}
                    title={'Notifications'}
                    subtitle={"Types de notifications, fréquence, intensité"}
                    onPress={() => router.push('/profile/privacy/notifications')}
                />
                <ThemedListTile
                    icon={{name: 'Wrench'}}
                    title={"Paramètres d'exercices"}
                    subtitle={"Temps de travail, fréquence de travail, configuration"}
                    onPress={() => router.push('/profile/privacy/exercises-settings')}
                />
                <ThemedListTile
                    icon={{name: 'Save'}}
                    title={"Autres services"}
                    subtitle={"Stockage, langues"}
                    onPress={() => router.push('/profile/privacy/other-services')}
                />
                <ThemedListTile
                    icon={{name: 'CircleEllipsis'}}
                    title={"Plus d'informations"}
                    subtitle={"Politique de confidentilité, conditions d'utilisation"}
                    onPress={() => router.push('/profile/privacy/more-infos')}
                />
            </ThemedView>
        </ScreenTemplate>
    );
}

