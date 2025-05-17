import {ThemedText} from '@/components/base/ThemedText';
import {ThemedView} from "@/components/base/ThemedView";
import React from "react";
import Constants from "expo-constants";

export function AppNameTag() {
    return (
        <ThemedView className={'w-full flex flex-col justify-center items-center'}>
            <ThemedText type={'defaultSemiBold'}>Rodin</ThemedText>
            <ThemedText type={'small'} className={"opacity-50"}>
                Version {Constants.expoConfig?.version ?? "Unknown"}
            </ThemedText>
        </ThemedView>
    );
}