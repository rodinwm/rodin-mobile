import {ThemedView} from '@/components/base/ThemedView';
import React from "react";
import {ThemedButton} from "@/components/base/ThemedButton";
import {ThemedText} from '@/components/base/ThemedText';
import LucideIcon from "@/components/base/LucideIcon";
import {AlertCard} from "@/components/AlertCard";
import ScreenTemplate from "@/components/layouts/ScreenTemplate";

export default function Page() {

    return (
        <ScreenTemplate
            headerLeftBtn={"backBtn"}
            setHeightToScreenSize={true}
        >
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
        </ScreenTemplate>
    );
}

