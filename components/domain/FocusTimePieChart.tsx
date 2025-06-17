import React, {useEffect, useState} from "react";
import {useColorScheme} from "@/utils/hooks/useColorScheme";
import {PieChart, pieDataItem} from "react-native-gifted-charts";
import {Colors} from "@/utils/colors";
import {ChartLegendItem} from "@/components/domain/ChartLegendItem";
import {ThemedView} from "@/components/base/ThemedView";
import {ThemedText} from "@/components/base/ThemedText";

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
        <ThemedView
            overflow={"visible"}
            borderStyle={"opacity-20"}
            radiusStyle={"default"}
            paddingStyle={"extraSmall"}
            className={'w-full h-full flex flex-col justify-center items-center gap-3'}
        >
            <PieChart
                data={chartData}
                donut={true}
                showGradient={true}
                isAnimated={true}
                radius={90}
                innerRadius={50}
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
        </ThemedView>
    );
}
