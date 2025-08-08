import {LucideIcon, ScreenTemplate, ThemedButton, ThemedText, ThemedView} from '@/components';
import React, {useState} from "react";
import {useLocalSearchParams, useRouter} from "expo-router";
import {useColorScheme} from "@/utils/hooks/useColorScheme";
import {Alert, LayoutRectangle, TouchableOpacity} from "react-native";
import Animated from 'react-native-reanimated';
import {GestureDetector} from 'react-native-gesture-handler';
import {useDraggableGesture} from "@/utils/hooks/useDraggableGesture";
import {UiService} from "@/utils/services/uiService";
import {useAuthUser} from "@/utils/hooks/useAuthUser";
import {FriendData} from "@/utils/types";
import {ApiService} from "@/utils/services/apiService";
import {HttpStatusCode} from "axios";
import {communityLogService} from "@/utils/constants";
import {LogType, ToastType} from "@/utils/enums";
import {ToastService} from "@/utils/services/toastService";

export default function Page() {
    const router = useRouter();
    const colorScheme = useColorScheme();
    const {authUser} = useAuthUser({});
    const {firstPicUri, secondPicUri} = useLocalSearchParams();
    const [isSwapped, setIsSwapped] = useState(false);
    const [elementLayout, setElementLayout] = useState<LayoutRectangle>({width: 0, height: 0, x: 0, y: 0});
    const [parentLayout, setParentLayout] = useState<LayoutRectangle>({width: 0, height: 0, x: 0, y: 0});
    const {gesture, animatedStyle} = useDraggableGesture({
        elementLayout: elementLayout,
        parentLayout: parentLayout,
        padding: 15
    });
    const [isLoading, setIsLoading] = useState({
        publishRodpic: false,
    });

    const publishRodpic = async (token: string, friend: FriendData) => {
        setIsLoading(prev => ({...prev, publishRodpic: true}));

        try {
            const response = await ApiService.publishRodpic(token, {
                firstPic: firstPicUri.toString(),
                secondPic: secondPicUri.toString(),
                date: Date.now(),
            });

            switch (response.status) {
                case HttpStatusCode.Created:
                    communityLogService.log({
                        type: LogType.Log,
                        data: ['Rodpic successfully published:', response.data]
                    });
                    ToastService.show({
                        type: ToastType.Success,
                        message: `Rodpic publiée !.`,
                    });
                    router.back();
                    break;
                default:
                    communityLogService.log({
                        type: LogType.Error,
                        data: ['Error publishing Rodpic:', response.data]
                    });
                    ToastService.show({
                        type: ToastType.Error,
                        message: `Erreur lors de la publication de votre Rodpic.`,
                    });
                    break;
            }
        } catch (error) {
            communityLogService.log({
                type: LogType.Error,
                data: ['Error whend publishing rodpic:', error]
            });
        } finally {
            setIsLoading(prev => ({...prev, publishRodpic: false}));
        }
    };


    return (
        <ScreenTemplate
            title={"RodPics"}
            headerLeftBtn={"backBtn"}
            setHeightToScreenSize={true}
            removeBodyPadding={true}
            scrollEnabled={false}
            fillStyle={colorScheme === 'light' ? 'inversed' : 'default'}
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
                                UiService.hapticImpact();
                                setIsSwapped(prev => !prev);
                            }}
                        >
                            <ThemedView
                                className={'w-full h-full'}
                                radiusStyle={"default"}
                                borderWidth={2}
                                borderStyle={colorScheme === 'light' ? 'default' : "inversed"}
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
                            @{authUser ? authUser.pseudo : "Utilisateur inconnu"}
                        </ThemedText>

                        <ThemedView
                            className={"w-fit flex flex-row gap-2 justify-center items-center"}
                            radiusStyle={"default"}
                            paddingStyle={"asymetric"}
                            isBackgroundBlur={true}
                        >
                            <LucideIcon name={'Brain'} size={18} inverseColor={colorScheme === 'light'}/>
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
                    type={colorScheme === 'light' ? "inversed-no-fill" : "no-fill"}
                    textSize={"bigTitle"}
                    title={"ENVOYER"}
                    className={"flex-1 items-center"}
                    onPress={() => {
                        UiService.hapticImpact('feedback');
                        Alert.alert(
                            `Rodpics publiée !`,
                            'Vos amis pourront voir vos progrès', [
                                {
                                    text: "Ok",
                                    onPress: () => {
                                        router.back();
                                    }
                                }
                            ]);
                    }}
                />
            </ThemedView>
        </ScreenTemplate>
    );
}