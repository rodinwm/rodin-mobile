import React from "react";
import {useColorScheme} from "@/utils/hooks/useColorScheme";
import {BarChart, barDataItem} from "react-native-gifted-charts";
import {useWindowDimensions} from "react-native";

type Props = {
    data: barDataItem[],
}

export function FocusTimeBarChart({data}: Props) {
    const colorScheme = useColorScheme() ?? 'light';
    const {width} = useWindowDimensions();


    return (
        <BarChart
            barWidth={22}
            noOfSections={3}
            barBorderRadius={4}
            frontColor="lightgray"
            data={data}
            width={width}
            yAxisThickness={0}
            xAxisThickness={0}
        />
    );
}