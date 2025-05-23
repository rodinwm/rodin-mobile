import {ThemedText} from '@/components/base/ThemedText';
import {ThemedView} from '@/components/base/ThemedView';
import React from "react";
import ThemedListTile from "@/components/base/ThemedListTile";
import {ThemedButton} from "@/components/base/ThemedButton";
import LucideIcon from "@/components/base/LucideIcon";
import {useRouter} from "expo-router";
import {AppNameTag} from "@/components/AppNameTag";
import ScreenTemplate from '@/components/layouts/ScreenTemplate';

export default function Page() {
    const router = useRouter();

    return (
        <ScreenTemplate
            title={"Profil"}
            takeBottomBarIntoAccount={true}
        >
            {/* Name */}
            <ThemedView className={'w-full flex flex-col'}>
                <ThemedText type={'default'}>Mon profil</ThemedText>
                <ThemedText type={'title'}>Alexandre TAHI</ThemedText>
            </ThemedView>

            {/* Ads */}
            <ThemedView
                borderStyle={"default"}
                fillStyle={"opacity-15"}
                radiusStyle={"default"}
                paddingStyle={"default"}
                className={'w-full flex flex-col items-center gap-3'}
            >
                <LucideIcon name={'Megaphone'} size={150}/>
                <ThemedText type={'subtitle'}>Publicités</ThemedText>
            </ThemedView>

            {/* Options */}
            <ThemedView className={'w-full flex flex-col gap-6'}>
                <ThemedListTile
                    icon={'User'}
                    title={'Infos personnelles'}
                    subtitle={'Biographie, ID, Statut, Photo de profil'}
                    onPress={() => router.push('/profile/personal-infos')}
                />
                <ThemedListTile
                    icon={'Star'}
                    title={'Abonnement'}
                    subtitle={'Gérer votre abonnement'}
                    onPress={() => router.push('/profile/subscription')}
                />
                <ThemedListTile
                    icon={"Lock"}
                    title={'Confidentialité'}
                    subtitle={'Données personnellles, Sécurité, Notifications, Autres services'}
                    onPress={() => router.push('/profile/privacy')}
                />
                <ThemedListTile
                    icon={'Eye'}
                    title={'Apparence'}
                    subtitle={'Thème clair, Thème sombre, Thème automatique'}
                    onPress={() => router.push('/profile/appearance')}
                />
                <ThemedListTile
                    icon={"MessageCircleQuestion"}
                    title={'Aide'}
                    subtitle={'Serivce client, Guide, Règles générales'}
                    onPress={() => router.push('/profile/help')}
                />
            </ThemedView>

            <ThemedButton
                title={"Déconnexion"}
                type={"no-fill"}
                icon={{name: 'LogOut'}}
                onPress={() => console.log("Déconnexion")}
            />

            {/* App name & Version */}
            <AppNameTag/>
        </ScreenTemplate>
    );
}

