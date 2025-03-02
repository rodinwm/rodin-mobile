import {ThemedView} from '@/components/base/ThemedView';
import React from "react";
import {SafeAreaView} from "react-native-safe-area-context";
import {ThemedButton} from "@/components/base/ThemedButton";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {useNavigation} from "expo-router";
import {ThemedText} from '@/components/base/ThemedText';
import LucideIcon from "@/components/base/LucideIcon";
import {AlertCard} from "@/components/AlertCard";

export default function Page() {
    const navigation = useNavigation();


    return (
        <ThemedView className={"w-full h-screen"} fillStyle={"default"}>
            <KeyboardAwareScrollView
                enableOnAndroid={true}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
            >
                <SafeAreaView
                    className={"w-full h-screen flex flex-col justify-between gap-14 p-6 pt-0"}
                >
                    {/* Header */}
                    <ThemedView className={'w-full flex flex-row items-center justify-between'}>
                        <ThemedButton
                            title={"Test"}
                            icon={{name: 'ChevronLeft'}}
                            showTitle={false}
                            type={"outlined"}
                            onPress={() => navigation.goBack()}
                        />
                    </ThemedView>

                    {/* Message */}
                    <ThemedView className={'w-full flex flex-col gap-3 justify-center items-center'}>
                        <LucideIcon name={'Dice5'} size={150}/>
                        <ThemedText type={'title'} className={"text-center"}>
                            Souhaites-tu un exercice de concentration avant de commencer ?
                        </ThemedText>
                    </ThemedView>


                    <ThemedView className={'w-full flex flex-col gap-3'}>
                        <ThemedButton
                            title={"Oui"}
                            onPress={() => console.log('/timer')}
                        />
                        <ThemedButton
                            title={"Non"}
                            type={"outlined"}
                            onPress={() => console.log('/timer')}
                        />
                    </ThemedView>

                    {/* Conseils */}
                    <AlertCard
                        title={"Attention"}
                        message={"Sois prêt à travailler et supprime les distractions autour de toi."}
                    />

                </SafeAreaView>
            </KeyboardAwareScrollView>
        </ThemedView>
    );
}

