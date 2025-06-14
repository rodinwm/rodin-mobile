import {LucideIcon} from "@/components/base/LucideIcon";
import {ThemedText} from "@/components/base/ThemedText";
import {ThemedView} from "@/components/base/ThemedView";
import {type ButtonProps, TouchableOpacity} from "react-native";
import {icons} from "lucide-react-native";
import {isValidElement, ReactNode} from "react";
import {UIHelper} from "@/utils/helpers/UIHelper";
import {Colors} from "@/utils/colors";
import {useColorScheme} from "@/utils/hooks/useColorScheme";

export type ThemedListTileProps = ButtonProps & {
    subtitle?: string;
    icon?: keyof typeof icons | ReactNode;
    suffixIcon?: keyof typeof icons | ReactNode | null;
    fillStyle?: "default" | "opacity-15" | "opacity-50" | "warning" | "inversed" | "none";
    hasPadding?: boolean;
    hapticOnPress?: boolean;
};

export function ThemedListTile({
                                   icon,
                                   title,
                                   subtitle,
                                   hasPadding,
                                   suffixIcon = 'ChevronRight',
                                   fillStyle = "none",
                                   hapticOnPress = true,
                                   onPress,
                                   ...otherProps
                               }: ThemedListTileProps
) {
    const colorScheme = useColorScheme() ?? 'light';

    return (
        <TouchableOpacity
            onPress={onPress !== undefined ? (event) => {
                if (hapticOnPress) UIHelper.hapticImpact()
                onPress(event);
            } : undefined}
            {...otherProps}
        >
            <ThemedView
                fillStyle={otherProps.disabled ? "opacity-50" : fillStyle}
                radiusStyle={hasPadding ? "default" : "none"}
                paddingStyle={hasPadding ? "small" : "none"}
                className={'w-full flex flex-row justify-between items-center gap-2'}
            >
                <ThemedView className={'h-fit flex flex-row justify-center items-center gap-4 flex-1'}>
                    {icon !== undefined && icon !== null ?
                        isValidElement(icon) ? (icon) : (
                            fillStyle === "none" ? (
                                <LucideIcon name={icon as keyof typeof icons}/>
                            ) : (
                                <ThemedView
                                    fillStyle={fillStyle !== "inversed" ? "inversed" : 'default'}
                                    radiusStyle={'full'}
                                    className={"p-2"}
                                    borderStyle={"default"}
                                >
                                    <LucideIcon
                                        name={icon as keyof typeof icons}
                                        color={otherProps.disabled ? Colors.foreground[colorScheme] + '66' : undefined}
                                        inverseColor={fillStyle !== "inversed"}
                                    />
                                </ThemedView>
                            ))
                        : null}

                    <ThemedView className={'flex-1 flex flex-col justify-center'}>
                        <ThemedText
                            type={'defaultSemiBold'}
                            numberOfLines={2}
                            inverseColor={fillStyle === "inversed"}
                        >
                            {title}
                        </ThemedText>
                        {subtitle && (
                            <ThemedText
                                type={'small'}
                                inverseColor={fillStyle === "inversed"}
                                className={"opacity-50"}
                            >
                                {subtitle}
                            </ThemedText>
                        )}
                    </ThemedView>
                </ThemedView>

                {suffixIcon !== undefined && suffixIcon !== null ? (
                    isValidElement(suffixIcon) ? (suffixIcon) : (
                        <LucideIcon
                            size={20}
                            name={suffixIcon as keyof typeof icons}
                            inverseColor={fillStyle === "inversed"}
                        />
                    )
                ) : null}

            </ThemedView>
        </TouchableOpacity>


    );
};

