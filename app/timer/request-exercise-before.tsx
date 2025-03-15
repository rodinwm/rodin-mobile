import {ThemedView} from '@/components/base/ThemedView';
import React from "react";
import {ThemedButton} from "@/components/base/ThemedButton";
import {ThemedText} from '@/components/base/ThemedText';
import LucideIcon from "@/components/base/LucideIcon";
import {AlertCard} from "@/components/AlertCard";
import ScreenTemplate from "@/components/layouts/ScreenTemplate";
import {Toast} from "toastify-react-native";

export default function Page() {

    return (
        <ScreenTemplate
            headerLeftBtn={"backBtn"}
            setHeightToScreenSize={true}
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
                    onPress={() => {
                        Toast.success("Promised is resolved")
                    }}
                />
                <ThemedButton
                    title={"Non"}
                    type={"outlined"}
                    onPress={() => {
                        Toast.info("Je suis ici")
                    }}
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

