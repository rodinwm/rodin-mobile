import {
    AlertCard,
    FocusTimeBarChart,
    FocusTimeLineChart,
    FocusTimePieChart,
    MessageSheet,
    ScreenTemplate,
    ThemedButton,
    ThemedText,
    ThemedView
} from '@/components';
import React, {useEffect, useRef, useState} from "react";
import {useRouter} from "expo-router";
import {DateService} from "@/utils/services/dateService";
import PagerView from "react-native-pager-view";
import {ChartPeriod, ChartType} from '@/utils/enums';
import {ChartService} from "@/utils/services/chartService";
import {UiService} from "@/utils/services/uiService";
import {usePrefetchRoutes} from "@/utils/hooks/usePrefetchRoutes";

const chartPeriods = Object.values(ChartPeriod);

export default function Page() {
    const router = useRouter();
    usePrefetchRoutes(['/timer']);
    const pagerRef = useRef<PagerView | null>(null);
    const [page, setPage] = useState(0);
    const [isRodPicsUnlocked, setIsRodPicsUnlocked] = useState(true);
    const [isBottomSheetOpen, setIsBottomSheetOpen] = useState({
        tipOfTheDay: false,
        rodpics: false,
    });
    const [chartConfig, setChartConfig] = useState({
        type: ChartType.Line,
        period: ChartPeriod.Week,
    });
    const [chartData, setChartData] = useState({
        [ChartType.Line]: ChartService.generateLineChartData(chartConfig.period),
        [ChartType.Bar]: ChartService.generateStackBarChartData(chartConfig.period),
        [ChartType.Pie]: ChartService.generatePieChartData(chartConfig.period),
    });

    const handleChartConfigChange = (config: 'type' | 'period', value: ChartType | ChartPeriod) => {
        setChartConfig(prev => ({...prev, [config]: value}));
    };

    useEffect(() => {
        switch (chartConfig.type) {
            case ChartType.Line:
                setChartData(prev => ({
                    ...prev,
                    [ChartType.Line]: ChartService.generateLineChartData(chartConfig.period)
                }));
                break;
            case ChartType.Bar:
                setChartData(prev => ({
                    ...prev,
                    [ChartType.Bar]: ChartService.generateStackBarChartData(chartConfig.period)
                }));
                break;
            case ChartType.Pie:
                setChartData(prev => ({
                    ...prev,
                    [ChartType.Pie]: ChartService.generatePieChartData(chartConfig.period)
                }));
                break;
            default:
                break;
        }
    }, [chartConfig.period, chartConfig.type]);

    // Préchargement des pages
    useEffect(() => {
        router.prefetch('/timer');
    }, []);

    return (
        <ScreenTemplate
            title={"Rodin"}
            takeBottomBarIntoAccount={true}
            setHeightToScreenSize={true}
            scrollEnabled={false}
            bottomSheet={(
                <>
                    <MessageSheet
                        title={`Conseil du ${DateService.formatDate(new Date())}`}
                        subtitle={UiService.getTipOfTheDay()}
                        isOpen={isBottomSheetOpen.tipOfTheDay}
                        takeBottomBarIntoAccount={true}
                        onClose={() => {
                            setIsBottomSheetOpen(prev => ({...prev, tipOfTheDay: false}));
                        }}
                    />
                    <MessageSheet
                        title={"Vous devez d'abord réaliser une session de travail"}
                        subtitle={"Vous pourres montrer vos photos à tous vos amis après avoir réalisé une session de travail."}
                        isOpen={isBottomSheetOpen.rodpics}
                        takeBottomBarIntoAccount={true}
                        onClose={() => {
                            setIsBottomSheetOpen(prev => ({...prev, rodpics: false}));
                        }}
                        confirm={{
                            text: "Start",
                            onPress: () => {
                                setIsBottomSheetOpen(prev => ({...prev, rodpics: false}));
                                router.push('/timer')
                            }
                        }}
                        cancel={{
                            text: "Annuler",
                            onPress: () => {
                                setIsBottomSheetOpen(prev => ({...prev, rodpics: false}));
                            }
                        }}
                    />
                </>
            )}
        >
            {/* Stats texts */}
            <ThemedView className={'w-full flex flex-col mt-6'}>
                <ThemedText type={'default'}>Statistiques du jour</ThemedText>
                <ThemedText type={'subtitle'}>4,5 heures travaillées - 7 sessions </ThemedText>
            </ThemedView>

            {/* Stats texts */}
            <ThemedView className={'w-full flex flex-col gap-3'}>
                {/* Tabs */}
                <ThemedView
                    className={'w-full flex flex-row gap-2 justify-between items-center'}
                >
                    <ThemedButton
                        title={"Graphique"}
                        textSize={"miniExtraBold"}
                        type={chartConfig.type === ChartType.Line ? "default" : "no-fill"}
                        paddingStyle={"small"}
                        radiusStyle={'full'}
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
                        paddingStyle={"small"}
                        radiusStyle={'full'}
                        //disabled={true}
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
                        paddingStyle={"small"}
                        radiusStyle={'full'}
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
                    className={'flex flex-row items-center'}
                    fillStyle={"opacity-10"}
                    paddingStyle={"extraSmall"}
                    radiusStyle={"full"}
                >
                    {chartPeriods.map((period, index) => (
                        <ThemedButton
                            key={`chart-period-button-${index}`}
                            title={period}
                            textSize={"miniExtraBold"}
                            className={'flex-1'}
                            radiusStyle={'full'}
                            paddingStyle={"small"}
                            type={chartConfig.period === period ? "default" : "no-fill"}
                            onPress={() => {
                                handleChartConfigChange('period', period);
                            }}
                        />
                    ))}
                </ThemedView>


                <PagerView
                    ref={pagerRef}
                    initialPage={0}
                    style={{height: 250}}
                    pageMargin={10}
                    overdrag={true}
                    scrollEnabled={false}
                    orientation={"horizontal"}
                    onPageSelected={(e) => {
                        const currentPage = e.nativeEvent.position;
                        setPage(currentPage);
                    }}
                >
                    <FocusTimeLineChart
                        data={chartData[ChartType.Line]}
                        //data2={ChartService.generateLineChartData(chartConfig.period)}
                    />
                    <FocusTimeBarChart
                        data={chartData[ChartType.Bar]}
                    />
                    <FocusTimePieChart
                        data={chartData[ChartType.Pie]}
                    />
                </PagerView>

                <ThemedView className={'w-full flex flex-row gap-3'}>
                    <ThemedButton
                        title={"START"}
                        className={'flex-1'}
                        justifyItems={"justify-between"}
                        onPress={() => router.push('/timer')}
                        suffixIcon={{
                            name: "ChevronRight",
                        }}
                    />
                    <ThemedButton
                        title={"RodPics"}
                        className={'flex-1'}
                        justifyItems={"justify-between"}
                        suffixIcon={{
                            name: "Camera",
                        }}
                        onPress={() => {
                            if (isRodPicsUnlocked) {
                                router.push('/rodpics');
                            } else {
                                setIsBottomSheetOpen(prev => ({...prev, rodpics: true}))
                            }
                        }}
                    />
                </ThemedView>
            </ThemedView>

            {/* Conseils */}
            <AlertCard
                icon={"Info"}
                title={"Conseil du jour"}
                message={UiService.getTipOfTheDay()}
                onPress={() => {
                    // Complete here
                    setIsBottomSheetOpen(prev => ({...prev, tipOfTheDay: true}));
                }}
            />
        </ScreenTemplate>
    );
}

