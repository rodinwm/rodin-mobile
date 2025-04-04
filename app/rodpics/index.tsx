import {ThemedView} from '@/components/base/ThemedView';
import React, {useState} from "react";
import {CameraType, CameraView, useCameraPermissions} from "expo-camera";
import {useRouter} from "expo-router";
import ScreenTemplate from '@/components/layouts/ScreenTemplate';
import {ThemedButton} from "@/components/base/ThemedButton";

export default function Page() {
    const router = useRouter();
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