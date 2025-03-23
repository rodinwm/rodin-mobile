import {ThemedText} from '@/components/base/ThemedText';
import {ThemedView} from '@/components/base/ThemedView';
import React from "react";
import {ThemedButton} from "@/components/base/ThemedButton";
import {useRouter} from "expo-router";
import {FlatList, Platform} from 'react-native';
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
                icon: "UserPlus",
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
                    hasPadding={true}
                    onPress={async (event) => {
                        if (Platform.OS !== 'web') {
                            event.preventDefault();
                            await openBrowserAsync("https://www.instagram.com/alexxtahi/");
                        }
                    }}
                />
            </ThemedView>

            {/* Friends */}
            <ThemedView className={'w-full flex flex-col gap-4'}>
                <ThemedText type={"h1"}>
                    Mes amis
                </ThemedText>

                <FlatList
                    refreshing={false}
                    onRefresh={() => console.log('refresh')}
                    data={Friends}
                    ItemSeparatorComponent={() => (
                        <ThemedView className={"h-5"}/>
                    )}
                    ListFooterComponent={() => (
                        <ThemedView className={'w-full mt-14'}>
                            <ThemedButton
                                title={"Voir plus"}
                                onPress={() => console.log("Voir plus")}
                            />
                        </ThemedView>
                    )}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={item => item.username}
                    renderItem={({item}) => (
                        <ThemedListTile
                            key={item.username}
                            icon={'User'}
                            fillStyle={"none"}
                            title={item.getFullName()}
                            subtitle={item.username}
                            suffixIcon={(
                                <ThemedView className={'flex flex-row gap-2'}>
                                    <ThemedButton
                                        title={"Remove"}
                                        icon={{name: 'X'}}
                                        paddingStyle={"none"}
                                        showTitle={false}
                                        type={"no-fill"}
                                    />
                                </ThemedView>
                            )}
                        />
                    )}
                />
            </ThemedView>
        </ScreenTemplate>
    );
}

