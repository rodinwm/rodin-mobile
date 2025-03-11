import {ThemedText} from '@/components/base/ThemedText';
import {ThemedView} from '@/components/base/ThemedView';
import React, {useState} from "react";
import {ThemedButton} from "@/components/base/ThemedButton";
import LucideIcon from "@/components/base/LucideIcon";
import {dailyTips} from "@/assets/static/daily-tips";
import {useRouter} from "expo-router";
import ScreenTemplate from "@/components/layouts/ScreenTemplate";
import MessageSheet from "@/components/layouts/MessageSheet";
import {AlertCard} from "@/components/AlertCard";
import {DateHelper} from "@/utils/helpers/dateHelper";

export default function Page() {
    const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
    const router = useRouter();
    const tipOfTheDay = dailyTips[new Date().getDate() % dailyTips.length].text;

    return (
        <ScreenTemplate
            title={"Rodin"}
            takeBottomBarIntoAccount={true}
            setHeightToScreenSize={true}
            headerRightBtn={{
                icon: "Users",
                onPress: () => router.push('/community')
            }}
            bottomSheet={(
                <MessageSheet
                    title={`Conseil du ${DateHelper.formatDate(new Date())}`}
                    subtitle={tipOfTheDay}
                    isOpen={isBottomSheetOpen}
                    takeBottomBarIntoAccount={true}
                    onClose={() => {
                        setIsBottomSheetOpen(false)
                    }}
                />
            )}
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
            <AlertCard
                icon={"Info"}
                title={"Conseil du jour"}
                message={tipOfTheDay}
                onPress={() => setIsBottomSheetOpen(true)}
            />
        </ScreenTemplate>
    );
}

