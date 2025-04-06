import {ThemedView} from '@/components/base/ThemedView';
import React from "react";
import {useRouter} from "expo-router";
import ScreenTemplate from '@/components/layouts/ScreenTemplate';
import {ThemedButton} from "@/components/base/ThemedButton";

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
                className={'w-full h-full flex-1 justify-between'}
                radiusStyle={"default"}
                paddingStyle={"mini"}
                fillStyle={"inversed"}
            >
                
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