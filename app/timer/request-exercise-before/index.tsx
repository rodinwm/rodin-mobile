import {
    AlertCard,
    LucideIcon,
    MessageSheet,
    ScreenTemplate,
    ThemedButton,
    ThemedListTile,
    ThemedText,
    ThemedView
} from '@/components';
import React, {useState} from "react";
import {useLocalSearchParams, useRouter} from "expo-router";
import {useScreenReplacer} from "@/utils/hooks/useScreenReplacer";
import {LoadingScreen} from "@/components/layouts/LoadingScreen";
import {useAuthUser} from "@/utils/hooks/useAuthUser";

export default function Page() {
    const router = useRouter();
    const {authUser} = useAuthUser({});
    //usePrefetchRoutes(['/timer/lock-screen']); // Désactivé pour éviter le préchargement sans les paramètres requis
    const {stringWorkTime, stringBreakTime, numberOfSessions} = useLocalSearchParams();
    const {goToScreen: goToLockScreen} = useScreenReplacer({
        path: {
            pathname: '/timer/lock-screen',
            params: {stringWorkTime, stringBreakTime, numberOfSessions}
        },
        stepsToGoBack: 2,
    });
    const [isBottomSheetOpen, setIsBottomSheetOpen] = useState({
        exerciseSelection: false,
    });

    if (!authUser) {
        return <LoadingScreen/>;
    }

    return (
        <ScreenTemplate
            headerLeftBtn={"backBtn"}
            setHeightToScreenSize={true}
            scrollEnabled={false}
            bottomSheet={(
                <MessageSheet
                    title={`Choisissez un exercice de concentration`}
                    subtitle={"Les détails de chaque exercice vous serront donné sur l'écran d'après."}
                    isOpen={isBottomSheetOpen.exerciseSelection}
                    onClose={() => {
                        setIsBottomSheetOpen(prev => ({...prev, exerciseSelection: false}));
                    }}
                    children={(
                        <ThemedView className={'w-full flex flex-col gap-3 mt-3'}>
                            <ThemedListTile
                                icon={{name: 'Circle'}}
                                title={"Pod game"}
                                subtitle={"Clic sur les pods rouges et évite les autres"}
                                fillStyle={"inversed"}
                                hasPadding={true}
                                onPress={() => {
                                    router.push({
                                        pathname: '/games/pods',
                                        params: {stringWorkTime, stringBreakTime, numberOfSessions}
                                    });
                                }}
                            />
                            <ThemedListTile
                                icon={{name: 'Wind'}}
                                title={"Exercice de respiration"}
                                subtitle={"Entraine toi a réguler ta respiration"}
                                fillStyle={"inversed"}
                                hasPadding={true}
                                onPress={() => {
                                    router.push({
                                        pathname: '/games/breathing',
                                        params: {stringWorkTime, stringBreakTime, numberOfSessions}
                                    });
                                }}
                            />
                            {/*
                            <ThemedListTile
                                icon={{name: 'Shapes'}}
                                title={"Pattern"}
                                subtitle={"Mémorisez puis refaite une série de motifs"}
                                fillStyle={"inversed"}
                                hasPadding={true}
                                disabled={true}
                                onPress={() => {
                                    router.push({
                                        pathname:'/games/patterns',
                                        params: {stringWorkTime, stringBreakTime, numberOfSessions}
                                    });
                                }}
                            />
                            */}
                        </ThemedView>
                    )}
                />
            )}
        >
            {/* Message */}
            <ThemedView className={'w-full flex flex-col gap-3 justify-center items-center'}>
                <LucideIcon name={'Brain'} size={100}/>
                <ThemedText type={'subtitle'} className={"text-center"}>
                    Souhaites-tu un exercice de concentration avant de commencer ?
                </ThemedText>
            </ThemedView>


            <ThemedView className={'w-full flex flex-col gap-3'}>
                <ThemedButton
                    title={"Oui"}
                    onPress={() => {
                        setIsBottomSheetOpen(prev => ({...prev, exerciseSelection: true}));
                    }}
                />
                <ThemedButton
                    title={"Non"}
                    type={"outlined"}
                    onPress={goToLockScreen}
                />
            </ThemedView>

            {/* Conseils */}
            <AlertCard
                icon={"TriangleAlert"}
                type={"warning"}
                title={"Attention"}
                message={"Sois prêt à travailler et supprime les distractions autour de toi."}
            />
        </ScreenTemplate>
    );
}

