import {AppNameTag, ScreenTemplate, ThemedButton, ThemedListTile, ThemedText, ThemedView} from '@/components';
import React, {useEffect, useState} from "react";
import {useRouter} from "expo-router";
import {AuthService} from "@/utils/services/authService";
import {useAuthUser} from '@/utils/hooks/useAuthUser';

export default function Page() {
    const {authUser} = useAuthUser({showToasts: false});
    const [previouslyLoggedIn, setPreviouslyLoggedIn] = useState(false);
    const router = useRouter();

    // Check if the user was previously logged in
    useEffect(() => {
        const checkPreviousLogin = async () => {
            const isCredentialsSaved = await AuthService.isCredentialsSaved();
            setPreviouslyLoggedIn(isCredentialsSaved && authUser !== null);
        };

        checkPreviousLogin().then();
    })

    const goToHomeScreen = () => {
        router.replace('/(tabs)');
    }

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
                {previouslyLoggedIn ? (
                    <>
                        <ThemedListTile
                            icon={'User'}
                            title={authUser ? authUser.pseudo : "Utilisateur inconnu"}
                            subtitle={"Reprendre là où vous vous êtes arrêté"}
                            fillStyle={"inversed"}
                            hasPadding={true}
                            onPress={goToHomeScreen}
                        />

                        <ThemedButton
                            title={"Utiliser un autre compte"}
                            type={"outlined"}
                            onPress={() => router.push('/(auth)/login')}
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

