import {ThemedView} from "@/components/base/ThemedView";
import React from "react";
import {ThemedText} from "@/components/base/ThemedText";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import {Colors} from "@/utils/colors";
import {useColorScheme} from "@/utils/hooks/useColorScheme";
import {ColorTheme} from "@/utils/enums";
import LucideIcon from "@/components/base/LucideIcon";
import {TouchableOpacity} from "react-native";

interface Props {
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
                outlined={true}
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
            <BouncyCheckbox
                iconComponent={(
                    <LucideIcon name={"Check"} size={14} inverseColor={true}/>
                )}
                fillColor={Colors.foreground[colorScheme]}
                //unFillColor={Colors.foreground[colorScheme] + "33"}
                disableText={true}
                isChecked={selected}
                disabled={true}
            />
        </TouchableOpacity>
    );
}