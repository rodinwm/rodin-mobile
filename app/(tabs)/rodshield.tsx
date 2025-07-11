import {LucideIcon, ScreenTemplate, ThemedButton, ThemedText, ThemedView} from '@/components';
import React, {useEffect, useState} from "react";
import {IOSAppBlockerView} from "@/components/domain/appBlocker/IOSAppBlockerView";
import {AppBlockerService} from "@/utils/services/appBlockerService";
import {Platform} from "react-native";
import {AndroidAppBlockerView} from "@/components/domain/appBlocker/AndroidAppBlockerView";

export default function Page() {
    const [isAppBlockerInit, setIsAppBlockerInit] = useState(AppBlockerService.isInit());

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
            {Platform.OS === 'ios' && (
                <IOSAppBlockerView/>
            )}

            {Platform.OS === 'android' && (
                <AndroidAppBlockerView/>
            )}
        </ScreenTemplate>
    );
}

