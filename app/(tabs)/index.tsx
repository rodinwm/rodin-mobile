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
    const router = useRouter();
    const tipOfTheDay = dailyTips[new Date().getDate() % dailyTips.length].text;
    const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
    const [isRodPicsUnlocked, setIsRodPicsUnlocked] = useState(true);

    return (
        <ScreenTemplate
            scrollEnabled={false}
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
                    fillStyle={"opacity-5"}
                    outlined={true}
                    radiusStyle={"default"}
                    paddingStyle={"default"}
                    className={'w-full flex flex-col items-center gap-3'}
                >
                    <LucideIcon name={'ChartPie'} size={150}/>
                    <ThemedText type={'subtitle'}>Statistiques</ThemedText>
                </ThemedView>

                <ThemedView className={'w-full flex flex-row gap-3'}>
                    <ThemedButton
                        icon={{name: 'Timer'}}
                        title={"Start"}
                        className={'flex-1'}
                        onPress={() => router.push('/timer')}
                    />
                    <ThemedButton
                        icon={{name: !isRodPicsUnlocked ? 'Lock' : 'Camera'}}
                        title={"RodPic's"}
                        //type={"outlined"}
                        className={'flex-1'}
                        disabled={!isRodPicsUnlocked}
                        onPress={() => router.push('/rodpics')}
                    />
                </ThemedView>
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

