import LucideIcon from "@/components/base/LucideIcon";
import {type ButtonProps, TouchableOpacity} from "react-native";
import React from "react";
import {ThemedText} from "@/components/base/ThemedText";
import {icons} from "lucide-react-native";

export type ThemedButtonProps = ButtonProps & {
    icon?: {
        name: keyof typeof icons;
        size?: number;
    };
    showTitle?: boolean;
    fullWidth?: boolean;
    fullHeight?: boolean;
    miniText?: boolean;
    className?: string;
    radiusStyle?: "default" | "full" | "left-only" | "right-only" | "none";
    type?: 'default' | 'outlined' | 'danger' | 'success' | 'link';
};

export function ThemedButton({
                                 icon,
                                 title,
                                 className,
                                 fullWidth,
                                 fullHeight,
                                 miniText,
                                 showTitle = true,
                                 radiusStyle = "default",
                                 type = "default",
                                 ...otherProps
                             }: ThemedButtonProps
) {
    const classNames: string[] = [
        'flex flex-row gap-2 items-center justify-center border p-3',
        showTitle ? 'px-6 py-3' : '',
        fullWidth ? 'w-full' : '',
        fullHeight ? 'h-full' : '',
        radiusStyle === "default" ?
            'rounded-2xl' : radiusStyle === "full" ?
                'rounded-full' : radiusStyle === "left-only" ?
                    'rounded-l-2xl' : radiusStyle === "right-only" ?
                        'rounded-r-2xl' : '',
        type === "default" ?
            'bg-background-dark dark:bg-background-light border-foreground-light dark:border-foreground-dark' : type === "outlined" ?
                'bg-background-dark/10 dark:bg-background-light/10 border-foreground-light/20 dark:border-foreground-dark/20' : type === "danger" ?
                    'bg-red-700 border-red-700' : type === "success" ?
                        'bg-emerald-700 border-emerald-700' : type === "link" ?
                            'px-0 py-0 opacity-50 border-transparent' : '',
        className ?? '',
    ];

    return (
        <TouchableOpacity
            className={classNames.join(' ')}
            {...otherProps}
        >
            {icon && (
                <LucideIcon
                    size={icon.size}
                    name={icon.name}
                    inverseColor={type === "default"}
                />
            )}

            {showTitle && (
                <ThemedText
                    type={
                        miniText ?
                            "miniBold" : type === "link" ?
                                'link' : "defaultSemiBold"
                    }
                    filled={type !== "danger"}
                    className={type === "danger" ? 'text-foreground-dark' : ''}
                    inverseColor={type === "default"}
                >
                    {title}
                </ThemedText>
            )}
        </TouchableOpacity>
    );
}
