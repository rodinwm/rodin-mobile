import {ThemedText} from '@/components/ThemedText';
import {ThemedView} from '@/components/ThemedView';
import React from "react";
import {ThemedButton} from "@/components/ThemedButton";
import {useBottomTabOverflow} from "@/components/ui/TabBarBackground";
import {SafeAreaView, useSafeAreaInsets} from "react-native-safe-area-context";
import LucideIcon from "@/components/ui/LucideIcon";

export default function Page() {
    const insets = useSafeAreaInsets();
    const bottomOverflow = useBottomTabOverflow();


    return (
        <ThemedView className={"w-full"} filled={true}>
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
                        filled={false}
                        rounded={true}
                        className={'w-full flex flex-col items-center p-6 gap-3 dark:bg-foreground-dark/15'}
                    >
                        <LucideIcon name={'ChartPie'} size={150}/>
                        <ThemedText type={'subtitle'}>Statistiques</ThemedText>
                    </ThemedView>

                    <ThemedButton
                        title={"Start"}
                        onPress={() => console.log("Start")}
                    />
                </ThemedView>

                {/* Conseils */}
                <ThemedView
                    filled={false}
                    rounded={true}
                    className={'w-full flex flex-col items-center px-6 py-3 gap-2 dark:bg-foreground-dark/15'}
                >
                    <ThemedText type={'subtitle'}>Conseils du jour</ThemedText>
                    <ThemedText type={'mini'} className={'w-full text-center'}>
                        Lorem ipsum dolor sit amet, consect etur adix pisci ng elit. Sed do e sfg srg.
                    </ThemedText>
                </ThemedView>
            </SafeAreaView>
        </ThemedView>
    );
}

