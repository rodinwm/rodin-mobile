import {ThemedView} from '@/components/base/ThemedView';
import React from "react";
import {ThemedButton} from "@/components/base/ThemedButton";
import {ThemedText} from '@/components/base/ThemedText';
import ScreenTemplate from "@/components/layouts/ScreenTemplate";
import {useRouter} from "expo-router";
import LucideIcon from "@/components/base/LucideIcon";

export default function Page() {
    const router = useRouter();

    return (
        <ScreenTemplate
            setHeightToScreenSize={true}
        >
            {/* Logo section */}
            <ThemedView className={'w-full flex flex-col justify-center items-center gap-3'}>
                <LucideIcon name={'CircleCheck'} size={150}/>
                <ThemedText type={"title"}>
                    Bienvenue parmis nous !
                </ThemedText>
                <ThemedText type={'mini'} className={"text-center opacity-50"}>
                    Vous avez terminé le processus d'onboarding. Vous pouvez maintenant profiter d'une application de
                    concentration optimale dans vos différentes tâches.
                </ThemedText>
            </ThemedView>


            <ThemedButton
                title={"Continuer"}
                onPress={() => router.push('/(tabs)')}
            />

        </ScreenTemplate>
    );
}

