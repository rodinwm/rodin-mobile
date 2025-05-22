import {ImageBackground, ImageSourcePropType, StyleSheet, View, type ViewProps} from 'react-native';
import React from "react";
import BlurredBackground from "@/components/base/BlurredBackground";
import {ThemedClassName} from "@/utils/interfaces";

export type ThemedViewProps = ViewProps & {
    borderWidth?: number;
    borderStyle?: "default" | "inversed" | "none";
    fillStyle?: "default" | "opacity-5" | "opacity-10" | "opacity-15" | "opacity-50" | "warning" | "inversed" | "none";
    radiusStyle?: "default" | "full" | "big" | "small" | "none";
    paddingStyle?: "default" | "asymetric" | "small" | "extraSmall" | "none";
    overflow?: "hidden" | "visible";
    backgroundImage?: ImageSourcePropType | { uri: string };
    showBlackOverlay?: boolean;
    isBackgroundBlur?: boolean;
};

export function ThemedView({
                               children,
                               className,
                               backgroundImage,
                               borderWidth = 1,
                               borderStyle = "none",
                               fillStyle = "none",
                               radiusStyle = "none",
                               paddingStyle = "none",
                               overflow = "hidden",
                               isBackgroundBlur = false,
                               showBlackOverlay = false,
                               style,
                               ...otherProps
                           }: ThemedViewProps
) {
    const flattenedStyle = StyleSheet.flatten(style) || {};
    const classNames: ThemedClassName = {
        base: '',
        overflow: `overflow-${overflow}`,
        fillStyle: fillStyle === "default" ?
            'bg-background-light dark:bg-background-dark' : fillStyle === "opacity-50" ?
                'bg-foreground-light/50 dark:bg-foreground-dark/50 backdrop-blur-md' : fillStyle === "opacity-15" ?
                    'bg-foreground-light/15 dark:bg-foreground-dark/15 backdrop-blur-md' : fillStyle === "opacity-10" ?
                        'bg-foreground-light/10 dark:bg-foreground-dark/10 backdrop-blur-md' : fillStyle === "opacity-5" ?
                            'bg-foreground-light/5 dark:bg-foreground-dark/5 backdrop-blur-md' : fillStyle === "inversed" ?
                                'bg-background-dark dark:bg-background-light' : fillStyle === "warning" ?
                                    'bg-background-warning-light dark:bg-background-warning-dark' : '',
        radiusStyle: radiusStyle === "default" ?
            'rounded-3xl' : radiusStyle === "full" ?
                'rounded-full' : radiusStyle === "big" ?
                    'rounded-6xl' : radiusStyle === "small" ?
                        'rounded-lg' : '',
        borderStyle: borderStyle === "default" ?
            `border border-foreground-light/20 dark:border-foreground-dark/20` : borderStyle === "inversed" ?
                `border  border-foreground-dark dark:border-foreground-light` : '',
        paddingStyle: paddingStyle === "default" ?
            'p-6' : paddingStyle === "asymetric" ?
                'px-6 py-3' : paddingStyle === "small" ?
                    'p-3' : paddingStyle === "extraSmall" ?
                        'p-1.5' : '',
        customClassName: className ?? ''
    };

    return backgroundImage ? (
        <ImageBackground
            source={backgroundImage}
            className={Object.values(classNames).filter(Boolean).join(' ')}
            style={{
                ...flattenedStyle,
                borderWidth: borderStyle === "none" ? 0 : borderWidth,
            }}
            {...otherProps}
        >
            {showBlackOverlay && (
                <View className={'absolute inset-0 bg-background-dark/20'}/>
            )}

            {children}
        </ImageBackground>
    ) : (
        <View
            className={Object.values(classNames).filter(Boolean).join(' ')}
            style={{
                ...flattenedStyle,
                borderWidth: borderStyle === "none" ? 0 : borderWidth,
            }}
            {...otherProps}
        >
            {isBackgroundBlur && <BlurredBackground/>}
            {children}
        </View>
    );
}
