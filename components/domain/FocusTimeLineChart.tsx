import React from "react";
import {useColorScheme} from "@/utils/hooks/useColorScheme";
import {LineChart, lineDataItem} from "react-native-gifted-charts";
import {useWindowDimensions} from "react-native";
import {Colors} from "@/utils/colors";

type Props = {
    data: lineDataItem[],
};

export function FocusTimeLineChart({data}: Props) {
    const [focusedIndex, setFocusedIndex] = React.useState<number | undefined>(undefined);
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
            lineGradient={true}
            disableScroll={true}
            isAnimated={true}
            delayBeforeUnFocus={5000}
            animateOnDataChange={true}
            scrollAnimation={true}
            focusedDataPointRadius={5}
            focusEnabled={true}
            showStripOnFocus={true}
            showDataPointOnFocus={true}
            showDataPointLabelOnFocus={true}
            renderDataPointsAfterAnimationEnds={true}
            showTextOnFocus={true}

            // Focus Styling
            stripColor={chartStyle.stripColor}
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
