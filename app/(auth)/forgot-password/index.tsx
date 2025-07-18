import {AppNameTag, ScreenTemplate, ThemedButton, ThemedText, ThemedTextInput, ThemedView} from '@/components';
import React from "react";
import {Toast} from "toastify-react-native";

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
                <ThemedText type={'small'} className={"text-center opacity-50"}>
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
                    onPress={() => {
                        Toast.success("Promised is resolved")
                        Toast.info("Je suis ici")
                    }}
                />
            </ThemedView>

            <AppNameTag/>
        </ScreenTemplate>
    );
}

