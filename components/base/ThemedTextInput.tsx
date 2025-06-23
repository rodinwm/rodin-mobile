import {TextInput, type TextInputProps} from 'react-native';
import {FontService} from "@/utils/services/fontService";
import {FontWeightEnum} from "@/utils/enums";
import {ThemedText} from "@/components/base/ThemedText";
import {ThemedView} from "@/components/base/ThemedView";
import React from "react";

export type ThemedViewProps = TextInputProps & {
    label?: string;
    bigText?: boolean;
    outlined?: boolean;
    radiusStyle?: "default" | "full" | "left-only" | "right-only" | "none";
    containerClassName?: string;
};

export function ThemedTextInput({
                                    label,
                                    bigText,
                                    className,
                                    maxLength,
                                    outlined = true,
                                    containerClassName,
                                    radiusStyle = "default",
                                    ...otherProps
                                }: ThemedViewProps
) {
    const classNames: string[] = [
        'flex flex-row items-center font-sans px-6 py-5 text-foreground-light dark:text-foreground-dark bg-foreground-light/5 dark:bg-foreground-dark/5',
        bigText ? 'text-2xl' : 'text-md',
        outlined ? 'border border-foreground-light/10 dark:border-foreground-dark/10' : '',
        radiusStyle === "default" ?
            'rounded-2xl' : radiusStyle === "full" ?
                'rounded-full' : radiusStyle === "left-only" ?
                    'rounded-l-2xl' : radiusStyle === "right-only" ?
                        'rounded-r-2xl' : '',
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
                style={{fontFamily: FontService.getMainFontStatic(FontWeightEnum.Medium)}}
                {...otherProps}
            />
        </ThemedView>
    );
}
