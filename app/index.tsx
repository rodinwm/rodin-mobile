import {
    AppNameTag,
    MessageSheet,
    ScreenTemplate,
    ThemedButton,
    ThemedListTile,
    ThemedText,
    ThemedView
} from '@/components';
import React, {useEffect, useState} from "react";
import {useRouter} from "expo-router";
import {AuthService} from "@/utils/services/authService";
import {useAuthUser} from '@/utils/hooks/useAuthUser';
import {onboardingLogService} from "@/utils/constants";
import {LogType, ToastType} from "@/utils/enums";
import {ToastService} from "@/utils/services/toastService";
import {Loader} from "@/components/layouts/Loader";
import {useScreenReplacer} from "@/utils/hooks/useScreenReplacer";

export default function Page() {
    const {authUser} = useAuthUser({showToasts: false});
    const router = useRouter();
    const {goToScreen: goToHomeScreen} = useScreenReplacer({
        path: '/(tabs)',
    });
    const [previouslyLoggedIn, setPreviouslyLoggedIn] = useState(false);
    const [isBottomSheetOpen, setIsBottomSheetOpen] = useState({
        resumeSession: false,
    });

    // Check if the user was previously logged in
    useEffect(() => {
        const checkPreviousLogin = async () => {
            const isCredentialsSaved = await AuthService.isCredentialsSaved();
            setPreviouslyLoggedIn(isCredentialsSaved && authUser !== null);
        };

        checkPreviousLogin().then();
    }, [authUser]);

    const resumeSession = async () => {
        setIsBottomSheetOpen(prev => ({...prev, resumeSession: true}));

        const isSessionResumed = await AuthService.resumeSession();

        if (isSessionResumed) {
            ToastService.show({
                type: ToastType.Success,
                message: 'Bon retour parmi nous !',
            });
            goToHomeScreen();
        } else {
            setPreviouslyLoggedIn(false);
            onboardingLogService.log({
                type: LogType.Error,
                data: ['Failed to resume session.']
            });
            ToastService.show({
                type: ToastType.Error,
                message: "Une erreur est survenue lors de la reprise de votre session. Veuillez vous reconnecter s'il vous plait.",
            });
        }

        setIsBottomSheetOpen(prev => ({...prev, resumeSession: false}));
    };

    return (
        <ScreenTemplate
            scrollEnabled={false}
            setHeightToScreenSize={true}
            bottomSheet={(
                <>
                    <MessageSheet
                        title={"Reprise de session"}
                        subtitle={"Patientez pendant que nous reprenons votre session."}
                        isOpen={isBottomSheetOpen.resumeSession}
                        closeOnTapOutside={false}
                        onClose={() => {
                            setIsBottomSheetOpen(prev => ({...prev, resumeSession: false}));
                        }}
                        children={(
                            <ThemedView paddingStyle={'default'}>
                                <Loader/>
                            </ThemedView>
                        )}
                    />
                </>
            )}
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
                            subtitle={"Reprennez là où vous vous êtes arrêté"}
                            fillStyle={"inversed"}
                            hasPadding={true}
                            onPress={() => resumeSession()}
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

