import {
    LucideIcon,
    ScreenTemplate,
    ThemedButton,
    ThemedListTile,
    ThemedText,
    ThemedTextInput,
    ThemedView
} from '@/components';
import React, {useEffect, useState} from "react";
import {useRouter} from "expo-router";
import {FlatList, Platform} from 'react-native';
import {Friends} from "@/assets/static/friends";
import {openBrowserAsync} from "expo-web-browser";
import {User} from "@rodinwm/rodin-models/frontend";
import {useAuthUser} from "@/utils/hooks/useAuthUser";

export default function Page() {
    const router = useRouter();
    const {authUser} = useAuthUser({});
    const [searchedFriend, setSearchedFriend] = useState('');
    const [friends, setFriends] = useState<User[]>(Friends.filter(friend => friend.pseudo.includes(searchedFriend)));

    // Update friend list on search
    useEffect(() => {
        setFriends(Friends.filter(friend => friend.pseudo.includes(searchedFriend)));
    }, [searchedFriend]);

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
                    subtitle={authUser ? `rodin-app.com/${authUser.pseudo}` : 'rodin-app.com'}
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
                    data={friends}
                    refreshing={false}
                    onRefresh={() => console.log('refresh')}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    ItemSeparatorComponent={() => (
                        <ThemedView className={"h-5"}/>
                    )}
                    ListFooterComponent={() => friends.length > 0 ? (
                        <ThemedView className={'w-full mt-14'}>
                            <ThemedButton
                                title={"Voir plus"}
                                onPress={() => console.log("Voir plus")}
                            />
                        </ThemedView>
                    ) : (
                        <ThemedView
                            className={'w-full flex flex-row items-center gap-4'}
                            fillStyle={'opacity-10'}
                            paddingStyle={'small'}
                            radiusStyle={'medium'}
                        >
                            <LucideIcon name={"SearchX"}/>
                            <ThemedText type={"default"} className={'flex-1'}>
                                <ThemedText type={"defaultExtraBold"}>{searchedFriend}</ThemedText> n'a pas été trouvé
                                parmis vos amis.
                            </ThemedText>
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

            {/* Search outside friends results */}
            {friends.length === 0 && (
                <ThemedView className={'w-full flex flex-col gap-4'}>
                    <ThemedText type={"h1"}>
                        Rechercher des amis
                    </ThemedText>

                    <FlatList
                        data={Friends}
                        refreshing={false}
                        onRefresh={() => console.log('refresh')}
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                        ItemSeparatorComponent={() => (
                            <ThemedView className={"h-5"}/>
                        )}
                        ListFooterComponent={() => friends.length > 0 && (
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
                                            title={"Ajouter"}
                                            textSize={"miniExtraBold"}
                                            paddingStyle={"small"}
                                            type={"opacity-25"}
                                        />
                                    </ThemedView>
                                )}
                            />
                        )}
                    />
                </ThemedView>
            )}
        </ScreenTemplate>
    );
}

