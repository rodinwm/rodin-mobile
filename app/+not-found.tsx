import {useRouter} from 'expo-router';
import {LucideIcon, ScreenTemplate, ThemedButton, ThemedText, ThemedView} from '@/components';
import React from "react";

export default function NotFoundScreen() {
    const router = useRouter();

    return (
        <ScreenTemplate
            title={"Rodin"}
            headerLeftBtn={"backBtn"}
            setHeightToScreenSize={true}
            scrollEnabled={false}
        >
            <ThemedView
                className={'w-full flex-1 flex flex-col justify-center items-center gap-10'}
            >
                <ThemedView
                    className={'w-full flex flex-col justify-center items-center gap-3'}
                >
                    <LucideIcon name={'Ban'} size={150}/>
                    <ThemedText type={'subtitle'}>Ecran non trouvé</ThemedText>
                    <ThemedText type={'default'} className={'text-center'}>
                        L'écran auquel vous tentez d'accéder n'existe pas ou a été déplacé
                    </ThemedText>
                </ThemedView>

                <ThemedButton
                    title={"Revenir en arrière"}
                    disabled={!router.canGoBack()}
                    onPress={() => router.back()}
                />
            </ThemedView>
        </ScreenTemplate>
    );
}