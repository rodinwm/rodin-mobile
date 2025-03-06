import {ThemedView} from '@/components/base/ThemedView';
import React from "react";
import {ThemedButton} from "@/components/base/ThemedButton";
import {ThemedText} from '@/components/base/ThemedText';
import ScreenTemplate from "@/components/layouts/ScreenTemplate";
import {AppNameTag} from "@/components/AppNameTag";
import {ThemedTextInput} from "@/components/base/ThemedTextInput";
import {useRouter} from "expo-router";

export default function Page() {
    const router = useRouter();

    return (
        <ScreenTemplate
            headerLeftBtn={"backBtn"}
            setHeightToScreenSize={true}
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
                    onPress={() => console.log('/timer')}
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

