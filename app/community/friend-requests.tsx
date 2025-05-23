import {ScreenTemplate, ThemedButton, ThemedListTile, ThemedView} from '@/components';
import React, {useRef, useState} from "react";
import {Friends} from "@/assets/static/friends";
import PagerView from "react-native-pager-view";
import {FlatList} from "react-native";

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
                                title={item.getFullName()}
                                subtitle={item.username}
                                fillStyle={"none"}
                                suffixIcon={(
                                    <ThemedView className={'flex flex-row items-center gap-3'}>
                                        <ThemedButton
                                            title={"Accepter"}
                                            textSize={"miniExtraBold"}
                                            paddingStyle={"small"}
                                            type={"opacity-25"}
                                        />
                                        <ThemedButton
                                            title={"Decline"}
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

                <ThemedView key="2" className={'w-full flex flex-col gap-2'}>
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
                                            title={"Decline"}
                                            icon={{name: 'Ban'}}
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
            </PagerView>
        </ScreenTemplate>
    );
}

