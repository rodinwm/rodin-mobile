import {ThemedView} from '@/components/base/ThemedView';
import React, {useRef, useState} from "react";
import {ThemedButton} from "@/components/base/ThemedButton";
import ThemedListTile from "@/components/base/ThemedListTile";
import {Friends} from "@/assets/static/friends";
import PagerView from "react-native-pager-view";
import ScreenTemplate from '@/components/layouts/ScreenTemplate';

export default function Page() {
    const [page, setPage] = useState(0);
    const pagerRef = useRef<PagerView | null>(null);

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
                    miniText={true}
                    type={page === 0 ? "default" : "outlined"}
                    className={'flex-1'}
                    onPress={() => {
                        setPage(0);
                        pagerRef.current?.setPage(0);
                    }}
                />
                <ThemedButton
                    title={"Demandes Envoyées"}
                    type={page === 1 ? "default" : "outlined"}
                    miniText={true}
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
                style={{flex: 1}}
                scrollEnabled={false}
                orientation={"horizontal"}
                initialPage={page}
            >
                <ThemedView key="1" className={'w-full flex flex-col gap-2'}>
                    {Friends.map((friend) => (
                        <ThemedListTile
                            key={friend.username}
                            icon={'User'}
                            title={friend.getFullName()}
                            subtitle={friend.username}
                            suffixIcon={(
                                <ThemedView className={'flex flex-row gap-2'}>
                                    <ThemedButton
                                        title={"Accept"}
                                        icon={{name: 'Check'}}
                                        showTitle={false}
                                    />
                                    <ThemedButton
                                        title={"Decline"}
                                        icon={{name: 'X'}}
                                        showTitle={false}
                                        type={"outlined"}
                                    />
                                </ThemedView>
                            )}
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

                <ThemedView key="2" className={'w-full flex flex-col gap-2'}>
                    {Friends.map((friend) => (
                        <ThemedListTile
                            key={friend.username}
                            icon={'User'}
                            title={friend.getFullName()}
                            subtitle={friend.username}
                            suffixIcon={(
                                <ThemedView className={'flex flex-row gap-2'}>
                                    <ThemedButton
                                        title={"Decline"}
                                        icon={{name: 'Ban'}}
                                        showTitle={false}
                                        type={"outlined"}
                                    />
                                </ThemedView>
                            )}
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
            </PagerView>
        </ScreenTemplate>
    );
}

