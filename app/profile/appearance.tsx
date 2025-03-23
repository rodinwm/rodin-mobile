import {ThemedView} from '@/components/base/ThemedView';
import React from "react";
import ThemedListTile from "@/components/base/ThemedListTile";
import {useColorScheme} from "@/utils/hooks/useColorScheme";
import ScreenTemplate from "@/components/layouts/ScreenTemplate";

export default function Page() {
    const colorScheme = useColorScheme();

    return (
        <ScreenTemplate
            title={"Apparence"}
            headerLeftBtn={"backBtn"}
        >
            {/* Options */}
            <ThemedView className={'w-full flex flex-col gap-6'}>
                <ThemedListTile
                    icon={'Sun'}
                    suffixIcon={null}
                    title={'Thème clair'}
                    fillStyle={colorScheme === "light" ? "inversed" : undefined}
                />
                <ThemedListTile
                    icon={'Moon'}
                    suffixIcon={null}
                    title={'Thème sombre'}
                    fillStyle={colorScheme === "dark" ? "inversed" : undefined}
                />
                <ThemedListTile
                    icon={'Smartphone'}
                    suffixIcon={null}
                    title={'Réglage système'}
                    fillStyle={colorScheme === null ? "inversed" : undefined}
                />
            </ThemedView>
        </ScreenTemplate>
    );
}

