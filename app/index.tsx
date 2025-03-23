import {ThemedView} from '@/components/base/ThemedView';
import React, {useState} from "react";
import {ThemedButton} from "@/components/base/ThemedButton";
import {ThemedText} from '@/components/base/ThemedText';
import ScreenTemplate from "@/components/layouts/ScreenTemplate";
import {AppNameTag} from "@/components/AppNameTag";
import ThemedListTile from "@/components/base/ThemedListTile";
import {useRouter} from "expo-router";

export default function Page() {
    const [alreadyLoggedIn, setAlreadyLoggedIn] = useState(false);
    const router = useRouter();

    return (
        <ScreenTemplate
            scrollEnabled={false}
            setHeightToScreenSize={true}
        >
            {/* Logo section */}
            <ThemedView className={'w-full flex flex-col justify-center items-center'}>
                <ThemedText type={"logo"}>
                    Rodin
                </ThemedText>
                <ThemedText type={'mini'} className={"text-center opacity-50"}>
                    Votre appli de concentration ultime sdf sgsgssd fsdf sdfgsfssd fsdf sdfdfsdfsdfs dfsd fsdf sdfsdf
                    sdfsd fsdf
                </ThemedText>
            </ThemedView>


            <ThemedView className={'w-full flex flex-col gap-3'}>
                {alreadyLoggedIn ? (
                    <>
                        <ThemedListTile
                            icon={'User'}
                            title={"mvxence"}
                            subtitle={"Reprendre là où vous vous êtes arrêté"}
                            fillStyle={"inversed"}
                            onPress={() => {
                                console.log('/timer')
                            }}
                        />
                        <ThemedButton
                            title={"Utiliser un autre compte"}
                            type={"outlined"}
                            onPress={() => console.log('/timer')}
                        />
                    </>
                ) : (
                    <>
                        <ThemedButton
                            title={"Commencer l'aventure"}
                            onPress={() => router.push('/auth/onboarding')}
                        />
                        <ThemedButton
                            title={"J'ai déjà un compte"}
                            type={"outlined"}
                            onPress={() => router.push('/auth/login')}
                        />
                    </>
                )}
            </ThemedView>

            <AppNameTag/>
        </ScreenTemplate>
    );
}

