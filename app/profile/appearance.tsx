import {ThemedView} from '@/components/base/ThemedView';
import React, {useState} from "react";
import ScreenTemplate from "@/components/layouts/ScreenTemplate";
import {AppearanceCard} from "@/components/AppearanceCard";
import {ColorTheme} from "@/utils/enums";
import ThemedListTile from "@/components/base/ThemedListTile";

export default function Page() {
    const [theme, setTheme] = useState(ColorTheme.System);

    const isSelected = (relatedTheme: ColorTheme) => {
        return relatedTheme === theme;
    }
    const selectTheme = (relatedTheme: ColorTheme) => {
        setTheme(relatedTheme);
    }

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
                subtitle={"Le thème de l'application s'adapte automatiquement à celui de votre téléphone"}
                onPress={() => selectTheme(ColorTheme.System)}
                suffixIcon={isSelected(ColorTheme.System) ? "Check" : null}
            />
        </ScreenTemplate>
    );
}

