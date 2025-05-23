import {ScreenTemplate, ThemedButton, ThemedView} from '@/components';
import React from "react";
import {useRouter} from "expo-router";

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
                paddingStyle={"small"}
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