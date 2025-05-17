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
                radiusStyle={'full'}
                paddingStyle={"extraSmall"}
                borderStyle={"default"}
                //className={`bg-foreground-${type}-${colorScheme}`}
                style={{
                    backgroundColor: Colors.background[type][colorScheme],
                }}
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
