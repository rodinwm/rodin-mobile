import {LucideIcon, ScreenTemplate, SystemAppIcon, ThemedText, ThemedView} from '@/components';
import React, {useState} from "react";
import {useRouter} from "expo-router";
import {FlatList} from "react-native";
import {SystemApps} from "@/assets/static/system-apps";
import {SystemAppTile} from "@/components/domain/SystemAppTile";
import {SystemApp} from "@/utils/interfaces";

export default function Page() {
    const router = useRouter();
    const [selectedApps, setSelectedApps] = useState<SystemApp[]>([]);

    return (
        <ScreenTemplate
            title={"Bloqueur d'app"}
            takeBottomBarIntoAccount={true}
            setHeightToScreenSize={true}
            scrollEnabled={false}
        >
            <ThemedView className={'w-full flex flex-col'}>
                <ThemedText type={'default'}>Mes applications bloquées</ThemedText>
                <ThemedText type={'title'}>{selectedApps.length} apps bloquées</ThemedText>
            </ThemedView>

            {/* Selected app grid */}
            <ThemedView
                borderStyle={"default"}
                fillStyle={"opacity-10"}
                radiusStyle={"default"}
                className={'w-full flex flex-col justify-center items-center'}
                style={{minHeight: 100, maxHeight: 210}}
            >
                {selectedApps.length === 0 ? (
                    <ThemedView
                        paddingStyle={"default"}
                        className={'w-full gap-1 flex flex-col justify-center items-center'}
                    >
                        <LucideIcon name={'LockKeyholeOpen'} size={100}/>
                        <ThemedText type={'subtitle'} className={'text-center'}>Aucune app bloquée</ThemedText>
                        <ThemedText type={'small'} className={'text-center'}>Pensez à ajouter celles que vous voulez
                            bloquer pendant votre
                            focus</ThemedText>
                    </ThemedView>
                ) : (
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
                )}
            </ThemedView>

            {/* App list */}
            <ThemedView
                className={'w-full flex-1 flex flex-col justify-center items-center'}
            >
                <FlatList
                    data={SystemApps}
                    refreshing={false}
                    onRefresh={() => console.log('refresh')}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    ItemSeparatorComponent={() => (
                        <ThemedView className={"h-5"}/>
                    )}
                    keyExtractor={(item, index) => `${item.name}-${index}`}
                    renderItem={({item}) => (
                        <SystemAppTile
                            app={item}
                            isSelected={selectedApps.includes(item)}
                            onPress={() => {
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
        </ScreenTemplate>
    );
}

