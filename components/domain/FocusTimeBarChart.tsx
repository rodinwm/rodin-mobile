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
    const foreground = Colors.foreground[colorScheme];
    const chartStyle = {
        textStyle: {
            color: foreground,
            fontSize: 10,
        },
        rulesColor: foreground + '33'
    };

    return (
        <BarChart
            barWidth={20}
            barBorderRadius={5}
            frontColor={Colors.foreground[colorScheme]}
            data={data}
            width={width * 0.77}
            endSpacing={5}
            initialSpacing={5}
            showGradient={true}

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