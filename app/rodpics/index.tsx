import {ThemedView} from '@/components/base/ThemedView';
import React, {useRef, useState} from "react";
import {CameraType, CameraView, useCameraPermissions} from "expo-camera";
import {useRouter} from "expo-router";
import ScreenTemplate from '@/components/layouts/ScreenTemplate';
import {ThemedButton} from "@/components/base/ThemedButton";

export default function Page() {
    const router = useRouter();
    const ref = useRef<CameraView>(null);
    const [uri, setUri] = useState<string | null>(null);
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
        const photo = await ref.current?.takePictureAsync();
        console.info("RodPic's taked > ", photo?.uri!)
        setUri(photo?.uri!);
    };

    return (
        <ScreenTemplate
            title={"RodPic's"}
            headerLeftBtn={"backBtn"}
            setHeightToScreenSize={true}
            scrollEnabled={false}
        >
            <ThemedView
                className={'w-full h-full flex-1'}
                radiusStyle={"default"}
            >
                <CameraView
                    ref={ref}
                    mode={"picture"}
                    mute={true}
                    facing={facing}
                    enableTorch={enableTorch}
                    className={"rounded-lg"}
                    style={{
                        width: "100%",
                        height: "100%",
                        borderRadius: 20,
                    }}
                />
            </ThemedView>

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