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

export default function Page() {
    const router = useRouter();
    const {authUser} = useAuthUser({});
    const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

    const goToWelcomeScreen = () => {
        setIsBottomSheetOpen(false);
        router.replace('/(welcome)');
    }

    return (
        <ScreenTemplate
            title={"Profil"}
            takeBottomBarIntoAccount={true}
            bottomSheet={(
                <MessageSheet
                    title={"Deconnexion"}
                    subtitle={"Voulez vous vraiment quitter l'application ?"}
                    isOpen={isBottomSheetOpen}
                    onClose={() => setIsBottomSheetOpen(false)}
                    takeBottomBarIntoAccount={true}
                    confirm={{
                        text: "Oui",
                        onPress: () => {
                            goToWelcomeScreen();
                        }
                    }}
                    cancel={{
                        text: "Rester",
                        onPress: () => setIsBottomSheetOpen(false),
                    }}
                />
            )}
        >
            {/* Name */}
            <ThemedView className={'w-full flex flex-col'}>
                <ThemedText type={'default'}>Mon profil</ThemedText>
                <ThemedText type={'title'}>
                    {authUser ? authUser.firstname + ' ' + authUser.lastname : "Rodin"}
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
                    icon={'User'}
                    title={'Infos personnelles'}
                    subtitle={'Biographie, ID, Statut, Photo de profil'}
                    onPress={() => router.push('/profile/personal-infos')}
                />
                <ThemedListTile
                    icon={'Star'}
                    title={'Abonnement'}
                    subtitle={'Gérer votre abonnement'}
                    onPress={() => router.push('/profile/subscription')}
                />
                <ThemedListTile
                    icon={"Lock"}
                    title={'Confidentialité'}
                    subtitle={'Données personnellles, Sécurité, Notifications, Autres services'}
                    onPress={() => router.push('/profile/privacy')}
                />
                <ThemedListTile
                    icon={'Eye'}
                    title={'Apparence'}
                    subtitle={'Thème clair, Thème sombre, Thème automatique'}
                    onPress={() => router.push('/profile/appearance')}
                />
                <ThemedListTile
                    icon={"MessageCircleQuestion"}
                    title={'Aide'}
                    subtitle={'Serivce client, Guide, Règles générales'}
                    onPress={() => router.push('/profile/help')}
                />
            </ThemedView>

            <ThemedButton
                title={"Déconnexion"}
                type={"no-fill"}
                icon={{name: 'LogOut'}}
                onPress={() => setIsBottomSheetOpen(true)}
            />

            {/* App name & Version */}
            <AppNameTag/>
        </ScreenTemplate>
    );
}

