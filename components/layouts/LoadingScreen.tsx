import {ThemedView} from '@/components/base/ThemedView';
import React from "react";
import {ScreenTemplate} from "@/components";
import {Loader} from "@/components/layouts/Loader";

type Props = {
    title?: string;
};

export function LoadingScreen({title = 'Rodin'}: Props) {
    return (
        <ScreenTemplate
            title={title}
            scrollEnabled={false}
        >
            <ThemedView className={'w-full h-full flex flex-col justify-center items-center gap-3'}>
                <Loader/>
            </ThemedView>
        </ScreenTemplate>
    );
}