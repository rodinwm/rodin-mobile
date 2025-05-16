import {ThemedView} from "@/components/base/ThemedView";
import React from "react";
import {useColorScheme} from "@/utils/hooks/useColorScheme";
import {PieChart} from "react-native-gifted-charts";

type Props = {}

export function FocusTimePieChart({}: Props
) {
    const colorScheme = useColorScheme() ?? 'light';
    const pieData = [
        {
            value: 47,
            color: '#009FFF',
            gradientCenterColor: '#006DFF',
            focused: true,
        },
        {value: 40, color: '#93FCF8', gradientCenterColor: '#3BE9DE'},
        {value: 16, color: '#BDB2FA', gradientCenterColor: '#8F80F3'},
        {value: 3, color: '#FFA5BA', gradientCenterColor: '#FF7F97'},
    ];

    return (
        <ThemedView
            fillStyle={"opacity-5"}
            borderStyle={"default"}
            radiusStyle={"default"}
            paddingStyle={"small"}
            className={'w-full flex flex-col items-center gap-3'}
        >
            <PieChart
                data={pieData}
                donut
                showGradient
                radius={90}
                innerRadius={60}
            />
        </ThemedView>
    );
}