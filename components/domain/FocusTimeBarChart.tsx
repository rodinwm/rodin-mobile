import React from "react";
import {useColorScheme} from "@/utils/hooks/useColorScheme";
import {BarChart, stackDataItem} from "react-native-gifted-charts";
import {useWindowDimensions} from "react-native";
import {Colors} from "@/utils/colors";
import {PieChartLegendItem} from "@/components/domain/PieChartLegendItem";
import {ThemedView} from "@/components/base/ThemedView";
import {FontHelper} from "@/utils/helpers/fontHelper";

type Props = {
    data: stackDataItem[],
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
        <>
            <BarChart
                barWidth={20}
                stackBorderRadius={5}
                stackData={data}
                width={width * 0.77}
                endSpacing={5}
                initialSpacing={5}
                backgroundColor={'transparent'}
                animationDuration={1000}
                yAxisLabelSuffix={'h'}
                autoShiftLabels={true}
                // Style adapté au thème
                rulesColor={chartStyle.rulesColor}
                yAxisTextStyle={chartStyle.textStyle}
                xAxisLabelTextStyle={chartStyle.textStyle}
                yAxisColor="transparent"
                xAxisColor="transparent"
                yAxisThickness={0}
                xAxisThickness={0}
                yAxisLabelContainerStyle={{
                    fontFamily: FontHelper.getMainFontVariable(),
                }}
            />
            <ThemedView
                className={'flex flex-row gap-6 justify-between items-center'}>
                <PieChartLegendItem type={'work'}/>
                <PieChartLegendItem type={'rest'}/>
            </ThemedView>
        </>
    );
}