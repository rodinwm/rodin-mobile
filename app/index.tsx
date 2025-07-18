import {AppNameTag, ScreenTemplate, ThemedButton, ThemedListTile, ThemedText, ThemedView} from '@/components';
import React, {useState} from "react";
import {useRouter} from "expo-router";

export default function Page() {
    const [alreadyLoggedIn, setAlreadyLoggedIn] = useState(false);
    const router = useRouter();

    return (
        <ScreenTemplate
            scrollEnabled={false}
            setHeightToScreenSize={true}
        >
            {/* Logo section */}
            <ThemedView className={'w-full flex flex-col justify-center items-center'}>
                <ThemedText type={"logo"}>
                    Rodin
                </ThemedText>
                <ThemedText type={'small'} className={"text-center opacity-50"}>
                    Le partenaire de concentration conçu pour vous aider à rester focus sur vos tâches.
                </ThemedText>
            </ThemedView>

            <ThemedView className={'w-full flex flex-col gap-3'}>
                {alreadyLoggedIn ? (
                    <>
                        <ThemedListTile
                            icon={'User'}
                            title={"mvxence"}
                            subtitle={"Reprendre là où vous vous êtes arrêté"}
                            fillStyle={"inversed"}
                            onPress={() => {
                                console.log('/timer')
                            }}
                        />
                        <ThemedButton
                            title={"Utiliser un autre compte"}
                            type={"outlined"}
                            onPress={() => console.log('/timer')}
                        />
                    </>
                ) : (
                    <>
                        <ThemedButton
                            title={"Commencer l'aventure"}
                            onPress={() => router.push('/(auth)/onboarding')}
                        />
                        <ThemedButton
                            title={"J'ai déjà un compte"}
                            type={"outlined"}
                            onPress={() => router.push('/(auth)/login')}
                        />
                    </>
                )}
            </ThemedView>

            <AppNameTag/>
        </ScreenTemplate>
    );
}

