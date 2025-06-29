import {ScreenTemplate, ThemedListTile, ThemedView} from '@/components';
import React from "react";
import {useNavigation, useRouter} from "expo-router";

export default function Page() {
    const router = useRouter();
    const navigation = useNavigation();

    return (
        <ScreenTemplate
            title={"Plus d'informations"}
            headerLeftBtn={"backBtn"}
        >
            {/* Options */}
            <ThemedView className={'w-full flex flex-col gap-6'}>
                <ThemedListTile
                    icon={"Info"}
                    title={'Politique de confidentialité'}
                />
                <ThemedListTile
                    icon={"Album"}
                    title={"Condition d'utilisation"}
                />
                <ThemedListTile
                    icon={"Scale"}
                    title={"Juridique"}
                />
            </ThemedView>
        </ScreenTemplate>
    );
}

