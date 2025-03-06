import {ThemedView} from '@/components/base/ThemedView';
import React from "react";
import {ThemedButton} from "@/components/base/ThemedButton";
import {ThemedText} from '@/components/base/ThemedText';
import ScreenTemplate from "@/components/layouts/ScreenTemplate";
import {AppNameTag} from "@/components/AppNameTag";
import {ThemedTextInput} from "@/components/base/ThemedTextInput";

export default function Page() {

    return (
        <ScreenTemplate
            headerLeftBtn={"backBtn"}
            setHeightToScreenSize={true}
        >
            {/* Logo section */}
            <ThemedView className={'w-full flex flex-col justify-center items-center'}>
                <ThemedText type={"title"}>
                    Mot de passe oublié
                </ThemedText>
                <ThemedText type={'mini'} className={"text-center opacity-50"}>
                    Pas de panique, il vous suffit d'entrer votre adresse mail ou votre nom d'utilisateur pour
                    réinitialiser votre mot de passe.
                </ThemedText>
            </ThemedView>

            <ThemedView className={'w-full flex flex-col gap-3'}>
                <ThemedTextInput
                    label={"Email / Nom d'utilisateur"}
                    placeholder={"Ex: alexandretahi@gmail.com"}
                />
                <ThemedButton
                    title={"Réinitialiser"}
                    onPress={() => console.log('/timer')}
                />
            </ThemedView>

            <AppNameTag/>
        </ScreenTemplate>
    );
}

