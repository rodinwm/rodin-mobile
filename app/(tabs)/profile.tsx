import {ThemedText} from '@/components/base/ThemedText';
import {ThemedView} from '@/components/base/ThemedView';
import React from "react";
import {useBottomTabOverflow} from "@/components/base/TabBarBackground";
import {SafeAreaView, useSafeAreaInsets} from "react-native-safe-area-context";
import {ScrollView} from "react-native";
import ThemedListTile from "@/components/base/ThemedListTile";
import {ThemedButton} from "@/components/base/ThemedButton";
import LucideIcon from "@/components/base/LucideIcon";
import {useRouter} from "expo-router";
import {AppNameTag} from "@/components/AppNameTag";

export default function Page() {
    const router = useRouter();
    const insets = useSafeAreaInsets();
    const bottomOverflow = useBottomTabOverflow();


    return (
        <ThemedView className={"w-full h-screen"} fillStyle={"default"}>
            <ScrollView
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
            >
                <SafeAreaView
                    className={"w-full h-full flex flex-col gap-14 p-6 pt-0"}
                    style={{paddingBottom: insets.bottom + bottomOverflow}}
                >
                    {/* Name */}
                    <ThemedView className={'w-full flex flex-col'}>
                        <ThemedText type={'default'}>Mon profil</ThemedText>
                        <ThemedText type={'title'}>Alexandre TAHI</ThemedText>
                    </ThemedView>

                    {/* Ads */}
                    <ThemedView
                        outlined={true}
                        fillStyle={"opacity-15"}
                        radiusStyle={"default"}
                        paddingStyle={"default"}
                        className={'w-full flex flex-col items-center gap-3'}
                    >
                        <LucideIcon name={'Megaphone'} size={150}/>
                        <ThemedText type={'subtitle'}>Publicités</ThemedText>
                    </ThemedView>

                    {/* Options */}
                    <ThemedView className={'w-full flex flex-col gap-2'}>
                        <ThemedListTile
                            icon={'User'}
                            title={'Infos personnelles'}
                            subtitle={'Biographie, ID, Statut, Photo de profil'}
                            onPress={() => router.push('/profile/personal-data')}
                        />
                        <ThemedListTile
                            icon={"Cookie"}
                            title={'Confidentialité'}
                            subtitle={'Données personnellles, Sécurité, Notifications, Autres services'}
                            onPress={() => router.push('/profile/privacy')}
                        />
                        <ThemedListTile
                            icon={'SunMoon'}
                            title={'Apparence'}
                            subtitle={'Thème clair, Thème sombre, Thème automatique'}
                            onPress={() => router.push('/profile/appearance')}
                        />
                        <ThemedListTile
                            icon={"LifeBuoy"}
                            title={'Aide'}
                            subtitle={'Serivce client, Guide, Règles générales'}
                            onPress={() => router.push('/profile/help')}
                        />
                    </ThemedView>

                    <ThemedButton
                        title={"Déconnexion"}
                        type={"danger"}
                        onPress={() => console.log("Déconnexion")}
                    />

                    {/* App name & Version */}
                    <AppNameTag/>
                </SafeAreaView>
            </ScrollView>
        </ThemedView>
    );
}

