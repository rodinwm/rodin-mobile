import {LucideIcon, ScreenTemplate, ThemedButton, ThemedText, ThemedView} from '@/components';
import React, {useState} from "react";
import {useLocalSearchParams} from "expo-router";
import {useColorScheme} from "@/utils/hooks/useColorScheme";
import {Alert, LayoutRectangle, TouchableOpacity} from "react-native";
import Animated from 'react-native-reanimated';
import {GestureDetector} from 'react-native-gesture-handler';
import {useDraggableGesture} from "@/utils/hooks/useDraggableGesture";
import {UIHelper} from "@/utils/helpers/UIHelper";

export default function Page() {
    const colorScheme = useColorScheme() ?? 'light';
    const {firstPicUri, secondPicUri} = useLocalSearchParams();
    const [isSwapped, setIsSwapped] = useState(false);
    const [elementLayout, setElementLayout] = useState<LayoutRectangle>({width: 0, height: 0, x: 0, y: 0});
    const [parentLayout, setParentLayout] = useState<LayoutRectangle>({width: 0, height: 0, x: 0, y: 0});
    const {gesture, animatedStyle} = useDraggableGesture({
        elementLayout: elementLayout,
        parentLayout: parentLayout,
        padding: 15
    });


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
                fillStyle={"inversed"}
                backgroundImage={{uri: (isSwapped ? secondPicUri : firstPicUri).toString()}}
                onLayout={(e) => setParentLayout(e.nativeEvent.layout)}
            >
                {/* Little preview */}
                <GestureDetector gesture={gesture}>
                    <Animated.View
                        style={[animatedStyle, {
                            height: '40%',
                            aspectRatio: 9 / 16,
                            position: 'absolute',
                            zIndex: 1
                        }]}
                        onLayout={(e) => setElementLayout(e.nativeEvent.layout)}
                    >
                        <TouchableOpacity
                            className={'flex-1 shadow-lg'}
                            onPress={() => {
                                UIHelper.hapticImpact();
                                setIsSwapped(prev => !prev);
                            }}
                        >
                            <ThemedView
                                className={'w-full h-full'}
                                radiusStyle={"default"}
                                borderWidth={2}
                                borderStyle={"inversed"}
                                backgroundImage={{uri: (isSwapped ? firstPicUri : secondPicUri).toString()}}
                            />
                        </TouchableOpacity>
                    </Animated.View>
                </GestureDetector>

                <ThemedView
                    className={"w-full h-full flex flex-row justify-end items-end"}
                    paddingStyle={"default"}
                >
                    <ThemedView
                        className={"w-full flex flex-row justify-between items-end"}
                    >
                        <ThemedText
                            type={'defaultExtraBold'}
                            inverseColor={colorScheme === 'light'}
                        >
                            @mvxence
                        </ThemedText>

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
                        Alert.alert(`Envoi de la Rodpic réussi !`);
                    }}
                />
            </ThemedView>
        </ScreenTemplate>
    );
}