import {ThemedView} from "@/components/base/ThemedView";
import {useColorScheme} from "@/utils/hooks/useColorScheme";
import {LucideIcon, ThemedText} from "@/components";
import React, {useState} from "react";
import {GestureDetector} from "react-native-gesture-handler";
import Animated from "react-native-reanimated";
import {LayoutRectangle, TouchableOpacity} from "react-native";
import {UiService} from "@/utils/services/uiService";
import {useDraggableGesture} from "@/utils/hooks";
import {RodpicService} from "@/utils/services/rodpicService";

type Props = {
    blurred?: boolean;
    user: {
        pseudo: string;
        firstname: string;
        lastname: string;
    };
    rodpic: {
        firstPicUri: string;
        secondPicUri: string;
        date: Date;
    };
};

export function CommunityFeedPost(props: Props) {
    const colorScheme = useColorScheme();
    const [isSwapped, setIsSwapped] = useState(false);
    const [elementLayout, setElementLayout] = useState<LayoutRectangle>({width: 0, height: 0, x: 0, y: 0});
    const [parentLayout, setParentLayout] = useState<LayoutRectangle>({width: 0, height: 0, x: 0, y: 0});
    const {gesture, animatedStyle} = useDraggableGesture({
        elementLayout: elementLayout,
        parentLayout: parentLayout,
        padding: 10
    });

    return (
        <ThemedView
            className={'w-full flex flex-col items-center gap-3'}
        >
            {/* User Info */}
            <ThemedView
                className={'w-full flex flex-row items-center gap-3'}
            >
                <ThemedView
                    className={'flex justify-center items-center w-fit'}
                    fillStyle={"inversed"}
                    paddingStyle={"small"}
                    radiusStyle={"full"}
                >
                    <LucideIcon name={"User"} inverseColor={true}/>
                </ThemedView>

                <ThemedView
                    className={'w-full flex flex-col'}
                >
                    <ThemedText type={'default'}>{`${props.user.firstname} ${props.user.lastname}`}</ThemedText>
                    <ThemedText type={'miniBold'}>{`@${props.user.pseudo}`}</ThemedText>
                </ThemedView>
            </ThemedView>

            {/* Post Image */}
            <ThemedView
                className={'w-full h-96 flex-1 flex flex-col justify-between'}
                style={{
                    height: 500,
                }}
                radiusStyle={"default"}
                fillStyle={"inversed"}
                backgroundImage={{
                    uri: isSwapped
                        ? RodpicService.decodeBase64ToUri(props.rodpic.secondPicUri)
                        : RodpicService.decodeBase64ToUri(props.rodpic.firstPicUri)
                }}
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
                                backgroundImage={{
                                    uri: isSwapped
                                        ? RodpicService.decodeBase64ToUri(props.rodpic.firstPicUri)
                                        : RodpicService.decodeBase64ToUri(props.rodpic.secondPicUri)
                                }}
                            />
                        </TouchableOpacity>
                    </Animated.View>
                </GestureDetector>

                <ThemedView
                    className={"w-full h-full flex flex-row justify-end items-end"}
                    paddingStyle={"small"}
                >
                    <ThemedView
                        className={"w-full flex flex-row justify-between items-end"}
                    >

                        <ThemedView
                            className={"w-fit flex flex-row gap-1 justify-center items-center"}
                            radiusStyle={"default"}
                            paddingStyle={"small"}
                            isBackgroundBlur={true}
                        >
                            <LucideIcon name={'Brain'} size={12} inverseColor={colorScheme === 'light'}/>
                            <ThemedText
                                type={'miniBold'}
                                className={"opacity-70"}
                                inverseColor={colorScheme === 'light'}
                            >
                                10h30
                            </ThemedText>
                        </ThemedView>
                    </ThemedView>
                </ThemedView>

                <ThemedView
                    className={`${props.blurred ? 'flex' : 'hidden'} flex-col justify-center items-center w-full h-full p-3 gap-3`}
                    style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 2}}
                    isBackgroundBlur={true}
                >
                    <ThemedText type={"logo"} inverseColor={colorScheme === 'light'}>
                        <LucideIcon
                            name={"Lock"}
                            size={48}
                            inverseColor={colorScheme === 'light'}
                        />
                    </ThemedText>
                    <ThemedView className={'flex flex-col jusitfy-center items-centers gap-1'}>
                        <ThemedText
                            type={"title"}
                            className={"text-center"}
                            inverseColor={colorScheme === 'light'}
                        >
                            RodPic vérouillée
                        </ThemedText>
                        <ThemedText
                            type={"miniBold"}
                            className={"opacity-75 text-center"}
                            inverseColor={colorScheme === 'light'}
                        >
                            Fait toi aussi des sessions de travail et partage-les pour débloquer les rodpics de tes amis
                            !
                        </ThemedText>
                    </ThemedView>
                </ThemedView>
            </ThemedView>
        </ThemedView>
    );
}

