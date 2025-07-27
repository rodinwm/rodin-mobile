import {
    AppNameTag,
    MessageSheet,
    ScreenTemplate,
    ThemedButton,
    ThemedText,
    ThemedTextInput,
    ThemedView
} from '@/components';
import React, {useState} from "react";
import {useRouter} from "expo-router";
import {LoginPayload, LoginResponseData} from "@/utils/types";
import {loginLogService, onboardingLogService} from "@/utils/constants";
import {LogType, ToastType} from "@/utils/enums";
import {ApiService} from "@/utils/services/apiService";
import {HttpStatusCode} from "axios";
import {ToastService} from "@/utils/services/toastService";
import {useColorScheme} from "@/utils/hooks";
import {AuthService} from "@/utils/services/authService";
import {User} from "@rodinwm/rodin-models/frontend";
import {Loader} from "@/components/layouts/Loader";
import {useScreenReplacer} from "@/utils/hooks/useScreenReplacer";

export default function Page() {
    const router = useRouter();
    const colorScheme = useColorScheme();
    const {goToScreen: goToHomeScreen} = useScreenReplacer({
        path: '/(tabs)',
        stepsToGoBack: 1,
    });
    const [isBottomSheetOpen, setIsBottomSheetOpen] = useState({
        saveCredentials: false,
        login: false,
    });
    const [formData, setFormData] = useState<LoginPayload>({
        pseudo: 'alexxtahi',
        email: 'alexandretahi7@gmail.com',
        password: 'Azerty123#',
    });

    const login = async (saveCredentials: boolean = false) => {
        loginLogService.log({
            type: LogType.Log,
            data: ['Login - User data:', formData]
        });

        setIsBottomSheetOpen(prev => ({...prev, login: true}));

        try {
            const response = await ApiService.login(formData);

            switch (response.status) {
                case HttpStatusCode.Ok:
                    const loginResponseData: LoginResponseData = response.data;
                    onboardingLogService.log({
                        type: LogType.Log,
                        data: ['User successfully logged in.']
                    });

                    // Fetch user data
                    const userResponse = await ApiService.getUser(loginResponseData.token);
                    if (userResponse.status !== HttpStatusCode.Ok) {
                        onboardingLogService.log({
                            type: LogType.Error,
                            data: ['Error fetching user data after login:', userResponse.status, userResponse.data]
                        });
                        ToastService.show({
                            type: ToastType.Error,
                            message: 'Une erreur est survenue lors de la récupération de vos données utilisateur. Veuillez réessayer plus tard.',
                        });
                        return;
                    }

                    // Save credentials if requested
                    //if (saveCredentials) {
                    await AuthService.saveCredentials(loginResponseData.token, userResponse.data.user as User);
                    onboardingLogService.log({
                        type: LogType.Log,
                        data: ['Credentials saved successfully.']
                    });
                    //}

                    // Go to home screen
                    ToastService.show({
                        type: ToastType.Success,
                        message: 'Bon retour parmi nous !',
                    });
                    setIsBottomSheetOpen(prev => ({...prev, login: false}));
                    goToHomeScreen();
                    break;
                case HttpStatusCode.Unauthorized:
                    onboardingLogService.log({
                        type: LogType.Error,
                        data: ['Error logging in user (unauthorized):', response.status, response.data]
                    });
                    ToastService.show({
                        type: ToastType.Error,
                        message: 'Identifiants incorrects. Veuillez réessayer.',
                    })
                    break;
                default:
                    onboardingLogService.log({
                        type: LogType.Error,
                        data: ['Error logging in user (unexpected response):', response.status, response.data]
                    });
                    ToastService.show({
                        type: ToastType.Error,
                        message: 'Une erreur est survenue lors de la connexion. Veuillez réessayer plus tard.',
                    });
                    break;
            }
        } catch (error) {
            onboardingLogService.log({
                type: LogType.Error,
                data: ['Error logging in user:', error],
            });
        } finally {
            setIsBottomSheetOpen(prev => ({...prev, login: false}));
        }
    };

    return (
        <ScreenTemplate
            headerLeftBtn={"backBtn"}
            setHeightToScreenSize={true}
            bottomSheet={(
                <>
                    <MessageSheet
                        title={"Enregistrer vos informations de connexions ?"}
                        subtitle={"Pour que vous n’ayez pas à les entrer lors de votre prochaine connexion."}
                        isOpen={isBottomSheetOpen.saveCredentials}
                        onClose={() => {
                            setIsBottomSheetOpen(prev => ({...prev, saveCredentials: false}));
                        }}
                        confirm={{
                            text: "Oui",
                            onPress: () => {
                                setIsBottomSheetOpen(prev => ({...prev, saveCredentials: false}));
                                login(true).then();
                            }
                        }}
                        cancel={{
                            text: "Plus tard",
                            onPress: () => {
                                setIsBottomSheetOpen(prev => ({...prev, saveCredentials: false}));
                                login().then();
                            }
                        }}
                    />
                    <MessageSheet
                        title={"Connexion"}
                        subtitle={"Patientez pendant qu'on vérifie vos informations de connexion."}
                        isOpen={isBottomSheetOpen.login}
                        closeOnTapOutside={false}
                        onClose={() => {
                            setIsBottomSheetOpen(prev => ({...prev, login: false}));
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
                <ThemedText type={"title"}>
                    Connexion
                </ThemedText>
                <ThemedText type={'small'} className={"text-center opacity-50"}>
                    Ravi de vous revoir parmis nous ! Entrez vos informations de connexion pour revenir là où vous vous
                    êtes arrêté.
                </ThemedText>
            </ThemedView>

            <ThemedView className={'w-full flex flex-col gap-3'}>
                <ThemedTextInput
                    label={"Email"}
                    textContentType={"emailAddress"}
                    keyboardType={"email-address"}
                    placeholder={"Ex: alexandretahi@gmail.com"}
                    value={formData.email}
                    onChangeText={(email) => setFormData(prev => ({...prev, email: email}))}
                />
                <ThemedTextInput
                    label={"Mot de passe"}
                    textContentType={"password"}
                    keyboardType={"visible-password"}
                    placeholder={"Ex: ******"}
                    secureTextEntry={true}
                    value={formData.password}
                    onChangeText={(password) => setFormData(prev => ({...prev, password: password}))}
                />
                <ThemedView className={'w-full flex justify-end items-end'}>
                    <ThemedButton
                        type={'link'}
                        title={"Mot de passe oublié ?"}
                        onPress={() => router.push('/(auth)/forgot-password')}
                    />
                </ThemedView>
            </ThemedView>

            <ThemedView className={'w-full flex flex-col gap-3'}>
                <ThemedButton
                    title={"Se connecter"}
                    onPress={() => {
                        setIsBottomSheetOpen(prev => ({...prev, saveCredentials: true}));
                    }}
                />
                <ThemedButton
                    title={"S'inscrire"}
                    type={"outlined"}
                    onPress={() => {
                        router.replace('/(auth)/onboarding')
                    }}
                />
            </ThemedView>

            <AppNameTag/>
        </ScreenTemplate>
    );
}

