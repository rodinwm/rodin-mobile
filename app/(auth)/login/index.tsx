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

export default function Page() {
    const router = useRouter();
    const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

    const goToHomeScreen = () => {
        setIsBottomSheetOpen(false);
        router.back();
        router.replace('/(tabs)');
    };

    return (
        <ScreenTemplate
            headerLeftBtn={"backBtn"}
            setHeightToScreenSize={true}
            bottomSheet={(
                <MessageSheet
                    title={"Enregistrer vos informations de connexions ?"}
                    subtitle={"Pour que vous n’ayez pas à les entrer lors de votre prochaine connexion."}
                    isOpen={isBottomSheetOpen}
                    onClose={goToHomeScreen}
                    confirm={{
                        text: "Oui",
                        onPress: () => {
                            goToHomeScreen();
                        }
                    }}
                    cancel={{
                        text: "Plus tard",
                        onPress: goToHomeScreen
                    }}
                />
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
                    placeholder={"Ex: alexandretahi@gmail.com"}
                />
                <ThemedTextInput
                    label={"Mot de passe"}
                    textContentType={"password"}
                    placeholder={"Ex: ********"}
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
                        setIsBottomSheetOpen(true);
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

