import {ThemedView} from '@/components/base/ThemedView';
import React from "react";
import {useLocalSearchParams, useRouter} from "expo-router";
import ScreenTemplate from '@/components/layouts/ScreenTemplate';
import {ThemedButton} from "@/components/base/ThemedButton";
import {ThemedText} from "@/components/base/ThemedText";

export default function Page() {
    const router = useRouter();
    const {backPicUri} = useLocalSearchParams();


    return (
        <ScreenTemplate
            title={"RodPic's"}
            headerLeftBtn={"backBtn"}
            setHeightToScreenSize={true}
            scrollEnabled={false}
        >
            <ThemedView
                className={'w-full h-full flex-1 justify-between'}
                radiusStyle={"default"}
                paddingStyle={"mini"}
                fillStyle={"inversed"}
                backgroundImage={{uri: backPicUri.toString()}}
            >
                <ThemedView
                    className={'h-1/3 aspect-[9/16] shadow-lg'}
                    //outlined={true}
                    radiusStyle={"default"}
                    fillStyle={"inversed"}
                    backgroundImage={{uri: backPicUri.toString()}}
                />
                <ThemedText type={'h1'} className={"opacity-50"}>
                    10h30
                </ThemedText>
            </ThemedView>

            <ThemedButton
                suffixIcon={{name: 'SendHorizontal'}}
                title={"Envoyer"}
                onPress={() => {
                }}
            />
        </ScreenTemplate>
    );
}