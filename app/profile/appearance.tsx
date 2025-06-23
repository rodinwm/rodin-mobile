import {AppearanceCard, ScreenTemplate, ThemedListTile, ThemedView} from '@/components';
import React, {useEffect, useState} from "react";
import {ColorTheme} from "@/utils/enums";
import {AppearanceService} from "@/utils/services/appearanceService";

export default function Page() {
    const [theme, setTheme] = useState(ColorTheme.System);

    const isSelected = (relatedTheme: ColorTheme) => {
        return relatedTheme === theme;
    }
    const selectTheme = (relatedTheme: ColorTheme) => {
        AppearanceService.saveSelectedTheme(relatedTheme).then(() => {
            setTheme(relatedTheme);
            AppearanceService.applyTheme(relatedTheme);
        });
    }

    useEffect(() => {
        AppearanceService.loadSavedTheme().then((loadedTheme: ColorTheme) => setTheme(loadedTheme));
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

