import {ThemedView} from '@/components/base/ThemedView';
import React from "react";
import {useNavigation, useRouter} from "expo-router";
import ScreenTemplate from '@/components/layouts/ScreenTemplate';
import {ThemedText} from "@/components/base/ThemedText";
import {NotificationType} from "@/utils/enums";
import LucideIcon from "@/components/base/LucideIcon";


const notificationTypes = Object.values(NotificationType).filter((type) => type !== NotificationType.AutoSuggestions);

export default function Page() {
    const router = useRouter();
    const navigation = useNavigation();

    return (
        <ScreenTemplate
            title={"Abonnement"}
            headerLeftBtn={"backBtn"}
        >
            <ThemedView
                outlined={true}
                fillStyle={"opacity-15"}
                radiusStyle={"default"}
                paddingStyle={"default"}
                className={'w-full flex flex-col items-center gap-3'}
            >
                <LucideIcon name={'CreditCard'} size={150}/>
                <ThemedText type={'subtitle'}>Abonnement</ThemedText>
            </ThemedView>

            <ThemedView className={'w-full flex flex-col gap-3'}>
                <ThemedText type={'h1'} className={"mb-6"}>Avantages</ThemedText>
                <ThemedText>Avantages</ThemedText>
            </ThemedView>
        </ScreenTemplate>
    );
}

