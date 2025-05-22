import React, {useState} from "react";
import {useColorScheme} from "@/utils/hooks/useColorScheme";
import {LineChart, lineDataItem} from "react-native-gifted-charts";
import {LayoutRectangle, useWindowDimensions} from "react-native";
import {Colors} from "@/utils/colors";
import {ThemedText} from "@/components/base/ThemedText";
import {ThemedView} from "@/components/base/ThemedView";
import {PieChartLegendItem} from "@/components/domain/PieChartLegendItem";
import {FontHelper} from "@/utils/helpers/fontHelper";

type Props = {
    data: lineDataItem[],
};

export function FocusTimeLineChart({data}: Props) {
    const [tooltipLayout, setTooltipLayout] = useState<LayoutRectangle>({width: 0, height: 0, x: 0, y: 0});
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
        <>
            <LineChart
                areaChart={false}
                curved={false}
                startFillColor={Colors.foreground[colorScheme] + '33'}
                startOpacity={0.8}
                endFillColor={Colors.background[colorScheme]}
                endOpacity={0.3}
                data={data}
                width={width * 0.77}
                backgroundColor={'transparent'}
                adjustToWidth={true}
                spacing={undefined}
                initialSpacing={15}
                indicatorColor={"black"}

                // Données et interactivité
                lineGradient={true}
                disableScroll={true}
                isAnimated={true}
                delayBeforeUnFocus={5000}
                animateOnDataChange={true}
                scrollAnimation={true}
                focusedDataPointRadius={5}
                focusEnabled={false}
                showStripOnFocus={true}
                showDataPointOnFocus={true}
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
                rotateLabel={false}
                yAxisLabelSuffix={'h'}
                yAxisLabelContainerStyle={{
                    fontFamily: FontHelper.getMainFontVariable(),
                }}
                animationDuration={1000}
                onDataChangeAnimationDuration={300}
                dataPointLabelComponent={(point: lineDataItem) => (
                    <ThemedText>
                        {point.label}
                    </ThemedText>
                )}

                // TODO: https://gifted-charts.web.app/areachart/#pointerConfig
                pointerConfig={{
                    pointerStripUptoDataPoint: true,
                    pointerStripColor: foreground + 'AA',
                    pointerStripWidth: 1,
                    strokeDashArray: [4, 4],
                    pointerColor: foreground + '33',
                    pointerLabelWidth: 100,
                    pointerLabelComponent: (points: lineDataItem[]) => {
                        return (
                            <ThemedView
                                className={'w-full flex flex-row gap-2 justify-between items-center'}
                                fillStyle={'default'}
                                borderStyle={'default'}
                                paddingStyle={'small'}
                                radiusStyle={'small'}
                                onLayout={(event) => {
                                    setTooltipLayout(event.nativeEvent.layout);
                                }}
                            >
                                <ThemedView
                                    className={'flex flex-col'}
                                >
                                    <ThemedText type={'small'}>Travail</ThemedText>
                                    <ThemedText type={'miniBold'}>{points[0].value}h</ThemedText>
                                </ThemedView>
                                <ThemedView
                                    className={'flex flex-col'}
                                >
                                    <ThemedText type={'small'}>Repos</ThemedText>
                                    <ThemedText type={'miniBold'}>{points[0].value}h</ThemedText>
                                </ThemedView>
                            </ThemedView>
                        );
                    },
                }}

                dataPointLabelShiftY={-15}
                dataPointLabelShiftX={8}
                /*
                dataPointLabelComponent={({focused, value}: { focused: boolean, value: any }) => {
                    return (
                        <ThemedView
                            paddingStyle={'small'}
                            fillStyle={'opacity-15'}
                        >
                            <ThemedText type={'small'}>{value}</ThemedText>
                        </ThemedView>
                    );
                }}
                 */
            />
            <ThemedView
                className={'flex flex-row gap-6 justify-between items-center'}>
                <PieChartLegendItem type={'work'}/>
                <PieChartLegendItem type={'rest'}/>
            </ThemedView>
        </>
    );
}
