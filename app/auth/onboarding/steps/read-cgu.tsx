import {ThemedView} from '@/components/base/ThemedView';
import React from "react";
import {ThemedButton} from "@/components/base/ThemedButton";
import OnboardingStepScreenTemplate from "@/components/layouts/OnboardingStepScreenTemplate";
import {OnboardingStepScreenProps} from "@/utils/interfaces";
import {ThemedText} from "@/components/base/ThemedText";
import {CGU} from "@/assets/static/cgu";
import {ScrollView} from "react-native";

export default function ReadCGU(props: OnboardingStepScreenProps) {

    return (
        <OnboardingStepScreenTemplate
            title={"Conditions générales d'utilisation"}
            subtitle={"Acceptez vous les conditions générales d'utilisation et les politiques de Rodin ?"}
            addSpaceAtTheBottom={false}
        >
            <ThemedView className={'w-full flex-1 flex flex-col gap-2 mt-4'}>
                <ScrollView nestedScrollEnabled={true}>
                    {CGU.map((item, index) => (
                        <ThemedView key={"cgu-title-" + index} className={'w-full flex flex-col gap-3'}>
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
                onPress={props.onNextPress}
            />
        </OnboardingStepScreenTemplate>
    );
}

