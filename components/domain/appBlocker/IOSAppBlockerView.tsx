import React, {useEffect, useState} from "react";
import {Alert} from "react-native";
import {ScreenTemplate, ThemedView} from '@/components';
import * as ReactNativeDeviceActivity from 'react-native-device-activity';
import {AppBlockerService} from "@/utils/services/appBlockerService";
import {ToastService} from "@/utils/services/toastService";
import {ToastType} from "@/utils/enums";
import {useColorScheme} from "@/utils/hooks";
import {LoadingScreen} from "@/components/layouts/LoadingScreen";

type Props = {};

export function IOSAppBlockerView({}: Props) {
    const colorScheme = useColorScheme();

    // Manage the selection state of apps/websites to block
    const [isMounted, setIsMounted] = useState(false);
    const [currentFamilyActivitySelection, setCurrentFamilyActivitySelection] = useState<string | null>(null);


    useEffect(() => {
        AppBlockerService.loadBlockedApps().then(blockedApps => {
            setCurrentFamilyActivitySelection(blockedApps);
            setIsMounted(true);
        });
    }, []);

    // Save the selection for use by the extension
    const saveSelection = async () => {
        if (!currentFamilyActivitySelection) {
            Alert.alert("Attention", "Veuillez sélectionner au moins une application ou un site web à bloquer.");
            return;
        }

        // Store the selection with a consistent ID so the extension can access it
        await AppBlockerService.saveBlockedApps(currentFamilyActivitySelection);

        ToastService.show({
            type: ToastType.Success,
            message: "Sélection enregistrée.",
        });
    };

    if (!isMounted) {
        return <LoadingScreen title={'RodShield'}/>;
    }

    return (
        <ScreenTemplate
            title={"RodShield"}
            setHeightToScreenSize={true}
            scrollEnabled={false}
            removeBodyPadding={true}
            fillStyle={"none"}
            customBackgroundColor={`bg-background-rodshield-${colorScheme}`}
            headerRightBtn={{
                icon: "Check",
                onPress: saveSelection,
            }}
        >
            <ThemedView
                className={'flex-1 flex flex-col justify-center items-center gap-3'}
                style={{flex: 1}}
                fillStyle={"none"}
            >
                {/* Native selection view for choosing apps to block */}
                <ReactNativeDeviceActivity.DeviceActivitySelectionView
                    familyActivitySelection={currentFamilyActivitySelection}
                    onSelectionChange={(event) => {
                        setCurrentFamilyActivitySelection(event.nativeEvent.familyActivitySelection);
                    }}
                    style={{
                        flex: 1,
                        width: "100%",
                        height: "100%",
                    }}
                />
            </ThemedView>
        </ScreenTemplate>
    );
}
