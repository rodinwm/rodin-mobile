import React, {useEffect, useState} from "react";
import {useColorScheme} from "@/utils/hooks/useColorScheme";
import {PieChart, pieDataItem} from "react-native-gifted-charts";
import {Colors} from "@/utils/colors";
import {ChartLegendItem, ThemedText, ThemedView} from "@/components";

type Props = {
    data: pieDataItem[],
};

export function FocusTimePieChart({data}: Props) {
    const colorScheme = useColorScheme() ?? 'light';
    const [focusedIndex, setFocusedIndex] = useState<number | undefined>(undefined);
    const foreground = Colors.foreground[colorScheme];
    const background = Colors.background[colorScheme];
    const [chartData, setChartData] = useState<pieDataItem[]>([]);


    const handlePress = (_: any, index: number) => {
        setFocusedIndex(prev => (prev === index ? undefined : index));
    };

    useEffect(() => {
        setChartData(data.map((item, index) => ({
            ...item,
            focused: index === focusedIndex,
        })));
    }, [focusedIndex, data]);

    return (
        <>
            <PieChart
                data={chartData}
                donut={true}
                showGradient={true}
                isAnimated={true}
                radius={100}
                innerRadius={60}
                innerCircleColor={background}
                textColor={background}
                tooltipBackgroundColor={foreground}
                textSize={16}
                focusOnPress
                onPress={handlePress}
                backgroundColor={'transparent'}
                centerLabelComponent={() => {
                    if (focusedIndex !== undefined) {
                        return (
                            <ThemedView
                                className={'flex flex-col justify-center items-center'}>
                                <ThemedText type={"title"}>
                                    {chartData[focusedIndex].value}%
                                </ThemedText>
                                <ThemedText type={"default"}>
                                    {chartData[focusedIndex].text}
                                </ThemedText>
                            </ThemedView>
                        );
                    }
                }}
            />
            <ThemedView
                className={'flex flex-row gap-6 justify-between items-center'}>
                <ChartLegendItem type={'work'}/>
                <ChartLegendItem type={'rest'}/>
            </ThemedView>
        </>
    );
}
