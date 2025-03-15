import {TextInput, type TextInputProps} from 'react-native';
import {FontHelper} from "@/utils/helpers/fontHelper";
import {FontWeightEnum} from "@/utils/enums";
import {ThemedView} from "@/components/base/ThemedView";
import {ThemedText} from "@/components/base/ThemedText";
import React from "react";

export type ThemedViewProps = TextInputProps & {
    label?: string;
    bigText?: boolean;
    radiusStyle?: "default" | "full" | "left-only" | "right-only" | "none";
    containerClassName?: string;
};

export function ThemedTextInput({
                                    label,
                                    bigText,
                                    className,
                                    maxLength,
                                    containerClassName,
                                    radiusStyle = "default",
                                    ...otherProps
                                }: ThemedViewProps
) {
    const classNames: string[] = [
        'font-sans px-6 py-4 border border-foreground-light/10 dark:border-foreground-dark/10 text-foreground-light dark:text-foreground-dark bg-foreground-light/5 dark:bg-foreground-dark/5',
        bigText ? 'text-2xl' : 'text-lg',
        radiusStyle === "default" ?
            'rounded-3xl' : radiusStyle === "full" ?
                'rounded-full' : radiusStyle === "left-only" ?
                    'rounded-l-3xl' : radiusStyle === "right-only" ?
                        'rounded-r-3xl' : '',
        className ?? ''
    ];

    return (
        <ThemedView className={`flex flex-col gap-1 ${containerClassName}`}>
            {label ? (
                <ThemedText type={"defaultSemiBold"}>
                    {label}
                </ThemedText>
            ) : null}
            <TextInput
                className={classNames.join(' ')}
                placeholderClassName={bigText ? 'text-2xl' : 'text-lg'}
                style={{fontFamily: FontHelper.getMainFontStatic(FontWeightEnum.Medium)}}
                {...otherProps}
            />
        </ThemedView>
    );
}
