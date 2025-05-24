import {AlertCard, LucideIcon, ScreenTemplate, ThemedButton, ThemedText, ThemedView} from '@/components';
import React from "react";
import {useRouter} from "expo-router";

export default function Page() {
    const router = useRouter();

    return (
        <ScreenTemplate
            headerLeftBtn={"backBtn"}
            setHeightToScreenSize={true}
            scrollEnabled={false}
        >
            {/* Message */}
            <ThemedView className={'w-full flex flex-col gap-3 justify-center items-center'}>
                <LucideIcon name={'Brain'} size={100}/>
                <ThemedText type={'subtitle'} className={"text-center"}>
                    Souhaites-tu un exercice de concentration avant de commencer ?
                </ThemedText>
            </ThemedView>


            <ThemedView className={'w-full flex flex-col gap-3'}>
                <ThemedButton
                    title={"Oui"}
                    onPress={() => router.push('/games/respiration')}
                />
                <ThemedButton
                    title={"Non"}
                    type={"outlined"}
                    onPress={() => router.push('/timer/lock-screen')}
                />
            </ThemedView>

            {/* Conseils */}
            <AlertCard
                icon={"TriangleAlert"}
                type={"warning"}
                title={"Attention"}
                message={"Sois prêt à travailler et supprime les distractions autour de toi."}
            />
        </ScreenTemplate>
    );
}

