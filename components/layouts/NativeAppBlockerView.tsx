import React, {useState} from "react";
import {Alert} from "react-native";
import {ThemedButton, ThemedView} from '@/components';
import * as ReactNativeDeviceActivity from 'react-native-device-activity';
import {ShieldActions} from 'react-native-device-activity';
import {Colors} from "@/utils/colors";
import {useColorScheme} from "@/utils/hooks/useColorScheme";

type Props = {}

// Constants for identifying your selections, shields and scheduled activities
const SELECTION_ID = "evening_block_selection";
const SHIELD_CONFIG_ID = "evening_shield_config";
const ACTIVITY_NAME = "evening_block";

export function NativeAppBlockerView({}: Props) {
    const colorScheme = useColorScheme() ?? 'light';

    // Step 2: Manage the selection state of apps/websites to block
    const [currentFamilyActivitySelection, setCurrentFamilyActivitySelection] =
        useState<string | null>(null);

    // Step 3: Handle selection changes from the native selection UI
    const handleSelectionChange = (event: any) => {
        // The selection is a serialized string containing the user's app selections
        setCurrentFamilyActivitySelection(event.nativeEvent.familyActivitySelection);
    };

    // Step 4: Save the selection for use by the extension
    const saveSelection = () => {
        if (!currentFamilyActivitySelection) {
            Alert.alert("Error", "Please select at least one app to block");
            return;
        }

        // Store the selection with a consistent ID so the extension can access it
        ReactNativeDeviceActivity.setFamilyActivitySelectionId({
            id: SELECTION_ID,
            familyActivitySelection: currentFamilyActivitySelection
        });

        // Now configure the blocking schedule
        configureBlocking();
    };

    // Step 5: Configure the shield (blocking screen UI)
    const configureBlocking = () => {
        // Define how the blocking screen looks
        const shieldConfig = {
            title: "App Blocked",
            subtitle: "This app is currently unavailable",
            primaryButtonLabel: "OK",
            iconSystemName: "moon.stars.fill" // SF Symbols icon name
        };

        // Define what happens when users interact with the shield
        const shieldActions: ShieldActions = {
            primary: {
                behavior: "close" // Just close the shield when OK is tapped
            }
        };

        // Apply the shield configuration
        ReactNativeDeviceActivity.updateShield(shieldConfig, shieldActions);

        // Configure what happens when the scheduled interval begins
        ReactNativeDeviceActivity.configureActions({
            activityName: ACTIVITY_NAME,
            callbackName: "intervalDidStart", // Called when the scheduled time begins
            actions: [{
                type: "blockSelection",
                familyActivitySelectionId: SELECTION_ID, // The stored selection ID
                shieldId: SHIELD_CONFIG_ID // The shield to show when blocked
            }]
        });

        // Configure what happens when the scheduled interval ends
        ReactNativeDeviceActivity.configureActions({
            activityName: ACTIVITY_NAME,
            callbackName: "intervalDidEnd", // Called when the scheduled time ends
            actions: [{
                type: "unblockSelection",
                familyActivitySelectionId: SELECTION_ID // Unblock the same selection
            }]
        });

        // Start the monitoring schedule
        startScheduledBlocking().then();
    };

    // Step 6: Define and start the blocking schedule
    const startScheduledBlocking = async () => {
        try {
            // Define when blocking should occur (7 PM to midnight daily)
            const schedule = {
                intervalStart: {hour: 19, minute: 0}, // 7:00 PM
                intervalEnd: {hour: 23, minute: 59}, // 11:59 PM
                repeats: true // Repeat this schedule daily
                // Optional: warningTime: { minutes: 5 } // Warn user 5 minutes before blocking starts
            };

            // For testing, you might want a shorter interval that starts soon:
            const testSchedule = {
                intervalStart: {
                    hour: new Date().getHours(),
                    minute: new Date().getMinutes(),
                    second: (new Date().getSeconds() + 10) % 60, // +10 seconds from now
                },
                intervalEnd: {
                    hour: new Date().getHours() + Math.floor((new Date().getMinutes() + 5) / 60),
                    minute: (new Date().getMinutes() + 5) % 60, // +5 minutes from start
                },
                repeats: false, // One-time test
            };

            // Start monitoring with the schedule
            // The empty array is for event monitors (optional)
            await ReactNativeDeviceActivity.startMonitoring(
                ACTIVITY_NAME,
                schedule, // Use testSchedule for testing
                []
            );

            Alert.alert("Success", "Blocking schedule has been set up!");
        } catch (error) {
            console.error("Failed to start scheduled blocking:", error);
            Alert.alert("Error", "Failed to set up blocking schedule");
        }
    };

    const stopScheduledBlocking = async () => {
        try {

            await ReactNativeDeviceActivity.stopMonitoring([ACTIVITY_NAME]);

            Alert.alert("Success", "Blocking schedule has been stopped!");
        } catch (error) {
            console.error("Failed to stop scheduled blocking:", error);
            Alert.alert("Error", "Failed to stop blocking schedule");
        }
    };

    return (
        <ThemedView className={'flex-1 flex flex-col justify-center items-center gap-3'} style={{flex: 1}}>
            {/* Native selection view for choosing apps to block */}
            <ReactNativeDeviceActivity.DeviceActivitySelectionView
                onSelectionChange={handleSelectionChange}
                familyActivitySelection={currentFamilyActivitySelection}
                style={{
                    flex: 1,
                    width: "100%",
                    height: "100%",
                    backgroundColor: Colors.background[colorScheme],
                }}
            />

            {/* Save button */}
            <ThemedView
                className={'w-full flex flex-row justify-center items-center gap-3 px-3'}
            >
                <ThemedButton
                    title="Start block"
                    onPress={saveSelection}
                />
                <ThemedButton
                    title="Stop block"
                    onPress={stopScheduledBlocking}
                />
            </ThemedView>
        </ThemedView>
    );
}
