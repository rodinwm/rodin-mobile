import {OnboardingStepScreenTemplate, ThemedButton, ThemedText, ThemedView} from '@/components';
import React, {useState} from "react";
import {OnboardingStepScreenProps} from "@/utils/interfaces";
import {CGU} from "@/assets/static/cgu";
import {NativeScrollEvent, NativeSyntheticEvent, ScrollView} from "react-native";

export function ReadCGU(props: OnboardingStepScreenProps) {
    const [isScrolledToEnd, setIsScrolledToEnd] = useState(false);

    return (
        <OnboardingStepScreenTemplate
            title={"Conditions générales d'utilisation"}
            subtitle={"Acceptez vous les conditions générales d'utilisation et les politiques de Rodin ?"}
            addSpaceAtTheBottom={false}
        >
            <ThemedView className={'w-full flex-1 flex flex-col gap-2 mt-4'}>
                <ScrollView
                    nestedScrollEnabled={true}
                    scrollEventThrottle={16}
                    fadingEdgeLength={100}
                    onScroll={(event: NativeSyntheticEvent<NativeScrollEvent>) => {
                        const {layoutMeasurement, contentOffset, contentSize} = event.nativeEvent;
                        const isAtBottom = layoutMeasurement.height + contentOffset.y >= contentSize.height - 20; // Petite marge de 20 pixels
                        setIsScrolledToEnd(isAtBottom);
                    }}
                >
                    {CGU.map((item, index) => (
                        <ThemedView key={"cgu-title-" + index} className={'w-full flex flex-col gap-3 mb-6'}>
                            <ThemedText type={"h1"}>
                                {item.title}
                            </ThemedText>
                            {item.content.map((content, index) => (
                                <ThemedText key={"cgu-content-" + index} type={"default"}>
                                    {content}
                                </ThemedText>
                            ))}
                        </ThemedView>
                    ))}

                </ScrollView>
            </ThemedView>

            <ThemedButton
                title={"Accepter"}
                disabled={!isScrolledToEnd}
                onPress={props.onNextPress}
            />
        </OnboardingStepScreenTemplate>
    );
}

