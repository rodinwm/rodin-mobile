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
import {useColorScheme} from "@/utils/hooks";
import {loginLogService, onboardingLogService} from "@/utils/constants";
import {LogType, ToastType} from "@/utils/enums";
import {ApiService} from "@/utils/services/apiService";
import {HttpStatusCode} from "axios";
import {ToastService} from "@/utils/services/toastService";
import {User} from "@rodinwm/rodin-models/frontend";
import {Loader} from "@/components/layouts/Loader";

export default function Page() {
    const {authUser, token} = useAuthUser({showToasts: false});
    const colorScheme = useColorScheme();
    const router = useRouter();
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
    })

    const goToHomeScreen = () => {
        router.replace('/(tabs)');
    }

    const resumeSession = async (token: string) => {
        loginLogService.log({
            type: LogType.Log,
            data: ['Stored user data:', authUser],
        });

        setIsBottomSheetOpen(prev => ({...prev, resumeSession: true}));

        try {
            const response = await ApiService.getUser(token);

            switch (response.status) {
                case HttpStatusCode.Ok:
                    await AuthService.saveCredentials(token, response.data.user as User);

                    onboardingLogService.log({
                        type: LogType.Log,
                        data: ['Session resumed successfully.']
                    });

                    // Go to home screen
                    ToastService.show({
                        type: ToastType.Success,
                        message: 'Bon retour parmi nous !',
                    });
                    goToHomeScreen();
                    break;
                default:
                    setPreviouslyLoggedIn(false);
                    onboardingLogService.log({
                        type: LogType.Error,
                        data: ['Error fetching user data after login:', response.status, response.data]
                    });
                    ToastService.show({
                        type: ToastType.Error,
                        message: "Une erreur est survenue lors de la récupération de vos données utilisateur. Veuillez vous reconnecter s'il vous plait",
                    });
                    break;
            }
        } catch (error) {
            setPreviouslyLoggedIn(false);
            onboardingLogService.log({
                type: LogType.Error,
                data: ['Error resuming session:', error],
            });
            ToastService.show({
                type: ToastType.Error,
                message: "Une erreur est survenue lors de la reprise de votre session. Veuillez vous reconnecter s'il vous plait.",
            });
        } finally {
            setIsBottomSheetOpen(prev => ({...prev, resumeSession: false}));
        }
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
                            onPress={() => resumeSession(token ?? '')}
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

