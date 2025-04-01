import {ThemedView} from '@/components/base/ThemedView';
import React from "react";
import ThemedListTile from "@/components/base/ThemedListTile";
import ScreenTemplate from '@/components/layouts/ScreenTemplate';
import LucideIcon from "@/components/base/LucideIcon";
import {ThemedText} from "@/components/base/ThemedText";
import {HeaderSpacer} from "@/components/HeaderSpacer";

export default function Page() {
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
                    suffixIcon={(
                        <ThemedView className={'flex flex-row items-center gap-3'}>
                            <ThemedText type={"defaultSemiBold"}>Wsibi9</ThemedText>
                            <LucideIcon
                                size={20}
                                name={"ChevronRight"}
                            />
                        </ThemedView>
                    )}
                />
                <ThemedListTile
                    title={'Adresse mail'}
                    suffixIcon={(
                        <ThemedView className={'flex flex-row items-center gap-3'}>
                            <ThemedText type={"defaultSemiBold"}>ws35@gmail.com</ThemedText>
                            <LucideIcon
                                size={20}
                                name={"ChevronRight"}
                            />
                        </ThemedView>
                    )}
                />
                <ThemedListTile
                    title={'Téléphone'}
                    suffixIcon={(
                        <ThemedView className={'flex flex-row items-center gap-3'}>
                            <ThemedText type={"defaultSemiBold"}>0738047523</ThemedText>
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

