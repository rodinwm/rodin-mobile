import {ThemedView} from '@/components/base/ThemedView';
import React from "react";
import {useNavigation, useRouter} from "expo-router";
import ThemedListTile from "@/components/base/ThemedListTile";
import ScreenTemplate from "@/components/layouts/ScreenTemplate";

export default function Page() {
    const router = useRouter();
    const navigation = useNavigation();


    return (
        <ScreenTemplate
            title={"Aide"}
            headerLeftBtn={"backBtn"}
        >
            {/* Options */}
            <ThemedView className={'w-full flex flex-col gap-2'}>
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
            </ThemedView>
        </ScreenTemplate>
    );
}

