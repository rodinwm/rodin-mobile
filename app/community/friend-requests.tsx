import {ThemedText} from '@/components/base/ThemedText';
import {ThemedView} from '@/components/base/ThemedView';
import React, {useRef, useState} from "react";
import {ThemedButton} from "@/components/base/ThemedButton";
import {SafeAreaView} from "react-native-safe-area-context";
import {useNavigation, useRouter} from "expo-router";
import {ScrollView} from 'react-native';
import ThemedListTile from "@/components/base/ThemedListTile";
import {Friends} from "@/assets/static/friends";
import {HeaderSpacer} from "@/components/HeaderSpacer";
import PagerView from "react-native-pager-view";

export default function Page() {
    const router = useRouter();
    const navigation = useNavigation();
    const [page, setPage] = useState(0);
    const pagerRef = useRef<PagerView | null>(null);

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
                            Demandes d'amis
                        </ThemedText>

                        <HeaderSpacer/>
                    </ThemedView>

                    {/* Tabs */}
                    <ThemedView
                        //outlined={true}
                        //paddingStyle={"mini"}
                        radiusStyle={"default"}
                        //fillStyle={"opacity-15"}
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
                </SafeAreaView>
            </ScrollView>
        </ThemedView>
    );
}

