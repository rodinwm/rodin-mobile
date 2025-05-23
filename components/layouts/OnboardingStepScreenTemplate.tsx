import {ThemedText, ThemedView} from '@/components';
import React, {ReactNode} from "react";
import {View} from "react-native";

type Props = {
    title: string;
    subtitle?: string;
    onNextPress?: () => void;
    children?: ReactNode;
    addSpaceAtTheBottom?: boolean;
}

export function OnboardingStepScreenTemplate({
                                                 title,
                                                 subtitle,
                                                 children,
                                                 addSpaceAtTheBottom = true
                                             }: Props
) {

    return (
        <ThemedView
            className={'w-full h-full justify-between flex flex-col gap-2'}
        >
            <ThemedView className={'w-full flex flex-col justify-center items-center gap-1'}>
                <ThemedText type={"title"} className={'text-center'}>
                    {title}
                </ThemedText>
                {subtitle && (
                    <ThemedText type={'small'} className={"text-center opacity-50"}>
                        {subtitle}
                    </ThemedText>
                )}
            </ThemedView>

            {children}

            {addSpaceAtTheBottom ? <View/> : null}
        </ThemedView>
    );
}

