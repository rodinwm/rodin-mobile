import {ThemedBottomSheet} from '@/components/base/ThemedBottomSheet';
import {TimerSelect} from "@/components/domain/TimerSelect";
import {LucideIcon} from "@/components/base/LucideIcon";
import {ThemedText} from "@/components/base/ThemedText";
import {ThemedView} from "@/components/base/ThemedView";
import React, {useState} from "react";
import {TimerValue} from "@/utils/interfaces";
import {defaultBreakTime, defaultWorkTime} from '@/utils/constants';

type Props = {
    isOpen: boolean;
    onClose: () => void;
}

export function DefaultTimerSheet(props: Props) {
    const [workTime, setWorkTime] = useState<TimerValue>(defaultWorkTime);
    const [breakTime, setBreakTime] = useState<TimerValue>(defaultBreakTime);

    return (
        <ThemedBottomSheet
            isOpen={props.isOpen}
            onClose={props.onClose}
        >
            <ThemedText type={'title'}>Minuteur par défaut</ThemedText>

            {/* Temps de travail */}
            <ThemedView className={'w-full flex flex-col gap-3'}>
                <ThemedView className={'w-full flex flex-row items-center gap-2 opacity-50'}>
                    <LucideIcon name={'Brain'}/>
                    <ThemedText type={'defaultSemiBold'}>Temps de travail</ThemedText>
                </ThemedView>

                <TimerSelect
                    defaultValue={defaultWorkTime}
                    onChange={(time: TimerValue) => setWorkTime(time)}
                />
            </ThemedView>

            {/* Temps de repos */}
            <ThemedView className={'w-full flex flex-col gap-3'}>
                <ThemedView className={'w-full flex flex-row items-center gap-2 opacity-50'}>
                    <LucideIcon name={'OctagonPause'}/>
                    <ThemedText type={'defaultSemiBold'}>Temps de repos</ThemedText>
                </ThemedView>

                <TimerSelect
                    defaultValue={defaultBreakTime}
                    onChange={(time: TimerValue) => setBreakTime(time)}
                />
            </ThemedView>
        </ThemedBottomSheet>
    );
}