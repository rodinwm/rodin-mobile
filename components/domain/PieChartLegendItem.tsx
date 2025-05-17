import React from "react";
import {ThemedText} from "@/components/base/ThemedText";
import {ThemedView} from "@/components/base/ThemedView";
import {useColorScheme} from "@/utils/hooks/useColorScheme";

type Props = {
    type: 'work' | 'rest' | 'other';
};

export function PieChartLegendItem({type}: Props) {
    const colorScheme = useColorScheme() ?? 'light';

    return (
        <ThemedView
            className={'w-fit flex flex-row gap-2 justify-center items-center'}>
            <ThemedView
                radiusStyle={'full'}
                paddingStyle={"extraSmall"}
                fillStyle={"none"}
                className={`bg-background-${type}-${colorScheme}`}
            />

            <ThemedText type={"default"}>
                {
                    type === 'work' ?
                        'Travail' : type === 'rest' ?
                            'Repos' : 'Autre'
                }
            </ThemedText>
        </ThemedView>
    );
}
