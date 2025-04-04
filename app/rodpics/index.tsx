import {ThemedView} from '@/components/base/ThemedView';
import React from "react";
import {useRouter} from "expo-router";
import ScreenTemplate from '@/components/layouts/ScreenTemplate';
import {ThemedButton} from "@/components/base/ThemedButton";
import LucideIcon from "@/components/base/LucideIcon";
import {ThemedText} from "@/components/base/ThemedText";

export default function Page() {
    const router = useRouter();

    return (
        <ScreenTemplate
            title={"RodPic's"}
            headerLeftBtn={"backBtn"}
            setHeightToScreenSize={true}
            scrollEnabled={false}
        >
            <ThemedView
                fillStyle={"opacity-5"}
                outlined={true}
                radiusStyle={"default"}
                paddingStyle={"default"}
                className={'w-full flex-1 flex flex-col justify-center items-center gap-3'}
            >
                <LucideIcon name={'Camera'} size={150}/>
                <ThemedText type={'subtitle'}>Caméra</ThemedText>
            </ThemedView>

            <ThemedView className={'w-full flex flex-row gap-6 justify-center items-center'}>
                <ThemedButton
                    title={"Flash"}
                    icon={{name: 'Zap'}}
                    type={"outlined"}
                    isBackgroundBlur={true}
                    paddingStyle={"uniform"}
                    showTitle={false}
                />
                <ThemedButton
                    title={"Shoot"}
                    icon={{name: 'Camera'}}
                    showTitle={false}
                    type={"default"}
                    radiusStyle={"full"}
                    paddingStyle={"uniform-big"}
                />
                <ThemedButton
                    title={"Changer de caméra"}
                    icon={{name: 'RefreshCcwDot'}}
                    showTitle={false}
                    isBackgroundBlur={true}
                    type={"outlined"}
                    paddingStyle={"uniform"}
                />
            </ThemedView>
        </ScreenTemplate>
    );
}

