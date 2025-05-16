import {ThemedText} from '@/components/base/ThemedText';
import {ThemedView} from '@/components/base/ThemedView';
import React, {useRef, useState} from "react";
import {ThemedButton} from "@/components/base/ThemedButton";
import LucideIcon from "@/components/base/LucideIcon";
import {dailyTips} from "@/assets/static/daily-tips";
import {useRouter} from "expo-router";
import ScreenTemplate from "@/components/layouts/ScreenTemplate";
import MessageSheet from "@/components/layouts/MessageSheet";
import {AlertCard} from "@/components/AlertCard";
import {DateHelper} from "@/utils/helpers/dateHelper";
import PagerView from "react-native-pager-view";
import {ChartPeriod, ChartType} from '@/utils/enums';

const chartTypes = Object.values(ChartType);
const chartPeriods = Object.values(ChartPeriod);

export default function Page() {
    const router = useRouter();
    const tipOfTheDay = dailyTips[new Date().getDate() % dailyTips.length].text;
    const pagerRef = useRef<PagerView | null>(null);
    const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
    const [isRodPicsUnlocked, setIsRodPicsUnlocked] = useState(true);
    const [chartConfig, setChartConfig] = useState({
        type: ChartType.Line,
        period: ChartPeriod.Day,
    });

    const handleChartConfigChange = (config: 'type' | 'period', value: ChartType | ChartPeriod) => {
        setChartConfig(prevState => ({...prevState, [config]: value}));
    };

    return (
        <ScreenTemplate
            title={"Rodin"}
            takeBottomBarIntoAccount={true}
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
                {/* Tabs */}
                <ThemedView
                    className={'w-full flex flex-row gap-2 items-center'}
                >
                    <ThemedButton
                        title={"Graphique"}
                        textSize={"miniExtraBold"}
                        type={chartConfig.type === ChartType.Line ? "default" : "no-fill"}
                        showTitle={false}
                        icon={{
                            name: "ChartLine",
                            size: 14,
                        }}
                        onPress={() => {
                            handleChartConfigChange('type', ChartType.Line);
                            pagerRef.current?.setPage(0);
                        }}
                    />
                    <ThemedButton
                        title={"Diagramme"}
                        type={chartConfig.type === ChartType.Bar ? "default" : "no-fill"}
                        textSize={"miniExtraBold"}
                        showTitle={false}
                        icon={{
                            name: "ChartColumn",
                            size: 14,
                        }}
                        onPress={() => {
                            handleChartConfigChange('type', ChartType.Bar);
                            pagerRef.current?.setPage(1);
                        }}
                    />
                    <ThemedButton
                        title={"Répartition"}
                        type={chartConfig.type === ChartType.Pie ? "default" : "no-fill"}
                        textSize={"miniExtraBold"}
                        showTitle={false}
                        icon={{
                            name: "ChartPie",
                            size: 14,
                        }}
                        onPress={() => {
                            handleChartConfigChange('type', ChartType.Pie);
                            pagerRef.current?.setPage(2);
                        }}
                    />
                </ThemedView>

                {/* Tabs */}
                <ThemedView
                    className={'w-full flex flex-row gap-1 items-center'}
                    fillStyle={"opacity-10"}
                    paddingStyle={"extraSmall"}
                    radiusStyle={"default"}
                >
                    {chartPeriods.map((period, index) => (
                        <ThemedButton
                            key={`chart-period-button-${index}`}
                            title={period}
                            textSize={"miniExtraBold"}
                            className={'flex-1'}
                            type={chartConfig.period === period ? "default" : "no-fill"}
                            onPress={() => {
                                handleChartConfigChange('period', period);
                            }}
                        />
                    ))}
                </ThemedView>

                <ThemedView
                    fillStyle={"opacity-5"}
                    borderStyle={"default"}
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
                        type={'opacity-15'}
                        className={'flex-1'}
                        onPress={() => router.push('/timer')}
                    />
                    <ThemedButton
                        icon={{name: !isRodPicsUnlocked ? 'Lock' : 'Camera'}}
                        title={"RodPics"}
                        type={'opacity-15'}
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

