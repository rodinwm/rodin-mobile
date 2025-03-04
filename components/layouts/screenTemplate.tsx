import {ThemedText} from '@/components/base/ThemedText';
import {ThemedView} from '@/components/base/ThemedView';
import React, {ReactNode} from "react";
import {ThemedButton} from "@/components/base/ThemedButton";
import {useBottomTabOverflow} from "@/components/base/TabBarBackground";
import {SafeAreaView, useSafeAreaInsets} from "react-native-safe-area-context";
import {useNavigation} from "expo-router";
import {ScrollView} from 'react-native';
import {HeaderSpacer} from "@/components/HeaderSpacer";
import {HeaderBtn} from "@/utils/interfaces";

interface Props {
    children: ReactNode;
    title?: string;
    takeBottomBarIntoAccount?: boolean;
    headerLeftBtn?: "backBtn" | HeaderBtn;
    headerRightBtn?: HeaderBtn;
}

export default function ScreenTemplate(props: Props) {

    return (
        <ThemedView className={"w-full h-screen"} fillStyle={"default"}>
            <ScrollView
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
            >
                <SafeAreaView
                    className={"w-full h-full flex flex-col gap-14 p-6 pt-0"}
                    style={props.takeBottomBarIntoAccount ? {
                        paddingBottom: useSafeAreaInsets().bottom + useBottomTabOverflow(),
                    } : null}
                >
                    {/* Header */}
                    <ThemedView className={'w-full flex flex-row items-center justify-between'}>
                        {props.headerLeftBtn === "backBtn" ? (
                            <ThemedButton
                                title={"Back"}
                                icon={{name: 'ChevronLeft'}}
                                showTitle={false}
                                type={"outlined"}
                                onPress={() => useNavigation().goBack()}
                            />
                        ) : props.headerLeftBtn !== undefined ? (
                            <ThemedButton
                                title={"HeaderLeftBtn"}
                                icon={{name: props.headerLeftBtn.icon}}
                                showTitle={false}
                                type={"outlined"}
                                onPress={props.headerLeftBtn.onPress}
                            />
                        ) : (
                            <HeaderSpacer/>
                        )}

                        {props.title ? (
                            <ThemedText type={'title'}>
                                {props.title}
                            </ThemedText>
                        ) : null}

                        {props.headerRightBtn !== undefined ? (
                            <ThemedButton
                                title={"HeaderRightBtn"}
                                icon={{name: props.headerRightBtn.icon}}
                                showTitle={false}
                                type={"outlined"}
                                onPress={props.headerRightBtn.onPress}
                            />
                        ) : (
                            <HeaderSpacer/>
                        )}
                    </ThemedView>

                    {/* Children */}
                    {props.children}
                    
                </SafeAreaView>
            </ScrollView>
        </ThemedView>
    );
}

