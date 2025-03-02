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
                            Aide
                        </ThemedText>

                        <HeaderSpacer/>
                    </ThemedView>

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
                </SafeAreaView>
            </ScrollView>
        </ThemedView>
    );
}

