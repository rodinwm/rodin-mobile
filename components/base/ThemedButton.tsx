import LucideIcon from "@/components/base/LucideIcon";
import {type ButtonProps, TouchableOpacity} from "react-native";
import React from "react";
import {ThemedText} from "@/components/base/ThemedText";
import {icons} from "lucide-react-native";
import BlurredBackground from "@/components/base/BlurredBackground";

export type ThemedButtonProps = ButtonProps & {
    icon?: {
        name: keyof typeof icons;
        size?: number;
        color?: string;
    };
    suffixIcon?: {
        name: keyof typeof icons;
        size?: number;
    };
    showTitle?: boolean;
    fullWidth?: boolean;
    fullHeight?: boolean;
    miniText?: boolean;
    className?: string;
    radiusStyle?: "default" | "full" | "left-only" | "right-only" | "none";
    paddingStyle?: "default" | "mini" | "uniform" | "uniform-big" | "uniform-very-big" | "none";
    type?: 'default' | 'outlined' | 'blue' | 'danger' | 'success' | 'warning' | 'link' | "no-fill" | 'opacity-25' | 'opacity-15';
    justifyItems?: 'justify-center' | 'justify-between';
    isBackgroundBlur?: boolean;
};

export function ThemedButton({
                                 icon,
                                 title,
                                 className,
                                 fullWidth,
                                 fullHeight,
                                 miniText,
                                 disabled,
                                 suffixIcon,
                                 color,
                                 isBackgroundBlur = false,
                                 showTitle = true,
                                 radiusStyle = "default",
                                 type = "default",
                                 paddingStyle = "default",
                                 justifyItems = "justify-center",
                                 ...otherProps
                             }: ThemedButtonProps
) {
    const classNames: string[] = [
        'flex flex-row gap-2 items-center border',
        justifyItems,
        paddingStyle !== "none" ? 'overflow-hidden' : '',
        paddingStyle === "default" ?
            'px-6 py-3' : paddingStyle === "mini" ?
                'px-3 py-2' : paddingStyle === "uniform" ?
                    'p-3' : paddingStyle === "uniform-big" ?
                        'p-10' : paddingStyle === "uniform-very-big" ?
                            'p-20' : '',
        fullWidth ? 'w-full' : '',
        fullHeight ? 'h-full' : '',
        radiusStyle === "default" ?
            'rounded-2xl' : radiusStyle === "full" ?
                'rounded-full' : radiusStyle === "left-only" ?
                    'rounded-l-2xl' : radiusStyle === "right-only" ?
                        'rounded-r-2xl' : '',
        type === "default" ?
            'bg-background-dark dark:bg-background-light border-foreground-light dark:border-foreground-dark' : type === "outlined" ?
                'bg-background-dark/5 dark:bg-background-light/5 border-foreground-light/10 dark:border-foreground-dark/10' : type === "opacity-25" ?
                    'bg-background-dark/25 dark:bg-background-light/25 border-foreground-light/10 dark:border-foreground-dark/10' : type === "opacity-15" ?
                        'bg-background-dark/15 dark:bg-background-light/15 border-foreground-light/10 dark:border-foreground-dark/10' : type === "danger" ?
                            'bg-red-700 border-red-700' : type === "blue" ?
                                'bg-blue-700 border-blue-700' : type === "success" ?
                                    'bg-emerald-700 border-emerald-700' : type === "warning" ?
                                        'bg-background-warning-light border-background-warning-light' : type === "link" ?
                                            'px-0 py-0 opacity-50 border-transparent' : type === "no-fill" ?
                                                'px-0 py-0 bg-transparent border-transparent' : '',
        disabled ? 'opacity-25' : '',
        className ?? '',
    ];

    return (
        <TouchableOpacity
            disabled={disabled}
            className={classNames.join(' ')}
            {...otherProps}
        >
            {isBackgroundBlur && <BlurredBackground/>}

            {icon && (
                <LucideIcon
                    size={icon.size}
                    color={icon.color}
                    name={icon.name}
                    inverseColor={type === "default"}
                />
            )}

            {showTitle && (
                <ThemedText
                    type={
                        miniText ?
                            "miniExtraBold" : type === "link" ?
                                'link' : "defaultSemiBold"
                    }
                    filled={type !== "danger"}
                    className={type === "danger" ? 'text-foreground-dark' : ''}
                    inverseColor={type === "default"}
                >
                    {title}
                </ThemedText>
            )}

            {suffixIcon && (
                <LucideIcon
                    size={suffixIcon.size}
                    name={suffixIcon.name}
                    inverseColor={type === "default"}
                />
            )}
        </TouchableOpacity>
    );
}
