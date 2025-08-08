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
import {openBrowserAsync} from "expo-web-browser";
import {User} from "@rodinwm/rodin-models/frontend";
import {useAuthUser} from "@/utils/hooks/useAuthUser";
import {communityLogService} from "@/utils/constants";
import {LogType, ToastType} from "@/utils/enums";
import {ApiService} from "@/utils/services/apiService";
import {HttpStatusCode} from "axios";
import {ToastService} from "@/utils/services/toastService";
import {Loader} from "@/components/layouts/Loader";
import {FriendData, FriendshipData} from "@/utils/types";
import {FriendStatus} from "@/utils/models/model.enums";

export default function Page() {
    const router = useRouter();
    const {authUser, token} = useAuthUser({});
    const [searchedFriend, setSearchedFriend] = useState('');
    const [friendships, setFriendships] = useState<FriendshipData[]>([]);
    const [searchedFriends, setSearchedFriends] = useState<FriendData[]>([]);
    const [isLoading, setIsLoading] = useState({
        searchInMyFriends: false,
        searchInCommunity: false,
        sendFriendRequest: false,
        removeFriend: false,
        respondToFriendRequest: false,
    });

    const getFriendshipsOfUser = async (token: string, user: User) => {
        setIsLoading(prev => ({...prev, searchInMyFriends: true}));
        try {
            const response = await ApiService.getFriendshipsOfUser(token, user);

            switch (response.status) {
                case HttpStatusCode.Ok:
                    communityLogService.log({
                        type: LogType.Log,
                        data: ['Friends successfully fetched:', response.data]
                    });
                    setFriendships(response.data.data);
                    break;
                default:
                    communityLogService.log({
                        type: LogType.Error,
                        data: ['Error fetching friends:', response.data]
                    });
                    break;
            }
        } catch (error) {
            communityLogService.log({
                type: LogType.Error,
                data: ['Error fetching friends:', error]
            });
        } finally {
            setIsLoading(prev => ({...prev, searchInMyFriends: false}));
        }
    };

    const searchFriends = async (token: string, query: string) => {
        setIsLoading(prev => ({...prev, searchInCommunity: true}));

        try {
            const response = await ApiService.searchFriends(token, query);

            switch (response.status) {
                case HttpStatusCode.Ok:
                    communityLogService.log({
                        type: LogType.Log,
                        data: ['Friends successfully search:', response.data]
                    });
                    setSearchedFriends(response.data);
                    break;
                default:
                    communityLogService.log({
                        type: LogType.Error,
                        data: ['Error searching friends:', response.data]
                    });
                    break;
            }
        } catch (error) {
            communityLogService.log({
                type: LogType.Error,
                data: ['Error searching friends:', error]
            });
        } finally {
            setIsLoading(prev => ({...prev, searchInCommunity: false}));
        }
    };

    const sendFriendRequest = async (token: string, friend: FriendData) => {
        setIsLoading(prev => ({...prev, sendFriendRequest: true}));

        try {
            const response = await ApiService.sendFriendRequest(token, {friendId: friend.id});

            switch (response.status) {
                case HttpStatusCode.Created:
                    communityLogService.log({
                        type: LogType.Log,
                        data: ['Friend request successfully sent:', response.data]
                    });
                    ToastService.show({
                        type: ToastType.Success,
                        message: `Demande d'ami envoyée à ${friend.pseudo}.`,
                    });
                    // Refresh the list of searched friends
                    searchFriends(token, searchedFriend).then();
                    break;
                case HttpStatusCode.Conflict:
                    communityLogService.log({
                        type: LogType.Log,
                        data: ['Friend already sent:', response.data]
                    });
                    ToastService.show({
                        type: ToastType.Info,
                        message: `Vous avez déjà envoyé une demande d'ami à ${friend.pseudo}.`,
                    });
                    break;
                default:
                    communityLogService.log({
                        type: LogType.Error,
                        data: ['Error sending friend request:', response.data]
                    });
                    ToastService.show({
                        type: ToastType.Error,
                        message: `Erreur lors de l'ajout d'un ami. Veuillez réessayer plus tard.`,
                    });
                    break;
            }
        } catch (error) {
            communityLogService.log({
                type: LogType.Error,
                data: ['Error searching friends:', error]
            });
        } finally {
            setIsLoading(prev => ({...prev, sendFriendRequest: false}));
        }
    };

    const removeFriend = async (token: string, friend: FriendData) => {
        setIsLoading(prev => ({...prev, removeFriend: true}));

        try {
            const response = await ApiService.removeFriend(token, {friendId: friend.id});

            switch (response.status) {
                case HttpStatusCode.Ok:
                    communityLogService.log({
                        type: LogType.Log,
                        data: ['Friend removed successfully:', response.data]
                    });
                    ToastService.show({
                        type: ToastType.Success,
                        message: `${friend.pseudo} a été retiré de vos amis.`,
                    });
                    // Refresh the list of friends and searched friends
                    getFriendshipsOfUser(token, authUser!).then();
                    searchFriends(token, searchedFriend).then();
                    break;
                default:
                    communityLogService.log({
                        type: LogType.Error,
                        data: ['Error when removind friend:', response.data]
                    });
                    ToastService.show({
                        type: ToastType.Error,
                        message: `Erreur du retrait de votre ami. Veuillez réessayer plus tard.`,
                    });
                    break;
            }
        } catch (error) {
            communityLogService.log({
                type: LogType.Error,
                data: ['Error when removing friends:', error]
            });
        } finally {
            setIsLoading(prev => ({...prev, removeFriend: false}));
        }
    };

    const respondToFriendRequest = async (token: string, friendshipId: string, status: FriendStatus) => {
        setIsLoading(prev => ({...prev, respondToFriendRequest: true}));

        try {
            const response = await ApiService.respondToFriendRequest(token, {
                friendshipId: friendshipId,
                status: status
            });

            switch (response.status) {
                case HttpStatusCode.Ok:
                    communityLogService.log({
                        type: LogType.Log,
                        data: [`Friend request responded with ${status}:`, response.data]
                    });
                    // Refresh the list of friends and searched friends
                    getFriendshipsOfUser(token, authUser!).then();
                    searchFriends(token, searchedFriend).then();
                    break;
                default:
                    communityLogService.log({
                        type: LogType.Error,
                        data: ['Error when responding to friend request:', response.data]
                    });
                    break;
            }
        } catch (error) {
            communityLogService.log({
                type: LogType.Error,
                data: ['Error when responding to friend request:', error]
            });
        } finally {
            setIsLoading(prev => ({...prev, respondToFriendRequest: false}));
        }
    };

    useEffect(() => {
        if (token && authUser) {
            getFriendshipsOfUser(token, authUser).then();
        }
    }, [token, authUser]);

    useEffect(() => {
        if (token && searchedFriend.length >= 3) {
            searchFriends(token, searchedFriend).then();
        }
    }, [token && searchedFriend]);

    return (
        <ScreenTemplate
            title={"Mes amis"}
            headerLeftBtn={"backBtn"}
            headerRightBtn={{
                icon: "UserPlus",
                onPress: () => router.push('/community/friends/requests'),
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

            {isLoading.searchInCommunity || isLoading.searchInMyFriends && (
                <ThemedView className={'w-full flex-1 items-center justify-center'}>
                    <Loader/>
                </ThemedView>
            )}

            {/* Friends */}
            {!isLoading.searchInMyFriends && (
                <ThemedView className={'w-full flex flex-col gap-4'}>
                    <ThemedText type={"h1"}>
                        Mes amis
                    </ThemedText>

                    {searchedFriend.length >= 3 && friendships.length != 0 && friendships.filter(friendship => {
                        return friendship.user.id !== authUser?.id ?
                            friendship.friend.pseudo.toLowerCase().includes(searchedFriend.toLowerCase()) : friendship.user.pseudo.toLowerCase().includes(searchedFriend.toLowerCase());
                    }).length === 0 && (
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

                    {friendships.length === 0 ? (
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
                    ) : (
                        <FlatList
                            data={friendships.filter(friendship => {
                                return friendship.user.id !== authUser?.id ?
                                    friendship.friend.pseudo.toLowerCase().includes(searchedFriend.toLowerCase()) : friendship.user.pseudo.toLowerCase().includes(searchedFriend.toLowerCase());
                            })}
                            refreshing={false}
                            onRefresh={() => console.log('refresh')}
                            showsHorizontalScrollIndicator={false}
                            showsVerticalScrollIndicator={false}
                            ItemSeparatorComponent={() => (
                                <ThemedView className={"h-5"}/>
                            )}
                            keyExtractor={item => item.id}
                            renderItem={({item}) => {
                                const friend = item.user.id === authUser?.id ? item.friend : item.user;
                                return (
                                    <ThemedListTile
                                        key={friend.id}
                                        icon={'User'}
                                        fillStyle={"none"}
                                        title={friend.firstname + ' ' + friend.lastname}
                                        subtitle={friend.pseudo}
                                        suffixIcon={(
                                            <ThemedView className={'flex flex-row gap-2'}>
                                                {item.status === FriendStatus.PENDING && item.user.id === authUser!.id && (
                                                    <ThemedButton
                                                        title={"Demande envoyée"}
                                                        disabled={true}
                                                        textSize={"miniExtraBold"}
                                                        paddingStyle={"small"}
                                                        type={"opacity-25"}
                                                    />
                                                )}
                                                {item.status === FriendStatus.PENDING && item.friend.id === authUser!.id && (
                                                    <>
                                                        <ThemedButton
                                                            title={"Accepter"}
                                                            textSize={"miniExtraBold"}
                                                            paddingStyle={"small"}
                                                            type={"opacity-25"}
                                                            onPress={() => respondToFriendRequest(token!, item.id, FriendStatus.ACCEPTED)}
                                                        />
                                                        <ThemedButton
                                                            title={"Refuser"}
                                                            icon={{name: 'Ban'}}
                                                            showTitle={false}
                                                            textSize={"miniExtraBold"}
                                                            paddingStyle={"none"}
                                                            type={"no-fill"}
                                                            onPress={() => respondToFriendRequest(token!, item.id, FriendStatus.REJECTED)}
                                                        />
                                                    </>
                                                )}
                                                {item.status === FriendStatus.ACCEPTED && (
                                                    <ThemedButton
                                                        title={"Remove"}
                                                        icon={{name: 'X'}}
                                                        paddingStyle={"none"}
                                                        showTitle={false}
                                                        type={"no-fill"}
                                                        onPress={() => removeFriend(token!, friend)}
                                                    />
                                                )}
                                            </ThemedView>
                                        )}
                                    />
                                );
                            }}
                        />
                    )}
                </ThemedView>
            )}

            {/* Search outside friends results */}
            {!isLoading.searchInCommunity && searchedFriend.length >= 3 && (
                <ThemedView className={'w-full flex flex-col gap-4'}>
                    <ThemedText type={"h1"}>
                        Rechercher des amis
                    </ThemedText>

                    {searchedFriends.length === 0 ? (
                        <ThemedView
                            className={'w-full flex flex-row items-center gap-4'}
                            fillStyle={'opacity-10'}
                            paddingStyle={'small'}
                            radiusStyle={'medium'}
                        >
                            <LucideIcon name={"SearchX"} size={24}/>
                            <ThemedText type={"default"} className={'flex-1'}>
                                Aucun utilisateur ne correspond à votre recherche.
                            </ThemedText>
                        </ThemedView>
                    ) : (
                        <FlatList
                            data={searchedFriends}
                            refreshing={false}
                            onRefresh={() => console.log('refresh')}
                            showsHorizontalScrollIndicator={false}
                            showsVerticalScrollIndicator={false}
                            ItemSeparatorComponent={() => (
                                <ThemedView className={"h-5"}/>
                            )}
                            keyExtractor={item => item.pseudo}
                            renderItem={({item}) => (
                                <ThemedListTile
                                    key={item.pseudo}
                                    icon={'User'}
                                    fillStyle={"none"}
                                    title={item.firstname + ' ' + item.lastname}
                                    subtitle={item.pseudo}
                                    suffixIcon={(
                                        <ThemedView className={'flex flex-row gap-2'}>
                                            <ThemedButton
                                                title={"Ajouter"}
                                                textSize={"miniExtraBold"}
                                                paddingStyle={"small"}
                                                type={"opacity-25"}
                                                onPress={() => sendFriendRequest(token!, item)}
                                            />
                                        </ThemedView>
                                    )}
                                />
                            )}
                        />
                    )}
                </ThemedView>
            )}
        </ScreenTemplate>
    );
}

