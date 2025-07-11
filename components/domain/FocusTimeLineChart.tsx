import React from "react";
import {useColorScheme} from "@/utils/hooks/useColorScheme";
import {LineChart, lineDataItem} from "react-native-gifted-charts";
import {useWindowDimensions} from "react-native";
import {Colors} from "@/utils/colors";
import {ChartLegendItem} from "@/components/domain/ChartLegendItem";
import {ThemedView} from "@/components/base/ThemedView";
import {ThemedText} from "@/components/base/ThemedText";
import {FontService} from "@/utils/services/fontService";
import {UiService} from "@/utils/services/uiService";

type Props = {
    data: lineDataItem[],
    data2?: lineDataItem[],
};

export function FocusTimeLineChart({data, data2}: Props) {
    const colorScheme = useColorScheme() ?? 'dark';
    const {width} = useWindowDimensions();
    const foreground = Colors.foreground[colorScheme];

    const chartStyle = {
        textStyle: {
            color: foreground,
            fontSize: 10,
            fontFamily: FontService.getMainFontVariable(),
        },
        rulesColor: foreground + '33',
        stripColor: foreground,
        dataPointsColor: foreground,
    };

    return (
        <ThemedView
            overflow={"visible"}
            borderStyle={"opacity-20"}
            radiusStyle={"default"}
            paddingStyle={"extraSmall"}
            className={'w-full h-full flex flex-col justify-center items-center gap-3'}
        >
            <LineChart
                areaChart={true}
                startFillColor={Colors.foreground.work[colorScheme]}
                endFillColor={Colors.foreground.work[colorScheme]}
                startOpacity={0.5}
                endOpacity={0}
                data={data}
                data2={data2}
                width={width * 0.77}
                height={190}
                backgroundColor={'transparent'}
                adjustToWidth={true}
                spacing={undefined}
                //initialSpacing={15}
                initialSpacing={1}
                indicatorColor={"black"}

                // Données et interactivité
                //lineGradient={true}
                color={Colors.foreground.work[colorScheme]}
                color2={Colors.foreground.rest[colorScheme]}
                disableScroll={true}
                isAnimated={true}
                animateOnDataChange={true}
                scrollAnimation={true}
                focusedDataPointRadius={5}
                focusEnabled={false}
                showStripOnFocus={true}
                showDataPointOnFocus={true}
                verticalLinesUptoDataPoint={true}
                verticalLinesColor={chartStyle.stripColor + '33'}
                verticalLinesStrokeDashArray={[4, 4]}
                //showVerticalLines={true}


                // Focus Styling
                stripColor={chartStyle.stripColor}
                stripHeight={500}
                textColor={chartStyle.textStyle.color}
                dataPointsColor={chartStyle.dataPointsColor}

                // Style adapté au thème
                rulesColor={chartStyle.rulesColor}
                yAxisTextStyle={chartStyle.textStyle}
                xAxisLabelTextStyle={chartStyle.textStyle}
                xAxisLabelsHeight={0}
                yAxisColor='transparent'
                xAxisColor={chartStyle.textStyle.color + '33'}
                xAxisType={'dashed'}
                yAxisThickness={0}
                xAxisThickness={1}
                rotateLabel={false}
                yAxisLabelSuffix={'h'}
                yAxisLabelContainerStyle={{
                    fontFamily: FontService.getMainFontVariable(),
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
                    pointerLabelWidth: data2 ? 100 : 60,
                    pointerLabelComponent: (points: lineDataItem[]) => {
                        UiService.hapticImpact('selection');
                        return (
                            <ThemedView
                                className={`w-full flex flex-row gap-2 ${data2 ? 'justify-between' : 'justify-center'} items-center`}
                                fillStyle={'default'}
                                borderStyle={'default'}
                                paddingStyle={'small'}
                                radiusStyle={'small'}
                            >
                                <ThemedView
                                    className={'flex flex-col'}
                                >
                                    <ThemedText type={'small'}>{points[0].label}</ThemedText>
                                    <ThemedText type={'small'}>Travail</ThemedText>
                                    <ThemedText
                                        type={'miniBold'}
                                        filled={false}
                                        className={'text-foreground-work-light'}
                                    >
                                        {points[0].value}h
                                    </ThemedText>
                                </ThemedView>
                                {points.length > 1 && (
                                    <ThemedView
                                        className={'flex flex-col'}
                                    >
                                        <ThemedText type={'small'}>Repos</ThemedText>
                                        <ThemedText type={'miniBold'}>{points[1].value}h</ThemedText>
                                    </ThemedView>
                                )}
                            </ThemedView>
                        );
                    },
                }}
            />
            <ThemedView
                className={'flex flex-row gap-6 justify-between items-center'}>
                <ChartLegendItem type={'work'}/>
                {data2 && (<ChartLegendItem type={'rest'}/>)}
            </ThemedView>
        </ThemedView>
    );
}
