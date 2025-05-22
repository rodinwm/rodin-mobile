import React from "react";
import {useColorScheme} from "@/utils/hooks/useColorScheme";
import {LineChart, lineDataItem} from "react-native-gifted-charts";
import {useWindowDimensions} from "react-native";
import {Colors} from "@/utils/colors";

type Props = {
    data: lineDataItem[],
};

export function FocusTimeLineChart({data}: Props) {
    const colorScheme = useColorScheme() ?? 'light';
    const {width} = useWindowDimensions();
    const foreground = Colors.foreground[colorScheme];

    const chartStyle = {
        textStyle: {
            color: foreground,
            fontSize: 10,
        },
        rulesColor: foreground + '33',
        stripColor: foreground,
        dataPointsColor: foreground,
    };

    return (
        <LineChart
            data={data}
            width={width * 0.75}
            adjustToWidth={true}
            initialSpacing={0}

            // Données et interactivité
            hideDataPoints={true}
            lineGradient={true}
            focusEnabled={true}
            showStripOnFocus={true}
            showTextOnFocus={true}
            showDataPointLabelOnFocus={true}
            showDataPointOnFocus={true}
            disableScroll={true}
            isAnimated={true}

            // Focus Styling
            stripColor={chartStyle.stripColor}
            stripOverDataPoints={true}
            stripHeight={500}
            textColor={chartStyle.textStyle.color}
            dataPointsColor={chartStyle.dataPointsColor}

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
