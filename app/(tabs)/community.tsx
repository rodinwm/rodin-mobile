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
import {onboardingLogService} from "@/utils/constants";
import {LogType, ToastType} from "@/utils/enums";
import {ApiService} from "@/utils/services/apiService";
import {HttpStatusCode} from "axios";
import {ToastService} from "@/utils/services/toastService";
import {Loader} from "@/components/layouts/Loader";

export default function Page() {
    const router = useRouter();
    const {authUser, token} = useAuthUser({});
    const [searchedFriend, setSearchedFriend] = useState('');
    const [friends, setFriends] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const getFriendsOfUser = async (token: string, user: User) => {
        setIsLoading(true);
        try {
            const response = await ApiService.getFriendsOfUser(token, user);

            switch (response.status) {
                case HttpStatusCode.Ok:
                    onboardingLogService.log({
                        type: LogType.Log,
                        data: ['Friends successfully fetched:', response.data]
                    });
                    setFriends(response.data.data);
                    break;
                default:
                    onboardingLogService.log({
                        type: LogType.Error,
                        data: ['Error fetching friends:', response.data]
                    });
                    ToastService.show({
                        type: ToastType.Error,
                        message: `Erreur lors de la récupération des amis: ${response.data.message || 'Erreur inconnue.'}`,
                    });
                    break;
            }
        } catch (error) {
            onboardingLogService.log({
                type: LogType.Error,
                data: ['Error fetching friends:', error]
            });
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (token && authUser) {
            getFriendsOfUser(token, authUser).then();
        }
    }, []);

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
                            await openBrowserAsync("https://rodin-app.com/");
                        }
                    }}
                />
            </ThemedView>

            {isLoading && (
                <ThemedView className={'w-full flex-1 items-center justify-center'}>
                    <Loader/>
                </ThemedView>
            )}

            {!isLoading && friends.length === 0 && (
                <ThemedView
                    className={'w-full flex flex-row items-center gap-4'}
                    fillStyle={'opacity-10'}
                    paddingStyle={'small'}
                    radiusStyle={'medium'}
                >
                    <LucideIcon name={"Users"} size={24}/>
                    <ThemedText type={"default"} className={'flex-1'}>
                        Vous n'avez pas encore d'amis sur Rodin.
                    </ThemedText>
                </ThemedView>
            )}

            {/* Friends */}
            {!isLoading && friends.length !== 0 && (
                <ThemedView className={'w-full flex flex-col gap-4'}>
                    <ThemedText type={"h1"}>
                        Mes amis
                    </ThemedText>

                    <FlatList
                        data={friends.filter(friend => friend.pseudo.includes(searchedFriend))}
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
                                    <ThemedText type={"defaultExtraBold"}>{searchedFriend}</ThemedText> n'a pas été
                                    trouvé parmis vos amis.
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
            )}

            {/* Search outside friends results */}
            {searchedFriend.length >= 3 && (
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

