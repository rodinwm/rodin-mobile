import {ScreenTemplate, ThemedListTile, ThemedView} from '@/components';
import React from "react";
import {useNavigation, useRouter} from "expo-router";

export default function Page() {
    const router = useRouter();
    const navigation = useNavigation();

    return (
        <ScreenTemplate
            title={"Aide"}
            headerLeftBtn={"backBtn"}
        >
            {/* Options */}
            <ThemedView className={'w-full flex flex-col gap-6'}>
                <ThemedListTile
                    icon={'BookOpenText'}
                    title={'Guide'}
                    onPress={() => router.push('/profile/help/guide')}
                />
                <ThemedListTile
                    icon={'Target'}
                    title={'Conseils et astuces'}
                    onPress={() => router.push('/profile/help/tips')}
                />

                <ThemedListTile
                    icon={'CircleHelp'}
                    title={'F.A.Q'}
                    onPress={() => router.push('/profile/help/faq')}
                />

                <ThemedListTile
                    icon={'Flag'}
                    title={'Signaler un problème'}
                    onPress={() => router.push('/profile/help/faq')}
                />
            </ThemedView>
        </ScreenTemplate>
    );
}

