import React from "react";
import {useColorScheme} from "@/utils/hooks/useColorScheme";
import {LineChart, lineDataItem} from "react-native-gifted-charts";
import {Text, useWindowDimensions, View} from "react-native";
import {Colors} from "@/utils/colors";
import {ThemedText} from "@/components/base/ThemedText";

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
            rotateLabel={true}
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
                pointerStripColor: 'lightgray',
                pointerStripWidth: 1,
                strokeDashArray: [4, 4],
                pointerColor: 'lightgray',
                radius: 4,
                pointerLabelWidth: 100,
                pointerLabelHeight: 120,
                pointerLabelComponent: () => {
                    return (
                        <View
                            style={{
                                height: 120,
                                width: 100,
                                backgroundColor: '#282C3E',
                                borderRadius: 4,
                                justifyContent: 'center',
                                paddingLeft: 16,
                            }}>
                            <Text style={{color: 'lightgray', fontSize: 12}}>{2018}</Text>
                            <Text style={{color: 'white', fontWeight: 'bold'}}>{53}</Text>
                            <Text style={{color: 'lightgray', fontSize: 12, marginTop: 12}}>{2019}</Text>
                            <Text style={{color: 'white', fontWeight: 'bold'}}>{52}</Text>
                        </View>
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
    );
}
