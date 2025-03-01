import {ThemedText} from '@/components/base/ThemedText';
import {ThemedView} from '@/components/base/ThemedView';
import React from "react";
import {ThemedButton} from "@/components/base/ThemedButton";
import {useBottomTabOverflow} from "@/components/base/TabBarBackground";
import {SafeAreaView, useSafeAreaInsets} from "react-native-safe-area-context";
import LucideIcon from "@/components/base/LucideIcon";
import {dailyTips} from "@/assets/static/daily-tips";
import {useRouter} from "expo-router";

export default function Page() {
    const router = useRouter();
    const insets = useSafeAreaInsets();
    const bottomOverflow = useBottomTabOverflow();


    return (
        <ThemedView className={"w-full h-screen"} fillStyle={"default"}>
            <SafeAreaView
                className={"w-full h-screen flex flex-col justify-between gap-4 p-6 pt-0"}
                style={{paddingBottom: insets.bottom + bottomOverflow}}
            >
                {/* Header */}
                <ThemedView className={'w-full flex flex-row items-center justify-between'}>
                    <ThemedButton
                        title={"Test"}
                        icon={{name: 'Users'}}
                        showTitle={false}
                        filled={false}
                        onPress={() => console.log("Home")}
                    />

                    <ThemedText type={'title'}>Rodin</ThemedText>

                    <ThemedButton
                        title={"Test"}
                        icon={{name: 'User'}}
                        showTitle={false}
                        filled={false}
                        onPress={() => console.log("Profile")}
                    />
                </ThemedView>

                {/* Stats texts */}
                <ThemedView className={'w-full flex flex-col'}>
                    <ThemedText type={'default'}>Statistiques du jour</ThemedText>
                    <ThemedText type={'subtitle'}>4,5 heures travaillées - 7 sessions </ThemedText>
                </ThemedView>

                {/* Stats texts */}
                <ThemedView className={'w-full flex flex-col gap-3'}>
                    <ThemedView
                        fillStyle={"opacity-15"}
                        outlined={true}
                        radiusStyle={"default"}
                        paddingStyle={"default"}
                        className={'w-full flex flex-col items-center gap-3 bg-foreground-light/15 dark:bg-foreground-dark/15'}
                    >
                        <LucideIcon name={'ChartPie'} size={150}/>
                        <ThemedText type={'subtitle'}>Statistiques</ThemedText>
                    </ThemedView>

                    <ThemedButton
                        title={"Start"}
                        onPress={() => router.push('/timer')}
                    />
                </ThemedView>

                {/* Conseils */}
                <ThemedView
                    fillStyle={"opacity-15"}
                    outlined={true}
                    radiusStyle={"default"}
                    paddingStyle={"asymetric"}
                    className={'w-full flex flex-col items-center gap-2'}
                >
                    <ThemedText type={'subtitle'}>Conseil du jour</ThemedText>
                    <ThemedText type={'mini'} className={'w-full text-center'}>
                        {dailyTips[0].text}
                    </ThemedText>
                </ThemedView>
            </SafeAreaView>
        </ThemedView>
    );
}

