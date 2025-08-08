import {LucideIcon, ScreenTemplate, ThemedButton, ThemedText, ThemedView} from '@/components';
import React, {useEffect, useState} from "react";
import {useRouter} from "expo-router";
import {FlatList} from 'react-native';
import {useAuthUser} from "@/utils/hooks/useAuthUser";
import {communityLogService} from "@/utils/constants";
import {LogType} from "@/utils/enums";
import {ApiService} from "@/utils/services/apiService";
import {HttpStatusCode} from "axios";
import {Loader} from "@/components/layouts/Loader";
import {CommunityFeedPost} from "@/components/domain/community/CommunityFeedPost";
import {RodpicData} from "@/utils/types";

export default function Page() {
    const router = useRouter();
    const {token} = useAuthUser({});
    const [feed, setFeed] = useState<RodpicData[]>([]);
    const [isRodpicsUnlocked, setIsRodpicsUnlocked] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    const getCommunityFeed = async (token: string) => {
        setIsLoading(true);
        try {
            const response = await ApiService.getCommunityFeed(token);

            switch (response.status) {
                case HttpStatusCode.Ok:
                    communityLogService.log({
                        type: LogType.Log,
                        data: ['Community feed successfully fetched:', response.data]
                    });
                    setFeed(response.data);
                    break;
                case HttpStatusCode.NotFound:
                    communityLogService.log({
                        type: LogType.Log,
                        data: ['Community feed is empty:', response.data]
                    });
                    break;
                default:
                    communityLogService.log({
                        type: LogType.Error,
                        data: ['Error fetching community feed:', response.data]
                    });
                    break;
            }
        } catch (error) {
            communityLogService.log({
                type: LogType.Error,
                data: ['Error fetching community feed:', error]
            });
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (token) {
            getCommunityFeed(token).then();
        }
    }, [token]);

    return (
        <ScreenTemplate
            title={"Communauté"}
            takeBottomBarIntoAccount={true}
            headerRightBtn={{
                icon: "Users",
                onPress: () => router.push('/community/friends'),
            }}
        >
            {isLoading && (
                <ThemedView className={'w-full flex-1 items-center justify-center'}>
                    <Loader/>
                </ThemedView>
            )}

            {!isLoading && feed.length === 0 && (
                <ThemedView
                    className={'w-full flex-1 flex flex-col justify-center items-center gap-10'}
                >
                    <ThemedView
                        className={'w-full flex flex-col justify-center items-center gap-3'}
                    >
                        <LucideIcon name={'Sticker'} size={150}/>
                        <ThemedText type={'subtitle'}>Pas d'actu</ThemedText>
                        <ThemedText type={'default'} className={'text-center'}>
                            Vous verrez ici les rodpics de vos amis quand ils les aurons postés.
                        </ThemedText>
                    </ThemedView>

                    <ThemedButton
                        title={"Actualiser"}
                        onPress={() => getCommunityFeed(token ? token : '')}
                    />
                </ThemedView>
            )}

            {/* Feed */}
            {!isLoading && feed.length !== 0 && (
                <ThemedView className={'w-full flex flex-col gap-4'}>
                    <FlatList
                        data={feed}
                        refreshing={false}
                        onRefresh={() => console.log('refresh')}
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                        ItemSeparatorComponent={() => (
                            <ThemedView className={"py-6"}>
                                <ThemedView className={"w-full h-1"} fillStyle={"opacity-15"}/>
                            </ThemedView>
                        )}
                        keyExtractor={item => item.date.toString()}
                        renderItem={({item, index}) => (
                            <CommunityFeedPost
                                blurred={!isRodpicsUnlocked}
                                user={{
                                    pseudo: item.user.pseudo,
                                    firstname: item.user.firstname,
                                    lastname: item.user.lastname,
                                }}
                                rodpic={{
                                    firstPicUri: item.firstPic,
                                    secondPicUri: item.secondPic,
                                    date: item.date ? new Date(item.date * 1000) : new Date(),
                                }}
                            />
                        )}
                    />
                </ThemedView>
            )}
        </ScreenTemplate>
    );
}

