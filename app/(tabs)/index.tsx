import {ThemedText} from '@/components/ThemedText';
import {ThemedView} from '@/components/ThemedView';
import React from "react";
import {ThemedButton} from "@/components/ThemedButton";
import {useBottomTabOverflow} from "@/components/ui/TabBarBackground";
import {SafeAreaView, useSafeAreaInsets} from "react-native-safe-area-context";

export default function Page() {
    const insets = useSafeAreaInsets();
    const bottomOverflow = useBottomTabOverflow();


    return (
        <ThemedView className={"w-full"}>
            <SafeAreaView
                className={"w-full h-screen flex flex-col justify-between gap-4 p-6 pt-0"}
                style={{paddingBottom: insets.bottom + bottomOverflow}}
            >
                {/* Header */}
                <ThemedView className={'w-full flex flex-row items-center justify-between'}>
                    <ThemedButton
                        title={"Test"}
                        icon={{name: 'Users'}}
                        showTitle={false}
                        filled={false}
                        onPress={() => console.log("Home")}
                    />

                    <ThemedText type={'title'}>Rodin</ThemedText>

                    <ThemedButton
                        title={"Test"}
                        icon={{name: 'User'}}
                        showTitle={false}
                        filled={false}
                        onPress={() => console.log("Profile")}
                    />
                </ThemedView>

                {/* Body */}
                <ThemedButton
                    title={"Test " + useBottomTabOverflow()}
                    onPress={() => console.log("Home")}
                />
            </SafeAreaView>
        </ThemedView>
    );
}

