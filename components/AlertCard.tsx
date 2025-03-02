import {ThemedText} from '@/components/base/ThemedText';
import {ThemedView} from "@/components/base/ThemedView";
import React from "react";

interface ComponentProps {
    title: string;
    message: string;
}

export function AlertCard(props: ComponentProps) {

    return (
        <ThemedView
            fillStyle={"warning"}
            outlined={true}
            radiusStyle={"default"}
            paddingStyle={"asymetric"}
            className={'w-full flex flex-col items-center gap-2'}
        >
            <ThemedText
                type={'subtitle'}
                filled={false}
                className={"text-yellow-50 dark:text-yellow-950"}
            >
                {props.title}
            </ThemedText>
            <ThemedText
                type={'mini'}
                className={'w-full text-center text-yellow-50 dark:text-yellow-950'}
                filled={false}
            >
                {props.message}
            </ThemedText>
        </ThemedView>
    );
}