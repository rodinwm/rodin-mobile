import {ThemedView} from '@/components/base/ThemedView';
import React, {useRef, useState} from "react";
import {CameraType, CameraView, useCameraPermissions} from "expo-camera";
import {useRouter} from "expo-router";
import ScreenTemplate from '@/components/layouts/ScreenTemplate';
import {ThemedButton} from "@/components/base/ThemedButton";
import {Toast} from "toastify-react-native";
import {ThemedText} from "@/components/base/ThemedText";

export default function Page() {
    const router = useRouter();
    const camRef = useRef<CameraView>(null);
    const [facing, setFacing] = useState<CameraType>('back');
    const [enableTorch, setEnableTorch] = useState(false);
    const [permission, requestPermission] = useCameraPermissions();
    const defaultCountdown = 3; // 3 secondes entre chaque prise de photo
    const [countdown, setCountdown] = useState(0);
    const [isCapturing, setIsCapturing] = useState(false);

    const toggleTorch = () => setEnableTorch(prev => !prev);
    const toggleFacing = () => setFacing(current => (current === 'back' ? 'front' : 'back'));

    const takePicture = async () => {
        if (!camRef.current) return;

        try {
            setIsCapturing(true);
            const firstPic = await camRef.current.takePictureAsync();

            setCountdown(defaultCountdown);
            const countdownInterval = setInterval(() => {
                setCountdown(prev => {
                    if (prev !== 0 && prev > 1) return prev - 1;
                    clearInterval(countdownInterval);
                    return 0;
                });
            }, 1000);

            setFacing(prev => prev === 'back' ? 'front' : 'back');
            await new Promise(resolve => setTimeout(resolve, defaultCountdown * 1000));  // ⏱️ attendre [countdown] secondes

            const secondPic = await camRef.current.takePictureAsync();

            router.push({
                pathname: '/rodpics/preview',
                params: {
                    firstPicUri: firstPic!.uri,
                    secondPicUri: secondPic!.uri
                }
            });
        } catch (error) {
            console.error("Erreur lors de la prise : ", error);
            Toast.error("Erreur lors de la prise de vue.");
        } finally {
            setIsCapturing(false);
        }
    };

    return (
        <ScreenTemplate
            title={"RodPics"}
            headerLeftBtn={"backBtn"}
            setHeightToScreenSize={true}
            removeBodyPadding={true}
            scrollEnabled={false}
        >
            <ThemedView className={'w-full h-full flex-1'} radiusStyle={"default"}>
                <CameraView
                    ref={camRef}
                    mode={"picture"}
                    mute={true}
                    facing={facing}
                    enableTorch={enableTorch}
                    mirror={facing === 'front'}
                    style={{width: "100%", height: "100%"}}
                >
                    {countdown !== 0 && (
                        <ThemedView
                            className={"w-full h-full flex flex-col justify-center items-center bg-black/40"}>
                            <ThemedText type={"logo"}>
                                {countdown}
                            </ThemedText>
                            <ThemedText type={"subtitle"} className={"opacity-75"}>
                                Capture ton travail
                            </ThemedText>
                        </ThemedView>
                    )}
                </CameraView>
            </ThemedView>

            <ThemedView className={'w-full flex flex-row gap-14 justify-center items-center'}>
                <ThemedButton
                    title={"Flash"}
                    icon={{name: enableTorch ? "ZapOff" : 'Zap'}}
                    type={"no-fill"}
                    isBackgroundBlur={true}
                    paddingStyle={"uniform"}
                    showTitle={false}
                    onPress={toggleTorch}
                    disabled={isCapturing}
                />
                <ThemedButton
                    title={"Shoot"}
                    icon={{name: 'Camera'}}
                    showTitle={false}
                    type={"default"}
                    radiusStyle={"full"}
                    paddingStyle={"uniform-big"}
                    onPress={takePicture}
                    disabled={isCapturing}
                />
                <ThemedButton
                    title={"Changer de caméra"}
                    icon={{name: 'RefreshCcw'}}
                    showTitle={false}
                    isBackgroundBlur={true}
                    type={"no-fill"}
                    paddingStyle={"uniform"}
                    onPress={toggleFacing}
                    disabled={isCapturing}
                />
            </ThemedView>
        </ScreenTemplate>
    );
}
