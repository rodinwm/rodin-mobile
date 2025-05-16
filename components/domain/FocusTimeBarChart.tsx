import {ThemedView} from "@/components/base/ThemedView";
import React from "react";
import {useColorScheme} from "@/utils/hooks/useColorScheme";
import {BarChart} from "react-native-gifted-charts";

type Props = {}

export function FocusTimeBarChart({}: Props
) {
    const colorScheme = useColorScheme() ?? 'light';
    const barData = [
        {value: 250, label: 'M'},
        {value: 500, label: 'T', frontColor: '#177AD5'},
        {value: 745, label: 'W', frontColor: '#177AD5'},
        {value: 320, label: 'T'},
        {value: 600, label: 'F', frontColor: '#177AD5'},
        {value: 256, label: 'S'},
        {value: 300, label: 'S'},
    ];

    return (
        <ThemedView
            fillStyle={"opacity-5"}
            borderStyle={"default"}
            radiusStyle={"default"}
            paddingStyle={"small"}
            className={'w-full flex flex-col items-center gap-3'}
        >
            <BarChart
                barWidth={22}
                noOfSections={3}
                barBorderRadius={4}
                frontColor="lightgray"
                data={barData}
                yAxisThickness={0}
                xAxisThickness={0}
            />
        </ThemedView>
    );
}