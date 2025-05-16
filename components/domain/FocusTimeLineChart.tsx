import {ThemedView} from "@/components/base/ThemedView";
import React from "react";
import {useColorScheme} from "@/utils/hooks/useColorScheme";
import {LineChart} from "react-native-gifted-charts";

type Props = {}

export function FocusTimeLineChart({}: Props
) {
    const colorScheme = useColorScheme() ?? 'light';
    const lineData = [
        {value: 0, dataPointText: '0'},
        {value: 10, dataPointText: '10'},
        {value: 8, dataPointText: '8'},
        {value: 58, dataPointText: '58'},
        {value: 56, dataPointText: '56'},
        {value: 78, dataPointText: '78'},
        {value: 74, dataPointText: '74'},
        {value: 98, dataPointText: '98'},
    ];

    const lineData2 = [
        {value: 0, dataPointText: '0'},
        {value: 20, dataPointText: '20'},
        {value: 18, dataPointText: '18'},
        {value: 40, dataPointText: '40'},
        {value: 36, dataPointText: '36'},
        {value: 60, dataPointText: '60'},
        {value: 54, dataPointText: '54'},
        {value: 85, dataPointText: '85'},
    ];

    return (
        <ThemedView
            fillStyle={"opacity-5"}
            borderStyle={"default"}
            radiusStyle={"default"}
            paddingStyle={"small"}
            className={'w-full flex flex-col items-center gap-3'}
        >
            <LineChart
                data={lineData}
                data2={lineData2}
                showVerticalLines
                spacing={44}
                initialSpacing={0}
                color1="skyblue"
                color2="orange"
                textColor1="green"
                dataPointsHeight={6}
                dataPointsWidth={6}
                dataPointsColor1="blue"
                dataPointsColor2="red"
                textShiftY={-2}
                textShiftX={-5}
                textFontSize={13}
            />
        </ThemedView>
    );
}