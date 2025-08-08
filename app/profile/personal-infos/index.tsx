import {
    HeaderSpacer,
    LucideIcon,
    ScreenTemplate,
    ThemedListTile,
    ThemedText,
    ThemedTextInput,
    ThemedView
} from '@/components';
import React, {useEffect, useState} from "react";
import {useAuthUser} from "@/utils/hooks/useAuthUser";
import {LoadingScreen} from "@/components/layouts/LoadingScreen";

export default function Page() {
    const {authUser} = useAuthUser({});
    const [pseudo, setPseudo] = useState({
        value: '',
        editMode: false,
    });
    const [email, setEmail] = useState({
        value: '',
        editMode: false,
    });
    const [phoneNumber, setPhoneNumber] = useState({
        value: '',
        editMode: false,
    });

    useEffect(() => {
        if (authUser) {
            setPseudo(prev => ({...prev, value: authUser.pseudo}));
            setEmail(prev => ({...prev, value: authUser.email}));
            setPhoneNumber(prev => ({...prev, value: authUser.phoneNumber ?? ''}));
        }
    }, [authUser]);

    if (!authUser) {
        return <LoadingScreen/>;
    }

    return (
        <ScreenTemplate
            title={"Infos personnelles"}
            headerLeftBtn={"backBtn"}
        >
            {/* User photo */}
            <ThemedView className={'w-full flex flex-col gap-3 justify-center items-center'}>
                <ThemedView
                    className={'flex justify-center items-center w-fit'}
                    fillStyle={"inversed"}
                    paddingStyle={"default"}
                    radiusStyle={"full"}
                >
                    <LucideIcon name={"User"} inverseColor={true}/>
                </ThemedView>
                <ThemedText type={'miniBold'}>{authUser.pseudo}</ThemedText>
                {/*
                <ThemedText type={'miniBold'}>Changer de photo</ThemedText>
                */}
            </ThemedView>
            {/* Options */}
            <ThemedView className={'w-full flex flex-col gap-6'}>
                <ThemedListTile
                    title={'Pseudo'}
                    onPress={() => {
                        setEmail({...email, editMode: false});
                        setPhoneNumber({...phoneNumber, editMode: false});
                        setPseudo({...pseudo, editMode: !pseudo.editMode});
                    }}
                    suffixIcon={
                        pseudo.editMode ? (
                            <ThemedTextInput
                                value={pseudo.value}
                                autoFocus={true}
                                placeholder={"Ex: myPseudo"}
                                onChange={(event) => {
                                    setPseudo({...pseudo, value: event.nativeEvent.text});
                                }}
                            />
                        ) : (
                            <ThemedView className={'flex flex-row items-center gap-3'}>
                                <ThemedText type={"defaultSemiBold"}>{pseudo.value}</ThemedText>
                                <LucideIcon
                                    size={20}
                                    name={"ChevronRight"}
                                />
                            </ThemedView>
                        )}
                />
                <ThemedListTile
                    title={'Adresse mail'}
                    onPress={() => {
                        setPseudo(prev => ({...prev, editMode: false}));
                        setPhoneNumber(prev => ({...prev, editMode: false}));
                        setEmail(prev => ({...prev, editMode: !email.editMode}));
                    }}
                    suffixIcon={
                        email.editMode ? (
                            <ThemedTextInput
                                value={email.value}
                                autoFocus={true}
                                placeholder={"Ex: user@email.com"}
                                onChange={(event) => {
                                    setEmail({...email, value: event.nativeEvent.text});
                                }}
                            />
                        ) : (
                            <ThemedView className={'flex flex-row items-center gap-3'}>
                                <ThemedText type={"defaultSemiBold"}>{email.value}</ThemedText>
                                <LucideIcon
                                    size={20}
                                    name={"ChevronRight"}
                                />
                            </ThemedView>
                        )}
                />
                <ThemedListTile
                    title={'Téléphone'}
                    onPress={() => {
                        setPseudo(prev => ({...prev, editMode: false}));
                        setEmail(prev => ({...prev, editMode: false}));
                        setPhoneNumber(prev => ({...prev, editMode: !phoneNumber.editMode}));
                    }}
                    suffixIcon={
                        phoneNumber.editMode ? (
                            <ThemedTextInput
                                value={phoneNumber.value}
                                autoFocus={true}
                                placeholder={"Ex: user@email.com"}
                                onChange={(event) => {
                                    setPhoneNumber({...phoneNumber, value: event.nativeEvent.text});
                                }}
                            />
                        ) : (
                            <ThemedView className={'flex flex-row items-center gap-3'}>
                                <ThemedText type={"defaultSemiBold"}>{phoneNumber.value}</ThemedText>
                                <LucideIcon
                                    size={20}
                                    name={"ChevronRight"}
                                />
                            </ThemedView>
                        )}
                />

                <HeaderSpacer/>

                <ThemedListTile
                    title={'Mot de passe'}
                />
                <ThemedListTile
                    title={'Désactiver ou supprimer le compte'}
                />
            </ThemedView>
        </ScreenTemplate>
    );
}

