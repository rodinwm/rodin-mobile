import {ThemedText} from '@/components/base/ThemedText';
import {ThemedView} from '@/components/base/ThemedView';
import React, {ReactNode} from "react";
import {ThemedButton} from "@/components/base/ThemedButton";
import {useBottomTabOverflow} from "@/components/base/TabBarBackground";
import {SafeAreaView, useSafeAreaInsets} from "react-native-safe-area-context";
import {useNavigation} from "expo-router";
import {HeaderSpacer} from "@/components/HeaderSpacer";
import {HeaderBtn} from "@/utils/interfaces";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";

interface Props {
    children: ReactNode;
    title?: string;
    takeBottomBarIntoAccount?: boolean;
    headerLeftBtn?: "backBtn" | HeaderBtn;
    headerRightBtn?: HeaderBtn;
    setHeightToScreenSize?: boolean;
    bottomSheet?: ReactNode;
}

export default function ScreenTemplate(props: Props) {
    const navigation = useNavigation();
    const insets = useSafeAreaInsets();

    return (
        <ThemedView className={"w-full h-screen"} fillStyle={"default"}>
            <KeyboardAwareScrollView
                enableOnAndroid={true}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
                contentContainerClassName={'grow'}
            >
                <SafeAreaView
                    className={`w-full ${props.setHeightToScreenSize ? 'h-screen justify-between' : 'h-full'} flex flex-col gap-14 p-6 pt-0`}
                    style={props.takeBottomBarIntoAccount ? {
                        paddingBottom: insets.bottom + useBottomTabOverflow(),
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
                                onPress={() => navigation.goBack()}
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
            </KeyboardAwareScrollView>

            {/* Bottom sheet */}
            {props.bottomSheet ?? null}
        </ThemedView>
    );
}

