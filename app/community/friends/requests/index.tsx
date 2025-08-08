import {LucideIcon, ScreenTemplate, ThemedButton, ThemedListTile, ThemedText, ThemedView} from '@/components';
import React, {useEffect, useRef, useState} from "react";
import PagerView from "react-native-pager-view";
import {FlatList} from "react-native";
import {FriendshipData} from "@/utils/types";
import {User} from "@rodinwm/rodin-models/frontend";
import {ApiService} from "@/utils/services/apiService";
import {HttpStatusCode} from "axios";
import {communityLogService} from "@/utils/constants";
import {LogType, ToastType} from "@/utils/enums";
import {FriendStatus} from "@/utils/models/model.enums";
import {useAuthUser} from "@/utils/hooks/useAuthUser";
import {ToastService} from "@/utils/services/toastService";

export default function Page() {
    const pagerRef = useRef<PagerView | null>(null);
    const {authUser, token} = useAuthUser({});
    const [page, setPage] = useState(0);
    const [receivedFriendships, setReceivedFriendships] = useState<FriendshipData[]>([]);
    const [sendedFriendships, setSendedFriendships] = useState<FriendshipData[]>([]);
    const [isLoading, setIsLoading] = useState({
        getFriendshipsOfUser: false,
        respondToFriendRequest: false,
    });

    const getFriendshipsOfUser = async (token: string, user: User) => {
        setIsLoading(prev => ({...prev, getFriendshipsOfUser: true}));
        try {
            const response = await ApiService.getFriendshipsOfUser(token, user);

            switch (response.status) {
                case HttpStatusCode.Ok:
                    communityLogService.log({
                        type: LogType.Log,
                        data: ['Friends successfully fetched:', response.data]
                    });
                    setReceivedFriendships(response.data.data.filter((friendship: FriendshipData) => friendship.status === FriendStatus.PENDING && friendship.user.id !== authUser?.id));
                    setSendedFriendships(response.data.data.filter((friendship: FriendshipData) => friendship.status === FriendStatus.PENDING && friendship.user.id === authUser?.id));
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
            setIsLoading(prev => ({...prev, getFriendshipsOfUser: false}));
        }
    };

    const respondToFriendRequest = async (token: string, friendship: FriendshipData, status: FriendStatus) => {
        setIsLoading(prev => ({...prev, respondToFriendRequest: true}));

        try {
            const response = await ApiService.respondToFriendRequest(token, {
                id: friendship.id,
                status: status
            });

            switch (response.status) {
                case HttpStatusCode.Ok:
                    communityLogService.log({
                        type: LogType.Log,
                        data: [`Friend request responded with ${status}:`, response.data]
                    });
                    ToastService.show({
                        type: ToastType.Success,
                        message: `Vous avez ${status === FriendStatus.REJECTED ? "refusé" : 'accepté'} la demande d'ami de ${friendship.user.pseudo}.`,
                    });
                    // Refresh the list of friends and searched friends
                    getFriendshipsOfUser(token, authUser!).then();
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

    return (
        <ScreenTemplate
            title={"Demandes d'amis"}
            headerLeftBtn={"backBtn"}
        >
            {/* Tabs */}
            <ThemedView
                className={'w-full flex flex-row gap-2 items-center'}
            >
                <ThemedButton
                    title={"Demandes reçues"}
                    textSize={"miniExtraBold"}
                    type={page === 0 ? "default" : "no-fill"}
                    className={'flex-1'}
                    onPress={() => {
                        setPage(0);
                        pagerRef.current?.setPage(0);
                    }}
                />
                <ThemedButton
                    title={"Demandes Envoyées"}
                    type={page === 1 ? "default" : "no-fill"}
                    textSize={"miniExtraBold"}
                    className={'flex-1'}
                    onPress={() => {
                        setPage(1);
                        pagerRef.current?.setPage(1);
                    }}
                />
            </ThemedView>

            {/* Friends */}
            <PagerView
                ref={pagerRef}
                initialPage={0}
                style={{flex: 1}}
                pageMargin={10}
                overdrag={true}
                scrollEnabled={true}
                orientation={"horizontal"}
                onPageSelected={(e) => setPage(e.nativeEvent.position)}
            >
                <ThemedView key="1" className={'w-full flex flex-col gap-2'}>
                    {receivedFriendships.length === 0 ? (
                        <ThemedView
                            className={'w-full flex flex-row items-center gap-4'}
                            fillStyle={'opacity-10'}
                            paddingStyle={'small'}
                            radiusStyle={'medium'}
                        >
                            <LucideIcon name={"Users"} size={24}/>
                            <ThemedText type={"default"} className={'flex-1'}>
                                Vous n'avez pas reçu de demande d'ami.
                            </ThemedText>
                        </ThemedView>
                    ) : (
                        <FlatList
                            data={receivedFriendships}
                            refreshing={false}
                            onRefresh={() => console.log('refresh')}
                            ItemSeparatorComponent={() => (
                                <ThemedView className={"h-5"}/>
                            )}
                            showsHorizontalScrollIndicator={false}
                            showsVerticalScrollIndicator={false}
                            keyExtractor={item => item.id}
                            renderItem={({item}) => (
                                <ThemedListTile
                                    key={item.user.id}
                                    icon={'User'}
                                    title={item.user.firstname + ' ' + item.user.lastname}
                                    subtitle={item.user.pseudo}
                                    fillStyle={"none"}
                                    suffixIcon={(
                                        <ThemedView className={'flex flex-row items-center gap-3'}>
                                            <ThemedButton
                                                title={"Accepter"}
                                                textSize={"miniExtraBold"}
                                                paddingStyle={"small"}
                                                type={"opacity-25"}
                                                onPress={() => respondToFriendRequest(token!, item, FriendStatus.ACCEPTED)}
                                            />
                                            <ThemedButton
                                                title={"Refuser"}
                                                icon={{name: 'Ban'}}
                                                showTitle={false}
                                                textSize={"miniExtraBold"}
                                                paddingStyle={"none"}
                                                type={"no-fill"}
                                                onPress={() => respondToFriendRequest(token!, item, FriendStatus.REJECTED)}
                                            />
                                        </ThemedView>
                                    )}
                                />
                            )}
                        />
                    )}
                </ThemedView>

                <ThemedView key="2" className={'w-full flex flex-col gap-2'}>
                    {sendedFriendships.length === 0 ? (
                        <ThemedView
                            className={'w-full flex flex-row items-center gap-4'}
                            fillStyle={'opacity-10'}
                            paddingStyle={'small'}
                            radiusStyle={'medium'}
                        >
                            <LucideIcon name={"Users"} size={24}/>
                            <ThemedText type={"default"} className={'flex-1'}>
                                Vous n'avez pas envoyé de demande d'ami.
                            </ThemedText>
                        </ThemedView>
                    ) : (
                        <FlatList
                            data={sendedFriendships}
                            refreshing={false}
                            onRefresh={() => console.log('refresh')}
                            ItemSeparatorComponent={() => (
                                <ThemedView className={"h-5"}/>
                            )}
                            showsHorizontalScrollIndicator={false}
                            showsVerticalScrollIndicator={false}
                            keyExtractor={item => item.id}
                            renderItem={({item}) => (
                                <ThemedListTile
                                    key={item.friend.id}
                                    icon={'User'}
                                    fillStyle={"none"}
                                    title={item.friend.firstname + ' ' + item.friend.lastname}
                                    subtitle={item.friend.pseudo}
                                    suffixIcon={(
                                        <ThemedView className={'flex flex-row gap-2'}>
                                            <ThemedButton
                                                title={"En attente"}
                                                disabled={true}
                                                type={"opacity-25"}
                                                textSize={"miniExtraBold"}
                                                paddingStyle={"small"}
                                            />
                                        </ThemedView>
                                    )}
                                />
                            )}
                        />
                    )}
                </ThemedView>
            </PagerView>
        </ScreenTemplate>
    );
}

