import {
    AppNameTag,
    LucideIcon,
    MessageSheet,
    ScreenTemplate,
    ThemedButton,
    ThemedListTile,
    ThemedText,
    ThemedView
} from '@/components';
import React, {useState} from "react";
import {useRouter} from "expo-router";
import {useAuthUser} from "@/utils/hooks/useAuthUser";
import {useScreenReplacer} from "@/utils/hooks/useScreenReplacer";
import {LoadingScreen} from "@/components/layouts/LoadingScreen";
import {Colors} from "@/utils/colors";
import {useColorScheme} from "@/utils/hooks";

export default function Page() {
    const colorScheme = useColorScheme();
    const router = useRouter();
    const {authUser} = useAuthUser({});
    const {goToScreen: goToWelcomeScreen} = useScreenReplacer({
        path: '/(welcome)',
    });
    const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

    if (!authUser) {
        return <LoadingScreen/>;
    }

    return (
        <ScreenTemplate
            title={"Profil"}
            takeBottomBarIntoAccount={true}
            bottomSheet={(
                <>
                    <MessageSheet
                        title={"Deconnexion"}
                        subtitle={"Voulez vous vraiment quitter l'application ?"}
                        isOpen={isBottomSheetOpen}
                        onClose={() => setIsBottomSheetOpen(false)}
                        takeBottomBarIntoAccount={true}
                        confirm={{
                            text: "Oui",
                            type: "danger",
                            onPress: () => {
                                setIsBottomSheetOpen(false);
                                goToWelcomeScreen();
                            }
                        }}
                        cancel={{
                            text: "Rester",
                            onPress: () => setIsBottomSheetOpen(false),
                        }}
                    />
                </>
            )}
        >
            {/* Name */}
            <ThemedView className={'w-full flex flex-col gap-1'}>
                <ThemedText type={'default'}>Mon profil</ThemedText>
                <ThemedText type={'title'}>
                    {authUser.firstname + ' ' + authUser.lastname}
                </ThemedText>
            </ThemedView>

            {/* Ads */}
            <ThemedView
                borderStyle={"opacity-20"}
                fillStyle={"opacity-15"}
                radiusStyle={"default"}
                paddingStyle={"default"}
                className={'w-full flex flex-col items-center gap-3'}
            >
                <LucideIcon name={'Megaphone'} size={150}/>
                <ThemedText type={'subtitle'}>Publicités</ThemedText>
            </ThemedView>

            {/* Options */}
            <ThemedView className={'w-full flex flex-col gap-6'}>
                <ThemedListTile
                    icon={{name: 'User'}}
                    title={'Infos personnelles'}
                    subtitle={'Biographie, ID, Statut, Photo de profil'}
                    onPress={() => router.push('/profile/personal-infos')}
                />
                <ThemedListTile
                    icon={{name: 'Star', color: Colors.foreground.subscription[colorScheme]}}
                    title={'Abonnement'}
                    subtitle={'Gérer votre abonnement'}
                    onPress={() => router.push('/profile/subscription')}
                />
                <ThemedListTile
                    icon={{name: "Lock"}}
                    title={'Confidentialité'}
                    subtitle={'Données personnellles, Sécurité, Notifications, Autres services'}
                    onPress={() => router.push('/profile/privacy')}
                />
                <ThemedListTile
                    icon={{name: 'Eye'}}
                    title={'Apparence'}
                    subtitle={'Thème clair, Thème sombre, Thème automatique'}
                    onPress={() => router.push('/profile/appearance')}
                />
                <ThemedListTile
                    icon={{name: "MessageCircleQuestion"}}
                    title={'Aide'}
                    subtitle={'Serivce client, Guide, Règles générales'}
                    onPress={() => router.push('/profile/help')}
                />
            </ThemedView>

            <ThemedView className={'w-full flex flex-row gap-3 mt-6'}>
                <ThemedButton
                    title={"Déconnexion"}
                    type={"danger-no-fill"}
                    icon={{name: 'LogOut', color: 'red'}}
                    className={'flex-1'}
                    onPress={() => setIsBottomSheetOpen(true)}
                />
            </ThemedView>

            {/* App name & Version */}
            <AppNameTag/>
        </ScreenTemplate>
    );
}

