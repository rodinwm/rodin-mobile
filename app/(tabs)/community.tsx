import {ScreenTemplate, ThemedButton, ThemedListTile, ThemedText, ThemedTextInput, ThemedView} from '@/components';
import React, {useState} from "react";
import {useRouter} from "expo-router";
import {FlatList, Platform} from 'react-native';
import {Friends} from "@/assets/static/friends";
import {openBrowserAsync} from "expo-web-browser";

export default function Page() {
    const router = useRouter();
    const [searchedFriend, setSearchedFriend] = useState('');

    return (
        <ScreenTemplate
            title={"Communauté"}
            takeBottomBarIntoAccount={true}
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
                        setSearchedFriend(text);
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
                    data={Friends.filter(friend => friend.pseudo.includes(searchedFriend))}
                    refreshing={false}
                    onRefresh={() => console.log('refresh')}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
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
                    keyExtractor={item => item.pseudo}
                    renderItem={({item}) => (
                        <ThemedListTile
                            key={item.pseudo}
                            icon={'User'}
                            fillStyle={"none"}
                            title={item.pseudo}
                            subtitle={item.pseudo}
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

