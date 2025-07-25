import {ThemedView} from '@/components/base/ThemedView';
import React from "react";
import {useColorScheme} from "@/utils/hooks/useColorScheme";
import {ActivityIndicator} from "react-native";
import {Colors} from "@/utils/colors";
import {ScreenTemplate} from "@/components";

type Props = {};

export function LoadingScreen(props: Props) {
    const colorScheme = useColorScheme();

    return (
        <ScreenTemplate
            title={"Rodin"}
            scrollEnabled={false}
        >
            <ThemedView className={'w-full h-full flex flex-col justify-center items-center gap-3'}>
                <ActivityIndicator size="large" color={Colors.foreground[colorScheme]}/>
            </ThemedView>
        </ScreenTemplate>
    );
}