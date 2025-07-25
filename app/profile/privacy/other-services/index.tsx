import {LucideIcon, ScreenTemplate, ThemedListTile, ThemedText, ThemedView} from '@/components';
import React from "react";
import {useNavigation, useRouter} from "expo-router";

export default function Page() {
    const router = useRouter();
    const navigation = useNavigation();


    return (
        <ScreenTemplate
            title={"Autre services"}
            headerLeftBtn={"backBtn"}
        >
            {/* Options */}
            <ThemedView className={'w-full flex flex-col gap-6'}>
                <ThemedListTile
                    icon={"Languages"}
                    title={'Langue'}
                    suffixIcon={(
                        <ThemedView className={'flex flex-row items-center gap-3'}>
                            <ThemedView
                                className={'flex items-center'}
                                fillStyle={"opacity-15"}
                                paddingStyle={"small"}
                                radiusStyle={"full"}
                            >
                                <ThemedText type={"miniBold"}>
                                    Français
                                </ThemedText>
                            </ThemedView>
                            <LucideIcon name={"ChevronRight"}/>
                        </ThemedView>
                    )}
                />
                <ThemedListTile
                    icon={"MapPin"}
                    title={'Position'}
                    suffixIcon={(
                        <ThemedView className={'flex flex-row items-center gap-3'}>
                            <ThemedView
                                className={'flex items-center'}
                                fillStyle={"opacity-15"}
                                paddingStyle={"small"}
                                radiusStyle={"full"}
                            >
                                <ThemedText type={"miniBold"}>
                                    App active
                                </ThemedText>
                            </ThemedView>
                            <LucideIcon name={"ChevronRight"}/>
                        </ThemedView>
                    )}
                />
            </ThemedView>
        </ScreenTemplate>
    );
}

