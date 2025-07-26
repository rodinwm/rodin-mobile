import React, {useEffect, useState} from "react";
import {Alert} from "react-native";
import {ScreenTemplate, ThemedView} from '@/components';
import * as ReactNativeDeviceActivity from 'react-native-device-activity';
import {AppBlockerService} from "@/utils/services/appBlockerService";
import {ToastService} from "@/utils/services/toastService";
import {ToastType} from "@/utils/enums";

type Props = {};

export function IOSAppBlockerView({}: Props) {

    // Manage the selection state of apps/websites to block
    const [currentFamilyActivitySelection, setCurrentFamilyActivitySelection] = useState<string | null>(null);


    useEffect(() => {
        AppBlockerService.loadBlockedApps().then(blockedApps => {
            setCurrentFamilyActivitySelection(blockedApps);
        });
    }, []);

    // Save the selection for use by the extension
    const saveSelection = async () => {
        if (!currentFamilyActivitySelection) {
            Alert.alert("Attention", "Veuillez sélectionner au moins une application ou un site web à bloquer.");
            return;
        }

        // Store the selection with a consistent ID so the extension can access it
        await AppBlockerService.savedBlockedApps(currentFamilyActivitySelection);

        ToastService.show({
            type: ToastType.Success,
            message: "Sélection enregistrée.",
        });

        //startScheduledBlocking().then();
    };

    // Define and start the blocking schedule
    const startScheduledBlocking = async () => {
        try {
            await AppBlockerService.startBlock();
            Alert.alert("Success", "Blocking schedule has been set up!");
        } catch (error) {
            console.error("Failed to start scheduled blocking:", error);
            Alert.alert("Error", "Failed to set up blocking schedule");
        }
    };

    const stopScheduledBlocking = () => {
        try {
            AppBlockerService.stopBlock();
            Alert.alert("Success", "Blocking schedule has been stopped!");
        } catch (error) {
            console.error("Failed to stop scheduled blocking:", error);
            Alert.alert("Error", "Failed to stop blocking schedule");
        }
    };

    return (
        <ScreenTemplate
            title={"RodShield"}
            setHeightToScreenSize={true}
            scrollEnabled={false}
            removeBodyPadding={true}
            fillStyle={"none"}
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
                    onSelectionChange={(event) => {
                        setCurrentFamilyActivitySelection(event.nativeEvent.familyActivitySelection);
                    }}
                    familyActivitySelection={currentFamilyActivitySelection}
                    style={{
                        flex: 1,
                        width: "100%",
                        height: "100%",
                    }}
                />

                {/* Save button
                <ThemedView
                    className={'w-full flex flex-row justify-center items-center gap-3 px-3'}
                >
                    <ThemedButton
                        title="Stop block"
                        onPress={stopScheduledBlocking}
                    />
                </ThemedView>
                 */}
            </ThemedView>
        </ScreenTemplate>
    );
}
