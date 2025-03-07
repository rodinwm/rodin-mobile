import {ThemedView} from '@/components/base/ThemedView';
import React, {ReactNode} from "react";
import {ThemedText} from '@/components/base/ThemedText';
import {View} from "react-native";

interface Props {
    title: string;
    subtitle?: string;
    onNextPress?: () => void;
    children?: ReactNode;
}

export default function OnboardingStepScreenTemplate(props: Props) {

    return (
        <ThemedView
            className={'w-full h-full justify-between flex flex-col gap-2'}
        >
            <ThemedView className={'w-full flex flex-col justify-center items-center'}>
                <ThemedText type={"title"} className={'text-center'}>
                    {props.title}
                </ThemedText>
                {props.subtitle && (
                    <ThemedText type={'mini'} className={"text-center opacity-50"}>
                        {props.subtitle}
                    </ThemedText>
                )}
            </ThemedView>

            {props.children}

            <View/>
        </ThemedView>
    );
}

