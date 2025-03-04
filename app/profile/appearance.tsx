import {ThemedText} from '@/components/base/ThemedText';
import {ThemedView} from '@/components/base/ThemedView';
import React from "react";
import {ThemedButton} from "@/components/base/ThemedButton";
import {SafeAreaView} from "react-native-safe-area-context";
import {useNavigation, useRouter} from "expo-router";
import {ScrollView} from 'react-native';
import ThemedListTile from "@/components/base/ThemedListTile";
import {HeaderSpacer} from "@/components/HeaderSpacer";
import {useColorScheme} from "@/utils/hooks/useColorScheme";

export default function Page() {
    const router = useRouter();
    const navigation = useNavigation();
    const colorScheme = useColorScheme();


    return (
        <ThemedView className={"w-full h-screen"} fillStyle={"default"}>
            <ScrollView
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
            >
                <SafeAreaView
                    className={"w-full h-screen flex flex-col gap-14 p-6 pt-0"}
                >
                    {/* Header */}
                    <ThemedView className={'w-full flex flex-row items-center justify-between'}>
                        <ThemedButton
                            title={"Back"}
                            icon={{name: 'ChevronLeft'}}
                            showTitle={false}
                            type={"outlined"}
                            onPress={() => navigation.goBack()}
                        />

                        <ThemedText type={'title'} className={'text-center'}>
                            Apparence
                        </ThemedText>

                        <HeaderSpacer/>
                    </ThemedView>

                    {/* Options */}
                    <ThemedView className={'w-full flex flex-col gap-2'}>
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
                </SafeAreaView>
            </ScrollView>
        </ThemedView>
    );
}

