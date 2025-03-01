import {ThemedView} from "@/components/base/ThemedView";
import LucideIcon from "@/components/base/LucideIcon";
import {ThemedText} from "@/components/base/ThemedText";
import {type ButtonProps, TouchableOpacity} from "react-native";
import {icons} from "lucide-react-native";

export type ThemedListTileProps = ButtonProps & {
    subtitle?: string;
    icon?: keyof typeof icons;
};

export default function ThemedListTile({icon, title, subtitle, ...otherProps}: ThemedListTileProps) {
    return (
        <TouchableOpacity
            {...otherProps}
        >
            <ThemedView
                outlined={true}
                fillStyle={"opacity-15"}
                radiusStyle={"default"}
                paddingStyle={"mini"}
                className={'w-full flex flex-row justify-between items-center gap-2'}
            >
                <ThemedView className={'h-fit flex flex-row items-center gap-2 flex-1'}>
                    {icon !== undefined ? (
                        <ThemedView radiusStyle={'full'} className={"p-2 bg-background-dark dark:bg-background-light"}
                                    outlined={true}>
                            <LucideIcon name={icon} inverseColor={true}/>
                        </ThemedView>
                    ) : null}

                    <ThemedView className={'flex-1'}>
                        <ThemedText type={'defaultSemiBold'} numberOfLines={2}>
                            {title}
                        </ThemedText>
                        {subtitle && (
                            <ThemedText type={'mini'}>{subtitle}</ThemedText>
                        )}
                    </ThemedView>
                </ThemedView>

                <LucideIcon name={'ChevronRight'} size={20}/>
            </ThemedView>
        </TouchableOpacity>


    );
};

