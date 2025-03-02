import {ThemedText} from '@/components/base/ThemedText';
import {ThemedView} from '@/components/base/ThemedView';
import React from "react";
import {ThemedButton} from "@/components/base/ThemedButton";
import {SafeAreaView} from "react-native-safe-area-context";
import {useNavigation, useRouter} from "expo-router";
import {ScrollView} from 'react-native';
import ThemedListTile from "@/components/base/ThemedListTile";
import {HeaderSpacer} from "@/components/HeaderSpacer";

export default function Page() {
    const router = useRouter();
    const navigation = useNavigation();


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
                            Infos personnelles
                        </ThemedText>

                        <HeaderSpacer/>
                    </ThemedView>

                    {/* Options */}
                    <ThemedView className={'w-full flex flex-col gap-2'}>
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
                </SafeAreaView>
            </ScrollView>
        </ThemedView>
    );
}

