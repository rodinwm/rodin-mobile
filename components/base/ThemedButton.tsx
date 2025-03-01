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
    filled?: boolean;
    fullWidth?: boolean;
    fullHeight?: boolean;
    radiusStyle?: "default" | "full" | "left-only" | "right-only" | "none";
};

export function ThemedButton({
                                 icon,
                                 title,
                                 fullWidth,
                                 fullHeight,
                                 showTitle = true,
                                 filled = true,
                                 radiusStyle = "default",
                                 ...otherProps
                             }: ThemedButtonProps
) {
    const classNames: string[] = [
        'flex flex-row gap-2 items-center justify-center border',
        showTitle ? 'px-6 py-3' : 'p-3',
        fullWidth ? 'w-full flex-1' : 'w-fit',
        fullHeight ? 'h-full flex-1' : 'h-fit',
        radiusStyle === "default" ?
            'rounded-2xl' : radiusStyle === "full" ?
                'rounded-full' : radiusStyle === "left-only" ?
                    'rounded-l-2xl' : radiusStyle === "right-only" ?
                        'rounded-r-2xl' : '',
        filled ?
            'bg-background-dark dark:bg-background-light border-foreground-light dark:border-foreground-dark'
            : 'bg-background-dark/10 dark:bg-background-light/10 border-foreground-light/20 dark:border-foreground-dark/20',
    ];

    return (
        <TouchableOpacity
            className={classNames.join(' ')}
            {...otherProps}
        >
            {icon && (
                <LucideIcon size={icon.size} name={icon.name} inverseColor={filled}/>
            )}

            {showTitle && (
                <ThemedText type={"defaultSemiBold"} inverseColor={filled}>{title}</ThemedText>
            )}
        </TouchableOpacity>
    );
}
