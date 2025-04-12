import {ThemedView} from '@/components/base/ThemedView';
import React from "react";
import {useLocalSearchParams, useRouter} from "expo-router";
import ScreenTemplate from '@/components/layouts/ScreenTemplate';
import {ThemedButton} from "@/components/base/ThemedButton";
import {ThemedText} from "@/components/base/ThemedText";
import {useColorScheme} from "@/utils/hooks/useColorScheme";
import LucideIcon from "@/components/base/LucideIcon";

export default function Page() {
    const router = useRouter();
    const colorScheme = useColorScheme() ?? 'light';
    const {firstPicUri, secondPicUri} = useLocalSearchParams();


    return (
        <ScreenTemplate
            title={"RodPics"}
            headerLeftBtn={"backBtn"}
            setHeightToScreenSize={true}
            removeBodyPadding={true}
            scrollEnabled={false}
        >
            <ThemedView
                className={'w-full h-full flex-1 justify-between'}
                radiusStyle={"default"}
                paddingStyle={"mini"}
                fillStyle={"inversed"}
                backgroundImage={{uri: firstPicUri.toString()}}
            >
                <ThemedView
                    className={'h-1/3 aspect-[9/16] shadow-lg'}
                    radiusStyle={"default"}
                    fillStyle={"inversed"}
                    backgroundImage={{uri: secondPicUri.toString()}}
                />
                <ThemedView
                    className={"w-full items-end"}
                >
                    <ThemedView
                        className={"w-fit flex flex-row gap-2 justify-center items-center"}
                        radiusStyle={"default"}
                        paddingStyle={"asymetric"}
                        isBackgroundBlur={true}
                    >
                        <LucideIcon name={'Brain'} size={18}/>
                        <ThemedText
                            type={'defaultExtraBold'}
                            className={"opacity-70"}
                            inverseColor={colorScheme === 'light'}
                        >
                            10h30
                        </ThemedText>
                    </ThemedView>
                </ThemedView>
            </ThemedView>

            <ThemedButton
                suffixIcon={{name: 'SendHorizontal'}}
                type={"no-fill"}
                title={"Envoyer"}
                onPress={() => {
                }}
            />
        </ScreenTemplate>
    );
}