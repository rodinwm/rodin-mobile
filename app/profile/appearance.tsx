import {ThemedView} from '@/components/base/ThemedView';
import React from "react";
import {useColorScheme} from "@/utils/hooks/useColorScheme";
import ScreenTemplate from "@/components/layouts/ScreenTemplate";
import {ThemedText} from "@/components/base/ThemedText";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import {Colors} from "@/utils/colors";

export default function Page() {
    const colorScheme = useColorScheme() ?? 'light';

    return (
        <ScreenTemplate
            title={"Apparence"}
            headerLeftBtn={"backBtn"}
        >
            {/* Options */}
            <ThemedView className={'w-full flex flex-row gap-6'}>
                <ThemedView className={'flex flex-col gap-3 justify-center items-center'}>
                    <ThemedView
                        className={'w-24 h-40'}
                        fillStyle={'opacity-15'}
                        radiusStyle={"default"}
                    />
                    <ThemedText type={'defaultSemiBold'}>Clair</ThemedText>
                    <BouncyCheckbox
                        fillColor={Colors.foreground[colorScheme] + 'AA'}
                        unFillColor={Colors.foreground[colorScheme] + "33"}
                        onPress={(isChecked: boolean) => {}}
                    />
                </ThemedView>
            </ThemedView>
        </ScreenTemplate>
    );
}

