import React from "react";
import {useColorScheme} from "@/utils/hooks/useColorScheme";
import {PieChart, pieDataItem} from "react-native-gifted-charts";
import {Colors} from "@/utils/colors";

type Props = {
    data: pieDataItem[],
}

export function FocusTimePieChart({data}: Props) {
    const colorScheme = useColorScheme() ?? 'light';
    const textColor = Colors.foreground[colorScheme];
    const gridColor = Colors.foreground[colorScheme] + '33';

    return (
        <PieChart
            data={data}
            donut
            showGradient
            radius={90}
            innerRadius={60}
            innerCircleColor={Colors.background[colorScheme]}
        />
    );
}