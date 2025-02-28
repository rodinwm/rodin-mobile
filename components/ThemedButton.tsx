import LucideIcon from "@/components/ui/LucideIcon";
import {type ButtonProps, TouchableOpacity} from "react-native";
import React from "react";
import {ThemedText} from "@/components/ThemedText";
import {icons} from "lucide-react-native";

export type ThemedButtonProps = ButtonProps & {
    icon?: {
        name: keyof typeof icons;
    };
    showTitle?: boolean;
    filled?: boolean;
};

export function ThemedButton({icon, showTitle = true, filled = true, title, ...rest}: ThemedButtonProps) {
    const classNames: string[] = [
        'flex flex-row gap-2 items-center justify-center rounded-2xl border',
        showTitle ? 'px-6 py-3' : 'p-3',
        filled ?
            'bg-background-dark dark:bg-background-light border-foreground-light dark:border-foreground-dark'
            : 'bg-background-dark/10 dark:bg-background-light/10 border-foreground-dark/10 dark:border-foreground-light/10',
    ];

    return (
        <TouchableOpacity
            className={classNames.join(' ')}
            {...rest}
        >
            {icon && (
                <LucideIcon size={20} name={icon.name} inverseColor={filled && true}/>
            )}

            {showTitle && (
                <ThemedText type={"defaultSemiBold"} inverseColor={filled && true}>{title}</ThemedText>
            )}
        </TouchableOpacity>
    );
}
