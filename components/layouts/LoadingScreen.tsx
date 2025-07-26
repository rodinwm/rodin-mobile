import {ThemedView} from '@/components/base/ThemedView';
import React from "react";
import {useColorScheme} from "@/utils/hooks/useColorScheme";
import {ScreenTemplate} from "@/components";
import {Loader} from "@/components/layouts/Loader";

type Props = {};

export function LoadingScreen(props: Props) {
    const colorScheme = useColorScheme();

    return (
        <ScreenTemplate
            title={"Rodin"}
            scrollEnabled={false}
        >
            <ThemedView className={'w-full h-full flex flex-col justify-center items-center gap-3'}>
                <Loader/>
            </ThemedView>
        </ScreenTemplate>
    );
}