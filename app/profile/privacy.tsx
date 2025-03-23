import {ThemedView} from '@/components/base/ThemedView';
import React from "react";
import {useNavigation, useRouter} from "expo-router";
import ThemedListTile from "@/components/base/ThemedListTile";
import ScreenTemplate from '@/components/layouts/ScreenTemplate';

export default function Page() {
    const router = useRouter();
    const navigation = useNavigation();


    return (
        <ScreenTemplate
            title={"Confidentialité"}
            headerLeftBtn={"backBtn"}
        >
            {/* Options */}
            <ThemedView className={'w-full flex flex-col gap-6'}>
                <ThemedListTile
                    icon={'BookOpenText'}
                    title={'Guide'}
                />
                <ThemedListTile
                    icon={'CircleHelp'}
                    title={'F.A.Q'}
                />
                <ThemedListTile
                    icon={'Target'}
                    title={'Règles générales'}
                />
            </ThemedView>
        </ScreenTemplate>
    );
}

