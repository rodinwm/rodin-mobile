import {ThemedView} from '@/components/base/ThemedView';
import React, {useState} from "react";
import {ThemedButton} from "@/components/base/ThemedButton";
import {ThemedText} from '@/components/base/ThemedText';
import ScreenTemplate from "@/components/layouts/ScreenTemplate";
import {AppNameTag} from "@/components/AppNameTag";
import {ThemedTextInput} from "@/components/base/ThemedTextInput";
import {useRouter} from "expo-router";
import ThemedBottomSheet from "@/components/base/ThemedBottomSheet";

export default function Page() {
    const router = useRouter();
    const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

    return (
        <ScreenTemplate
            headerLeftBtn={"backBtn"}
            setHeightToScreenSize={true}
            bottomSheet={(
                <ThemedBottomSheet
                    isOpen={isBottomSheetOpen}
                    onClose={() => setIsBottomSheetOpen(false)}
                >
                    <ThemedText type={'title'}>
                        Enregistrer vos informations de connexions ?
                    </ThemedText>

                    <ThemedText type={'defaultSemiBold'} className={"opacity-50"}>
                        Pour que vous n’ayez pas à les entrer lors de
                        votre prochaine connexion.
                    </ThemedText>

                    <ThemedView className={'w-full flex flex-row gap-3 mt-4'}>
                        <ThemedButton
                            title={"Oui"}
                            className={'flex-1'}
                            onPress={() => {
                                router.replace('/(tabs)');
                            }}
                        />
                        <ThemedButton
                            title={"Plus tard"}
                            className={'flex-1'}
                            type={"outlined"}
                            onPress={() => {
                                router.replace('/(tabs)');
                            }}
                        />
                    </ThemedView>

                </ThemedBottomSheet>
            )}
        >
            {/* Logo section */}
            <ThemedView className={'w-full flex flex-col justify-center items-center'}>
                <ThemedText type={"title"}>
                    Connexion
                </ThemedText>
                <ThemedText type={'mini'} className={"text-center opacity-50"}>
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
                        onPress={() => router.push('/auth/forgot-password')}
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
                    onPress={() => console.log('/timer')}
                />
            </ThemedView>

            <AppNameTag/>
        </ScreenTemplate>
    );
}

