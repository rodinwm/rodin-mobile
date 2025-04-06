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
            title={"RodPic's"}
            headerLeftBtn={"backBtn"}
            setHeightToScreenSize={true}
            removeBodyPadding={true}
            scrollEnabled={false}
        >
            <CameraView
                ref={backCamRef}
                mode={"picture"}
                mute={true}
                facing={facing}
                enableTorch={enableTorch}
                style={{
                    flex: 1,
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

            <ThemedView className={'w-full flex flex-row gap-6 justify-center items-center'}>
                <ThemedButton
                    title={"Flash"}
                    icon={{name: enableTorch ? "ZapOff" : 'Zap'}}
                    type={"outlined"}
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
                    icon={{name: 'RefreshCcwDot'}}
                    showTitle={false}
                    isBackgroundBlur={true}
                    type={"outlined"}
                    paddingStyle={"uniform"}
                    onPress={toggleFacing}
                />
            </ThemedView>
        </ScreenTemplate>
    );
}