import React from "react";
import {LucideIcon, ThemedText, ThemedView} from '@/components';
import {useColorScheme} from "@/utils/hooks/useColorScheme";

type Props = {};

export function AndroidAppBlockerView({}: Props) {
    const colorScheme = useColorScheme() ?? 'dark';

    return (
        <ThemedView className={'flex-1 flex flex-col justify-center items-center gap-3'} style={{flex: 1}}>
            <ThemedView
                className={'w-full flex flex-col justify-center items-center gap-3'}
            >
                <LucideIcon name={'Shield'} size={150}/>
                <ThemedText type={'subtitle'}>Bloqueur d'app binetôt disponible</ThemedText>
                <ThemedText type={'default'} className={'text-center'}>
                    Vous aurez bientôt la possibilité de bloquer les applications qui vous distraient sur Android.
                </ThemedText>
            </ThemedView>
        </ThemedView>
    );
}
