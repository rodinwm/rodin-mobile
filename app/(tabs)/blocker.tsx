import {ScreenTemplate, SystemAppIcon, ThemedText, ThemedTextInput, ThemedView} from '@/components';
import React, {useState} from "react";
import {useRouter} from "expo-router";
import {FlatList} from "react-native";
import {SystemApp} from "@/utils/interfaces";
import {NativeBlockerAppView} from "@/components/layouts/NativeBlockerAppView";

export default function Page() {
    const router = useRouter();
    const [selectedApps, setSelectedApps] = useState<SystemApp[]>([]);
    const [searchedApp, setSearchedApp] = useState('');

    return (
        <ScreenTemplate
            title={"RodShield"}
            //takeBottomBarIntoAccount={true}
            setHeightToScreenSize={true}
            scrollEnabled={false}
        >
            <ThemedView className={'w-full flex flex-col'}>
                <ThemedText type={'default'}>Mes applications bloquées</ThemedText>
                <ThemedText type={'title'}>
                    {selectedApps.length} {selectedApps.length > 1 ? 'applications bloquées' : 'application bloquée'}
                </ThemedText>
            </ThemedView>

            <ThemedTextInput
                clearButtonMode={"while-editing"}
                placeholder={"Rechercher une application"}
                onChangeText={(text) => {
                    setSearchedApp(text);
                }}
            />

            {/* Selected app grid */}
            {selectedApps.length !== 0 && (

                <ThemedView
                    borderStyle={"opacity-20"}
                    fillStyle={"opacity-10"}
                    radiusStyle={"default"}
                    className={'w-full flex flex-col justify-center items-center'}
                    style={{minHeight: 100, maxHeight: 210}}
                >

                    <FlatList
                        data={selectedApps}
                        refreshing={false}
                        onRefresh={() => console.log('refresh')}
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                        numColumns={4}
                        className={'w-full px-5'}
                        columnWrapperStyle={{
                            justifyContent: 'flex-start',
                            gap: 16,
                        }}
                        ItemSeparatorComponent={() => (<ThemedView className={"h-5"}/>)}
                        ListHeaderComponent={() => (<ThemedView className={"h-5"}/>)}
                        ListFooterComponent={() => (<ThemedView className={"h-5"}/>)}
                        keyExtractor={(item, index) => `${item.name}-${index}`}
                        renderItem={({item}) => (
                            <SystemAppIcon
                                app={item}
                                onPress={() => {
                                    setSelectedApps((prevSelected) => {
                                        // Supprimer l’app de la liste
                                        return prevSelected.filter(app => app.name !== item.name);
                                    });
                                }}
                            />
                        )}
                    />
                </ThemedView>
            )}

            <NativeBlockerAppView/>

            {/* App list
            <ThemedView
                className={'w-full flex-1 flex flex-col justify-center items-center'}
            >
                <FlatList
                    data={SystemApps.filter(app => app.name.includes(searchedApp))}
                    refreshing={false}
                    onRefresh={() => console.log('refresh')}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    ItemSeparatorComponent={() => (<ThemedView className={"h-5"}/>)}
                    ListFooterComponent={() => (<ThemedView className={"h-16"}/>)}
                    keyExtractor={(item, index) => `${item.name}-${index}`}
                    renderItem={({item}) => (
                        <SystemAppTile
                            app={item}
                            isSelected={selectedApps.includes(item)}
                            onPress={() => {
                                AppBlockerService.block("Instagram");
                                setSelectedApps((prevSelected) => {
                                    if (selectedApps.includes(item)) {
                                        return prevSelected.filter(app => app.name !== item.name);
                                    } else {
                                        if (!prevSelected.some(app => app.name === item.name)) {
                                            return [...prevSelected, item];
                                        }
                                        return prevSelected;
                                    }
                                });
                            }}
                        />
                    )}
                />
            </ThemedView>
            */}
        </ScreenTemplate>
    );
}

