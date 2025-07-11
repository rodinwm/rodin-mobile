import React from "react";
import {useColorScheme} from "@/utils/hooks/useColorScheme";
import {BarChart, stackDataItem} from "react-native-gifted-charts";
import {useWindowDimensions} from "react-native";
import {Colors} from "@/utils/colors";
import {ChartLegendItem} from "@/components/domain/ChartLegendItem";
import {ThemedView} from "@/components/base/ThemedView";
import {FontService} from "@/utils/services/fontService";
import {UiService} from "@/utils/services/uiService";

type Props = {
    data: stackDataItem[],
}

export function FocusTimeBarChart({data}: Props) {
    const colorScheme = useColorScheme() ?? 'dark';
    const {width} = useWindowDimensions();
    const foreground = Colors.foreground[colorScheme];
    const chartStyle = {
        textStyle: {
            color: foreground,
            fontSize: 10,
            fontFamily: FontService.getMainFontVariable(),
        },
        rulesColor: foreground + '33'
    };

    return (
        <ThemedView
            overflow={"visible"}
            borderStyle={"opacity-20"}
            radiusStyle={"default"}
            paddingStyle={"extraSmall"}
            className={'w-full h-full flex flex-col justify-center items-center gap-3'}
        >
            <BarChart
                barWidth={20}
                stackBorderRadius={5}
                stackData={data}
                width={width * 0.77}
                height={175}
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
                xAxisColor={chartStyle.textStyle.color + '33'}
                xAxisType={'dashed'}
                yAxisThickness={0}
                xAxisThickness={1}
                yAxisLabelContainerStyle={{
                    fontFamily: FontService.getMainFontVariable(),
                }}
                focusBarOnPress={true}
                onLongPress={(point: stackDataItem, index: number) => {
                    UiService.hapticImpact();
                    console.info("Long press on bar", index);
                }}
            />
            <ThemedView
                className={'flex flex-row gap-6 justify-between items-center'}>
                <ChartLegendItem type={'work'}/>
                <ChartLegendItem type={'rest'}/>
            </ThemedView>
        </ThemedView>
    );
}