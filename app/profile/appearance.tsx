import {ThemedView} from '@/components/base/ThemedView';
import React, {useEffect, useState} from "react";
import ScreenTemplate from "@/components/layouts/ScreenTemplate";
import {AppearanceCard} from "@/components/AppearanceCard";
import {ColorTheme} from "@/utils/enums";
import ThemedListTile from "@/components/base/ThemedListTile";
import {AppearanceHelper} from "@/utils/helpers/appearanceHelper";

export default function Page() {
    const [theme, setTheme] = useState(ColorTheme.System);

    const isSelected = (relatedTheme: ColorTheme) => {
        return relatedTheme === theme;
    }
    const selectTheme = (relatedTheme: ColorTheme) => {
        AppearanceHelper.saveSelectedTheme(relatedTheme).then(() => {
            setTheme(relatedTheme);
            AppearanceHelper.applyTheme(relatedTheme);
        });
    }

    useEffect(() => {
        AppearanceHelper.loadSavedTheme().then((loadedTheme: ColorTheme) => setTheme(loadedTheme));
    }, [false]);

    return (
        <ScreenTemplate
            title={"Apparence"}
            headerLeftBtn={"backBtn"}
        >
            {/* Light & Dark options */}
            <ThemedView className={'w-full flex flex-row justify-around gap-6 px-6'}>
                <AppearanceCard
                    selected={isSelected(ColorTheme.Light)}
                    onSelect={() => selectTheme(ColorTheme.Light)}
                />
                <AppearanceCard
                    type={ColorTheme.Dark}
                    selected={isSelected(ColorTheme.Dark)}
                    onSelect={() => selectTheme(ColorTheme.Dark)}
                />
            </ThemedView>

            {/* System option */}
            <ThemedListTile
                icon={'Smartphone'}
                title={'Utiliser le thème du système'}
                fillStyle={isSelected(ColorTheme.System) ? "inversed" : "opacity-15"}
                hasPadding={true}
                subtitle={"Faire correspondre l'apparence aux paramètres d'affichage et de luminosité de ton appareil"}
                onPress={() => selectTheme(ColorTheme.System)}
                suffixIcon={isSelected(ColorTheme.System) ? "Check" : null}
            />
        </ScreenTemplate>
    );
}

