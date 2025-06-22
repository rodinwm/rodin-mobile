import {
    LucideIcon,
    ScreenTemplate,
    SystemAppIcon,
    ThemedButton,
    ThemedText,
    ThemedTextInput,
    ThemedView
} from '@/components';
import React, {useState, useEffect} from "react";
import {useRouter} from "expo-router";
import {FlatList} from "react-native";
import {SystemApp} from "@/utils/interfaces";
import {NativeAppBlockerView} from "@/components/layouts/NativeAppBlockerView";
import {AppBlockerService} from "@/utils/services/appBlockerService";

export default function Page() {
    const router = useRouter();
    const [selectedApps, setSelectedApps] = useState<SystemApp[]>([]);
    const [isAppBlockerInit, setIsAppBlockerInit] = useState(AppBlockerService.isInit());
    const [searchedApp, setSearchedApp] = useState('');

    const initAppBlocker = () => {
        AppBlockerService.init().then((isInit) => setIsAppBlockerInit(isInit));
    };

    useEffect(() => {
        initAppBlocker();
    }, []);

    return !isAppBlockerInit ? (
        <ScreenTemplate
            title={"RodShield"}
            takeBottomBarIntoAccount={true}
            setHeightToScreenSize={true}
            scrollEnabled={false}
        >
            <ThemedView
                className={'w-full flex-1 flex flex-col justify-center items-center gap-10'}
            >
                <ThemedView
                    className={'w-full flex flex-col justify-center items-center gap-3'}
                >
                    <LucideIcon name={'ShieldOff'} size={150}/>
                    <ThemedText type={'subtitle'}>Bloqueur d'app désactivé</ThemedText>
                    <ThemedText type={'default'} className={'text-center'}>
                        Nous avons besoin de votre accord pour configurer le bloqueur d'applications
                    </ThemedText>
                </ThemedView>

                <ThemedButton
                    title={"Demander l'autorisation"}
                    onPress={initAppBlocker}
                />
            </ThemedView>
        </ScreenTemplate>
    ) : (
        <ScreenTemplate
            title={"RodShield"}
            setHeightToScreenSize={true}
            scrollEnabled={false}
            removeBodyPadding={true}
        >
            <NativeAppBlockerView/>
        </ScreenTemplate>
    );
}

