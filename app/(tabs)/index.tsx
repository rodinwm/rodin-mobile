import {ThemedText} from '@/components/base/ThemedText';
import {ThemedView} from '@/components/base/ThemedView';
import React from "react";
import {ThemedButton} from "@/components/base/ThemedButton";
import LucideIcon from "@/components/base/LucideIcon";
import {dailyTips} from "@/assets/static/daily-tips";
import {useRouter} from "expo-router";
import ScreenTemplate from "@/components/layouts/ScreenTemplate";

export default function Page() {
    const router = useRouter();

    return (
        <ScreenTemplate
            title={"Rodin"}
            takeBottomBarIntoAccount={true}
            setHeightToScreenSize={true}
            headerRightBtn={{
                icon: "Users",
                onPress: () => router.push('/community')
            }}
        >
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
                    className={'w-full flex flex-col items-center gap-3'}
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
        </ScreenTemplate>
    );
}

