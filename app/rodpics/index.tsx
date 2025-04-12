import {ThemedView} from '@/components/base/ThemedView';
import React, {useRef, useState} from "react";
import {CameraType, CameraView, useCameraPermissions} from "expo-camera";
import {useRouter} from "expo-router";
import ScreenTemplate from '@/components/layouts/ScreenTemplate';
import {ThemedButton} from "@/components/base/ThemedButton";
import {Toast} from "toastify-react-native";

export default function Page() {
    const router = useRouter();
    //const frontCamRef = useRef<CameraView>(null);
    const backCamRef = useRef<CameraView>(null);
    const [facing, setFacing] = useState<CameraType>('back');
    const [enableTorch, setEnableTorch] = useState(false);
    const [permission, requestPermission] = useCameraPermissions();
    const [isFlashOn, setIsFlashOn] = useState(false);

    const toggleTorch = () => {
        setEnableTorch(prev => !prev);
    };

    const toggleFacing = () => {
        setFacing(current => (current === 'back' ? 'front' : 'back'));
    }

    const takePicture = async () => {
        const backPic = await backCamRef.current?.takePictureAsync();
        //const frontPic = await frontCamRef.current?.takePictureAsync();

        if (backPic) {// && frontPic) {
            //frontCamRef.current?.pausePreview();

            console.info("RodPic's taked");

            router.push({
                pathname: '/rodpics/preview',
                params: {
                    //frontPicUri: frontPic.uri,
                    backPicUri: backPic.uri,
                }
            });
        } else {
            Toast.error("Erreur lors de la prise");
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
                    ref={backCamRef}
                    mode={"picture"}
                    mute={true}
                    facing={facing}
                    enableTorch={enableTorch}
                    style={{
                        padding: 10,
                        width: "100%",
                        height: "100%",
                    }}
                >
                    {/*
                <ThemedView className={'w-1/3 h-1/3'} radiusStyle={"default"}>
                    <CameraView
                        ref={frontCamRef}
                        mode={"picture"}
                        mute={true}
                        facing={"front"}
                        style={{
                            width: "100%",
                            height: "100%",

                        }}
                    />
                </ThemedView>
                */}
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
                />
                <ThemedButton
                    title={"Shoot"}
                    icon={{name: 'Camera'}}
                    showTitle={false}
                    type={"default"}
                    radiusStyle={"full"}
                    paddingStyle={"uniform-big"}
                    onPress={takePicture}
                />
                <ThemedButton
                    title={"Changer de caméra"}
                    icon={{name: 'RefreshCcw'}}
                    showTitle={false}
                    isBackgroundBlur={true}
                    type={"no-fill"}
                    paddingStyle={"uniform"}
                    onPress={toggleFacing}
                />
            </ThemedView>
        </ScreenTemplate>
    );
}