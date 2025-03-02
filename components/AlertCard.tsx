import {ThemedText} from '@/components/base/ThemedText';
import {ThemedView} from "@/components/base/ThemedView";
import React from "react";
import LucideIcon from "@/components/base/LucideIcon";
import {Colors} from "@/utils/colors";
import {useColorScheme} from "@/utils/hooks/useColorScheme";

interface ComponentProps {
    title: string;
    message: string;
}

export function AlertCard(props: ComponentProps) {
    const colorScheme = useColorScheme();

    return (
        <ThemedView
            fillStyle={"warning"}
            outlined={true}
            radiusStyle={"default"}
            paddingStyle={"asymetric"}
            className={'w-full flex flex-col items-center gap-2'}
        >

            <ThemedView className={'w-full flex flex-row justify-center items-center gap-1'}>
                <LucideIcon
                    name={'TriangleAlert'}
                    color={Colors.foreground.warning[colorScheme ?? 'light']}
                    size={18}
                />
                <ThemedText
                    type={'subtitle'}
                    filled={false}
                    className={"text-foreground-warning-light dark:text-foreground-warning-dark"}
                >
                    {props.title}
                </ThemedText>
            </ThemedView>
            <ThemedText
                type={'mini'}
                className={'w-full text-center text-foreground-warning-light dark:text-foreground-warning-dark'}
                filled={false}
            >
                {props.message}
            </ThemedText>
        </ThemedView>
    );
}