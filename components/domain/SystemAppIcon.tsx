import {ThemedText} from "@/components/base/ThemedText";
import {ThemedView} from "@/components/base/ThemedView";
import React from "react";
import {LucideIcon} from "@/components/base/LucideIcon";
import {SystemApp} from "@/utils/interfaces";
import {TouchableOpacity} from "react-native";

type Props = {
    app: SystemApp;
    mini?: boolean;
    showAppName?: boolean;
    onPress?: () => void;
}

export function SystemAppIcon({app, mini = false, showAppName = true, onPress}: Props) {
    return (
        <TouchableOpacity
            className={'flex flex-col justify-center items-center'}
            onPress={onPress}
        >
            <ThemedView
                radiusStyle={'medium'}
                //fillStyle={'opacity-15'}
                //className={'w-12 h-12'}
                paddingStyle={mini ? 'small' : 'default'}
                backgroundImage={require('@/assets/images/app-icons/whatsapp.png')}
            >
                <LucideIcon name={"User"} color={"transparent"}/>
            </ThemedView>
            {showAppName && (
                <ThemedText type={'small'}>{app.name}</ThemedText>
            )}
        </TouchableOpacity>
    );
}