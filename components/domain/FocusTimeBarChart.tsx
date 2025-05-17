import React from "react";
import {useColorScheme} from "@/utils/hooks/useColorScheme";
import {BarChart, barDataItem} from "react-native-gifted-charts";
import {useWindowDimensions} from "react-native";
import {Colors} from "@/utils/colors";

type Props = {
    data: barDataItem[],
}

export function FocusTimeBarChart({data}: Props) {
    const colorScheme = useColorScheme() ?? 'light';
    const {width} = useWindowDimensions();
    const chartStyle = {
        textStyle: {
            color: Colors.foreground[colorScheme],
            fontSize: 10,
        },
        rulesColor: Colors.foreground[colorScheme] + '33'
    };

    return (
        <BarChart
            barWidth={20}
            barBorderRadius={5}
            frontColor="lightgray"
            data={data}
            width={width}

            // Style adapté au thème
            rulesColor={chartStyle.rulesColor}
            yAxisTextStyle={chartStyle.textStyle}
            xAxisLabelTextStyle={chartStyle.textStyle}
            yAxisColor="transparent"
            xAxisColor="transparent"
            yAxisThickness={0}
            xAxisThickness={0}
        />
    );
}