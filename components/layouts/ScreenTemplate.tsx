import {ThemedText} from '@/components/base/ThemedText';
import {ThemedView, ThemedViewProps} from '@/components/base/ThemedView';
import {ThemedButton} from '@/components/base/ThemedButton';
import {HeaderSpacer} from '@/components/domain/HeaderSpacer';
import React, {ReactNode} from "react";
import {useBottomTabOverflow} from "@/components/base/TabBarBackground";
import {SafeAreaView, useSafeAreaInsets} from "react-native-safe-area-context";
import {useRouter} from "expo-router";
import {HeaderBtn} from "@/utils/interfaces";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {ImageSourcePropType} from "react-native";

type Props = {
    children: ReactNode;
    screenName?: string;
    title?: string;
    takeBottomBarIntoAccount?: boolean;
    headerLeftBtn?: "backBtn" | HeaderBtn;
    headerRightBtn?: HeaderBtn;
    setHeightToScreenSize?: boolean;
    scrollEnabled?: boolean;
    bottomSheet?: ReactNode;
    gap?: "default" | "small";
    backgroundImage?: ImageSourcePropType;
    removeBodyPadding?: boolean;
    fillStyle?: ThemedViewProps["fillStyle"];
    customBackgroundColor?: string;
};

export function ScreenTemplate(props: Props) {
    const router = useRouter();
    const insets = useSafeAreaInsets();

    return (
        <>
            {/*
            <Stack.Screen
                name={props.screenName}
                options={{
                    title: props.title,
                    headerShown: false
                }}
            />
            */}

            <ThemedView
                className={`w-full h-screen ${props.customBackgroundColor}`}
                fillStyle={props.fillStyle ?? "default"}
                backgroundImage={props.backgroundImage}
                showBlackOverlay={props.backgroundImage !== undefined}
            >
                <KeyboardAwareScrollView
                    enableOnAndroid={true}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                    contentContainerClassName={'grow'}
                    nestedScrollEnabled={true}
                    scrollEnabled={props.scrollEnabled}
                >
                    <SafeAreaView
                        className={`w-full flex flex-col ${props.gap === 'small' ? 'gap-2' : 'gap-6'} ${props.setHeightToScreenSize ? 'h-screen justify-between' : 'h-full'} ${props.removeBodyPadding ? 'p-0 pb-20' : 'p-6 pt-0'}`}
                        style={props.takeBottomBarIntoAccount ? {
                            paddingBottom: insets.bottom + useBottomTabOverflow(),
                        } : null}
                    >
                        {/* Header */}
                        <ThemedView
                            className={`w-full flex flex-row items-center justify-between ${props.removeBodyPadding ? 'px-6' : ''}`}>
                            {props.headerLeftBtn === "backBtn" && router.canGoBack() ? (
                                <ThemedButton
                                    title={"Back"}
                                    icon={{name: 'ChevronLeft'}}
                                    showTitle={false}
                                    paddingStyle={"none"}
                                    type={props.fillStyle === "inversed" ? "inversed-no-fill" : "no-fill"}
                                    onPress={() => router.back()}
                                />
                            ) : props.headerLeftBtn !== undefined && props.headerLeftBtn !== "backBtn" ? (
                                <ThemedButton
                                    title={"HeaderLeftBtn"}
                                    icon={{name: props.headerLeftBtn.icon}}
                                    showTitle={false}
                                    paddingStyle={"none"}
                                    type={props.fillStyle === "inversed" ? "inversed-no-fill" : "no-fill"}
                                    onPress={props.headerLeftBtn.onPress}
                                />
                            ) : (
                                <HeaderSpacer/>
                            )}

                            {props.title ? (
                                <ThemedText type={'title'} inverseColor={props.fillStyle === "inversed"}>
                                    {props.title}
                                </ThemedText>
                            ) : null}

                            {props.headerRightBtn !== undefined ? (
                                <ThemedButton
                                    title={"HeaderRightBtn"}
                                    icon={{name: props.headerRightBtn.icon}}
                                    showTitle={false}
                                    paddingStyle={"none"}
                                    type={props.fillStyle === "inversed" ? "inversed-no-fill" : "no-fill"}
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
        </>
    );
}

