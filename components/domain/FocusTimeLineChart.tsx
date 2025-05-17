import React from "react";
import {useColorScheme} from "@/utils/hooks/useColorScheme";
import {LineChart, lineDataItem} from "react-native-gifted-charts";
import {useWindowDimensions} from "react-native";

type Props = {
    data: lineDataItem[],
}

export function FocusTimeLineChart({data}: Props) {
    const colorScheme = useColorScheme() ?? 'light';
    const {width} = useWindowDimensions();

    return (
        <LineChart
            data={data}
            spacing={10}
            width={width}
            hideDataPoints
            lineGradient
            focusEnabled
            showStripOnFocus
            showTextOnFocus
        />
    );
}