import {ThemedView} from '@/components/base/ThemedView';
import React, {useState} from "react";
import {useLocalSearchParams} from "expo-router";
import ScreenTemplate from '@/components/layouts/ScreenTemplate';
import {ThemedButton} from "@/components/base/ThemedButton";
import {ThemedText} from "@/components/base/ThemedText";
import {useColorScheme} from "@/utils/hooks/useColorScheme";
import LucideIcon from "@/components/base/LucideIcon";
import {TouchableOpacity} from "react-native";
import Animated from 'react-native-reanimated';
import {GestureDetector} from 'react-native-gesture-handler';
import {useDraggableGesture} from "@/utils/hooks/useDraggableGesture";

export default function Page() {
    const colorScheme = useColorScheme() ?? 'light';
    const {firstPicUri, secondPicUri} = useLocalSearchParams();
    const [isSwapped, setIsSwapped] = useState(false);
    const {gesture, animatedStyle} = useDraggableGesture();


    return (
        <ScreenTemplate
            title={"RodPics"}
            headerLeftBtn={"backBtn"}
            setHeightToScreenSize={true}
            removeBodyPadding={true}
            scrollEnabled={false}
        >
            <ThemedView
                className={'w-full h-full flex-1 flex flex-col justify-between'}
                radiusStyle={"default"}
                paddingStyle={"small"}
                fillStyle={"inversed"}
                backgroundImage={{uri: (isSwapped ? secondPicUri : firstPicUri).toString()}}
            >
                {/* Little preview */}
                <GestureDetector gesture={gesture}>
                    <Animated.View
                        style={[animatedStyle, {height: '40%', aspectRatio: 9 / 16}]}
                    >
                        <TouchableOpacity
                            className={'flex-1 shadow-lg'}
                            onPress={() => setIsSwapped(prev => !prev)}
                        >
                            <ThemedView
                                className={'w-full h-full'}
                                radiusStyle={"default"}
                                //fillStyle={"default"}
                                borderWidth={2}
                                borderStyle={"inversed"}
                                backgroundImage={{uri: (isSwapped ? firstPicUri : secondPicUri).toString()}}
                            />
                        </TouchableOpacity>
                    </Animated.View>
                </GestureDetector>

                <ThemedView
                    className={"w-full items-end"}
                >
                    <ThemedView
                        className={"w-fit flex flex-row gap-2 justify-center items-center"}
                        radiusStyle={"default"}
                        paddingStyle={"asymetric"}
                        isBackgroundBlur={true}
                    >
                        <LucideIcon name={'Brain'} size={18}/>
                        <ThemedText
                            type={'defaultExtraBold'}
                            className={"opacity-70"}
                            inverseColor={colorScheme === 'light'}
                        >
                            10h30
                        </ThemedText>
                    </ThemedView>
                </ThemedView>
            </ThemedView>

            <ThemedView
                className={"w-full flex flex-row justify-center items-center gap-3"}
                paddingStyle={"default"}
            >
                <ThemedButton
                    suffixIcon={{
                        name: 'SendHorizontal',
                        size: 30,
                        strokeWidth: 3.5,
                    }}
                    type={"no-fill"}
                    textSize={"bigTitle"}
                    title={"ENVOYER"}
                    className={"flex-1 items-center"}
                    onPress={() => {
                    }}
                />
            </ThemedView>
        </ScreenTemplate>
    );
}