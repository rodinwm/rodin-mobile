import {ThemedText} from '@/components/base/ThemedText';
import {ThemedView} from '@/components/base/ThemedView';
import React from "react";
import {ThemedButton} from "@/components/base/ThemedButton";
import {useRouter} from "expo-router";
import {Platform} from 'react-native';
import ThemedListTile from "@/components/base/ThemedListTile";
import {Friends} from "@/assets/static/friends";
import {ThemedTextInput} from "@/components/base/ThemedTextInput";
import {openBrowserAsync} from "expo-web-browser";
import ScreenTemplate from '@/components/layouts/ScreenTemplate';

export default function Page() {
    const router = useRouter();

    return (
        <ScreenTemplate
            title={"Communauté"}
            headerLeftBtn={"backBtn"}
            headerRightBtn={{
                icon: "BookUser",
                onPress: () => router.push('/community/friend-requests'),
            }}
        >
            <ThemedView className={'w-full flex flex-col gap-2'}>
                <ThemedTextInput
                    clearButtonMode={"while-editing"}
                    placeholder={"Rechercher vos amis"}
                    onChangeText={(text) => {
                        console.log(text);
                    }}
                />
                <ThemedListTile
                    icon={'User'}
                    suffixIcon={'ExternalLink'}
                    title={"Invite tes amis sur RODIN"}
                    subtitle={"rodin.al/mvxence"}
                    fillStyle={"inversed"}
                    onPress={async (event) => {
                        if (Platform.OS !== 'web') {
                            event.preventDefault();
                            await openBrowserAsync("https://www.instagram.com/alexxtahi/");
                        }
                    }}
                />
            </ThemedView>

            {/* Friends */}
            <ThemedView className={'w-full flex flex-col gap-2'}>
                <ThemedText type={"h1"}>
                    Mes amis
                </ThemedText>
                {Friends.map((friend) => (
                    <ThemedListTile
                        key={friend.username}
                        icon={'User'}
                        suffixIcon={null}
                        title={friend.getFullName()}
                        subtitle={friend.username}
                    />
                ))}
                {/* See more */}
                <ThemedView className={'w-full mt-4'}>
                    <ThemedButton
                        title={"Voir plus"}
                        onPress={() => console.log("Voir plus")}
                    />
                </ThemedView>
            </ThemedView>
        </ScreenTemplate>
    );
}

