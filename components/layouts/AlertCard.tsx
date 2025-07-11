import {ThemedView} from '@/components/base/ThemedView';
import {ThemedText} from '@/components/base/ThemedText';
import {LucideIcon} from '@/components/base/LucideIcon';
import React from "react";
import {Colors} from "@/utils/colors";
import {useColorScheme} from "@/utils/hooks/useColorScheme";
import {icons} from "lucide-react-native";
import {TouchableOpacity} from "react-native";

type Props = {
    icon?: keyof typeof icons;
    type?: "default" | "warning";
    title: string;
    message: string;
    onPress?: () => void;
    disableTextDarkMode?: boolean;
}

export function AlertCard({
                              icon,
                              type = "default",
                              title,
                              message,
                              onPress,
                              disableTextDarkMode = false,
                          }: Props
) {
    const colorScheme = useColorScheme() ?? 'dark';
    const iconColor = type === "warning" ?
        Colors.foreground.warning[colorScheme] : Colors.foreground[colorScheme];
    const textColor = type === "warning" ?
        `text-foreground-warning-light ${disableTextDarkMode ? '' : 'dark:text-foreground-warning-dark'}` : `text-foreground-light ${disableTextDarkMode ? '' : 'dark:text-foreground-dark'}`;

    return (
        <TouchableOpacity
            onPress={onPress}
        >
            <ThemedView
                fillStyle={
                    type === "warning" ? 'warning' : 'opacity-5'
                }
                borderStyle={"opacity-20"}
                isBackgroundBlur={type === "default"}
                radiusStyle={"default"}
                paddingStyle={"asymetric"}
                className={'w-full flex flex-col items-center gap-2'}
            >

                <ThemedView className={'w-full flex flex-row justify-center items-center gap-1'}>
                    {icon ? (
                        <LucideIcon
                            name={icon}
                            color={iconColor}
                            size={18}
                        />
                    ) : null}
                    <ThemedText
                        type={'subtitle'}
                        filled={false}
                        className={textColor}
                    >
                        {title}
                    </ThemedText>
                </ThemedView>
                <ThemedText
                    type={'default'}
                    className={`w-full text-center leading-none ${textColor}`}
                    filled={false}
                >
                    {message}
                </ThemedText>
            </ThemedView>
        </TouchableOpacity>
    );
}