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
import {Href, useRouter} from "expo-router";

export default function Page() {
    const router = useRouter();
    const [isBottomSheetOpen, setIsBottomSheetOpen] = useState({
        exerciseSelection: false,
    });

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
                        setIsBottomSheetOpen(prevState => ({...prevState, exerciseSelection: false}));
                    }}
                    children={(
                        <ThemedView className={'w-full flex flex-col gap-3 mt-3'}>
                            <ThemedListTile
                                icon={'Circle'}
                                title={"Pod game"}
                                subtitle={"Clic sur les pods rouges et évite les autres"}
                                fillStyle={"inversed"}
                                hasPadding={true}
                                onPress={() => {
                                    router.push('/games/pods');
                                }}
                            />
                            <ThemedListTile
                                icon={'Wind'}
                                title={"Exercice de respiration"}
                                subtitle={"Entraine toi a réguler ta respiration"}
                                fillStyle={"inversed"}
                                hasPadding={true}
                                onPress={() => {
                                    router.push('/games/respiration');
                                }}
                            />
                            <ThemedListTile
                                icon={'Shapes'}
                                title={"Pattern"}
                                subtitle={"Mémorisez puis refaite une série de motifs"}
                                fillStyle={"inversed"}
                                hasPadding={true}
                                //disabled={true}
                                onPress={() => {
                                    router.push('/games/patterns');
                                }}
                            />
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
                        const gameRoutes: Href[] = [
                            '/games/pods',
                            '/games/respiration',
                        ];
                        setIsBottomSheetOpen(prevState => ({...prevState, exerciseSelection: true}));
                        //router.push(gameRoutes[0]);
                    }}
                />
                <ThemedButton
                    title={"Non"}
                    type={"outlined"}
                    onPress={() => router.push('/timer/lock-screen')}
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

