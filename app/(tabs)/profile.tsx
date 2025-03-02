import {ThemedText} from '@/components/base/ThemedText';
import {ThemedView} from '@/components/base/ThemedView';
import React from "react";
import {useBottomTabOverflow} from "@/components/base/TabBarBackground";
import {SafeAreaView, useSafeAreaInsets} from "react-native-safe-area-context";
import {ScrollView} from "react-native";
import ThemedListTile from "@/components/base/ThemedListTile";
import {ThemedButton} from "@/components/base/ThemedButton";
import LucideIcon from "@/components/base/LucideIcon";

export default function Page() {
    const insets = useSafeAreaInsets();
    const bottomOverflow = useBottomTabOverflow();


    return (
        <ThemedView className={"w-full h-screen"} fillStyle={"default"}>
            <ScrollView
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
            >
                <SafeAreaView
                    className={"w-full flex flex-col gap-14 p-6 pt-0"}
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
                        />
                        <ThemedListTile
                            icon={"Cookie"}
                            title={'Confidentialité'}
                            subtitle={'Données personnellles, Sécurité, Notifications, Autres services'}
                        />
                        <ThemedListTile
                            icon={'SunMoon'}
                            title={'Apparence'}
                            subtitle={'Thème clair, Thème sombre, Thème automatique'}
                        />
                        <ThemedListTile
                            icon={"LifeBuoy"}
                            title={'Aide'}
                            subtitle={'Serivce client'}
                        />
                    </ThemedView>

                    <ThemedButton
                        title={"Déconnexion"}
                        onPress={() => console.log("Déconnexion")}
                    />

                    {/* App name & Version */}
                    <ThemedView className={'w-full flex flex-col justify-center items-center'}>
                        <ThemedText type={'defaultSemiBold'}>Rodin</ThemedText>
                        <ThemedText type={'mini'} className={"opacity-50"}>Version 1.0.0</ThemedText>
                    </ThemedView>
                </SafeAreaView>
            </ScrollView>
        </ThemedView>
    );
}

