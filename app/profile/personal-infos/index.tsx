import {
    HeaderSpacer,
    LucideIcon,
    ScreenTemplate,
    ThemedListTile,
    ThemedText,
    ThemedTextInput,
    ThemedView
} from '@/components';
import React, {useState} from "react";

export default function Page() {
    const [pseudo, setPseudo] = useState({
        value: "Wsibi9",
        editMode: false,
    });
    const [email, setEmail] = useState({
        value: "ws35@gmail.com",
        editMode: false,
    });
    const [phoneNumber, setPhoneNumber] = useState({
        value: "0738047523",
        editMode: false,
    })

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
                <ThemedText type={'miniBold'}>Changer de photo</ThemedText>
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
                        setPseudo({...pseudo, editMode: false});
                        setPhoneNumber({...phoneNumber, editMode: false});
                        setEmail({...email, editMode: !email.editMode});
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
                        setPseudo({...pseudo, editMode: false});
                        setEmail({...email, editMode: false});
                        setPhoneNumber({...phoneNumber, editMode: !phoneNumber.editMode});
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

