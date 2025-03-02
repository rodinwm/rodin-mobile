import {ThemedText} from '@/components/base/ThemedText';
import {ThemedView} from '@/components/base/ThemedView';
import React from "react";
import {ThemedButton} from "@/components/base/ThemedButton";
import {SafeAreaView} from "react-native-safe-area-context";
import {useNavigation, useRouter} from "expo-router";
import {Platform, ScrollView} from 'react-native';
import ThemedListTile from "@/components/base/ThemedListTile";
import {Friends} from "@/assets/static/friends";
import {ThemedTextInput} from "@/components/base/ThemedTextInput";
import {openBrowserAsync} from "expo-web-browser";

export default function Page() {
    const router = useRouter();
    const navigation = useNavigation();


    return (
        <ThemedView className={"w-full h-screen"} fillStyle={"default"}>
            <ScrollView
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
            >
                <SafeAreaView
                    className={"w-full h-screen flex flex-col gap-14 p-6 pt-0"}
                >
                    {/* Header */}
                    <ThemedView className={'w-full flex flex-row items-center justify-between'}>
                        <ThemedButton
                            title={"Back"}
                            icon={{name: 'ChevronLeft'}}
                            showTitle={false}
                            type={"outlined"}
                            onPress={() => navigation.goBack()}
                        />

                        <ThemedText type={'title'} className={'text-center'}>
                            Communauté
                        </ThemedText>

                        <ThemedButton
                            title={"Back"}
                            icon={{name: 'BookUser'}}
                            showTitle={false}
                            type={"outlined"}
                            onPress={() => router.push('/community/friend-requests')}
                        />
                    </ThemedView>

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

                </SafeAreaView>
            </ScrollView>
        </ThemedView>
    );
}

