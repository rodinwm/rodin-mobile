import React from "react";
import {ThemedText} from "@/components/base/ThemedText";
import {ThemedView} from "@/components/base/ThemedView";
import {useColorScheme} from "@/utils/hooks/useColorScheme";
import {Colors} from "@/utils/colors";

type Props = {
    type: 'work' | 'rest';
};

export function PieChartLegendItem({type}: Props) {
    const colorScheme = useColorScheme() ?? 'light';

    return (
        <ThemedView
            className={'w-fit flex flex-row gap-2 justify-center items-center'}>
            <ThemedView
                className={'w-3 h-3'}
                radiusStyle={'small'}
                borderStyle={"default"}
                style={{
                    backgroundColor: Colors.background[type][colorScheme],
                }}
            />

            <ThemedText type={"small"}>
                {
                    type === 'work' ?
                        'Travail' : type === 'rest' ?
                            'Repos' : 'Autre'
                }
            </ThemedText>
        </ThemedView>
    );
}
