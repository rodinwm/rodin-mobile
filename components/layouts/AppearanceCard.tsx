import {ThemedView} from '@/components/base/ThemedView';
import {ThemedText} from '@/components/base/ThemedText';
import {ThemedCheckbox} from '@/components/base/ThemedCheckbox';
import React from "react";
import {useColorScheme} from "@/utils/hooks/useColorScheme";
import {ColorTheme} from "@/utils/enums";
import {TouchableOpacity} from "react-native";

type Props = {
    type?: ColorTheme;
    selected?: boolean
    onSelect?: () => void;
}

export function AppearanceCard({
                                   type = ColorTheme.Light,
                                   selected,
                                   onSelect,
                               }: Props
) {
    const colorScheme = useColorScheme() ?? 'light';

    return (
        <TouchableOpacity
            className={'flex flex-col gap-3 justify-center items-center'}
            onPress={onSelect}
        >
            <ThemedView
                className={`w-24 h-40 flex justify-center items-center ${type === ColorTheme.Dark ? 'bg-background-dark' : 'bg-background-light'}`}
                borderStyle={"default"}
                radiusStyle={"default"}
            >
                <ThemedText
                    type={'title'}
                    inverseColor={(colorScheme === 'light' && type === ColorTheme.Dark) || (colorScheme === 'dark' && type === ColorTheme.Light)}
                >
                    R
                </ThemedText>
            </ThemedView>
            <ThemedText type={'defaultSemiBold'}>
                {type}
            </ThemedText>
            <ThemedCheckbox
                isChecked={selected}
                disabled={true}
            />
        </TouchableOpacity>
    );
}