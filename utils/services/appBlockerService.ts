import {LogService} from "@/utils/services/logService";
import {LogType, PermissionResult} from "@/utils/enums";
import ReactNativeDeviceActivityModule from "react-native-device-activity/build/ReactNativeDeviceActivityModule";
import {Platform} from "react-native";
import * as ReactNativeDeviceActivity from "react-native-device-activity";
import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * Reference : https://www.npmjs.com/package/react-native-device-activity
 */
export abstract class AppBlockerService {
    private static readonly SELECTION_ID = "evening_block_selection";
    private static readonly SHIELD_CONFIG_ID = "evening_shield_config";
    private static readonly ACTIVITY_NAME = "evening_block";
    private static readonly logService = new LogService(this.name);
    private static readonly shieldConfig: ReactNativeDeviceActivity.ShieldConfiguration = {
        title: "Application bloquée",
        subtitle: "Cette application est actuellement indisponible",
        primaryButtonLabel: "OK",
        iconSystemName: "lock.fill",
    };

    private static readonly shieldActions: ReactNativeDeviceActivity.ShieldActions = {
        //primary: {actions: [{type: "disableBlockAllMode"}], behavior: "defer"},
        //secondary: {type: "dismiss", behavior: "close"},
        primary: {
            behavior: "close" // Just close the shield when OK is tapped
        }
    };

    static async init(): Promise<boolean> {
        switch (Platform.OS) {
            case "ios":
                return await this.initIOS();
            case "android":
                return await this.initAndroid();
            default:
                return false; // Unsupported platform
        }
    }

    static isInit() {
        switch (Platform.OS) {
            case "ios":
                return ReactNativeDeviceActivity.getAuthorizationStatus() === ReactNativeDeviceActivity.AuthorizationStatus.approved;
            case "android":
                return true;
            default:
                return false; // Unsupported platform
        }
    }

    static async requestPermissions(): Promise<PermissionResult> {
        try {
            await ReactNativeDeviceActivityModule?.requestAuthorization("individual");
            this.logService.log({
                type: LogType.Info,
                data: ["Permission for device activity granted."]
            });
            return PermissionResult.Granted;
        } catch (error) {
            this.logService.log({
                type: LogType.Error,
                data: ["Authorization request error :", error]
            });
            return PermissionResult.Denied;
        }
    }

    static async startBlock() {
        // For testing, you might want a shorter interval that starts soon:
        const testSchedule = {
            intervalStart: {
                hour: new Date().getHours(),
                minute: new Date().getMinutes(),
                second: (new Date().getSeconds() + 10) % 60, // +10 seconds from now
            },
            intervalEnd: {
                hour: new Date().getHours() + Math.floor((new Date().getMinutes() + 30) / 60),
                minute: (new Date().getMinutes() + 30) % 60, // +30 minutes from start
            },
            repeats: false, // One-time test
        };

        // Start monitoring with the schedule
        // The empty array is for event monitors (optional)
        await ReactNativeDeviceActivity.startMonitoring(
            this.ACTIVITY_NAME,
            testSchedule, // Use testSchedule for testing
            []
        );
    }

    static stopBlock() {
        ReactNativeDeviceActivity.stopMonitoring([this.ACTIVITY_NAME]);
    }

    static async selectAppsToBlock(familyActivitySelection: string) {
        await AsyncStorage.setItem(this.SELECTION_ID, familyActivitySelection);
        ReactNativeDeviceActivity.setFamilyActivitySelectionId({
            id: this.SELECTION_ID,
            familyActivitySelection: familyActivitySelection
        });
    }

    private static async initAndroid(): Promise<boolean> {
        return true;
    }

    private static async initIOS(): Promise<boolean> {
        return this.requestPermissions().then((permissionResult) => {
            switch (permissionResult) {
                case PermissionResult.Granted:
                    this.setupShield();
                    this.setupBlockActions();
                    this.logService.log({
                        type: LogType.Log,
                        data: ["Device activity started."]
                    });
                    return true;
                default:
                    this.logService.log({
                        type: LogType.Error,
                        data: ["Permission for device activity denied. AppBlockerService will not work. Please check your settings."]
                    });
                    break;
            }
            return false;
        }).catch((error) => {
            this.logService.log({
                type: LogType.Error,
                data: ["App blocker initialization error :", error]
            });
            return false;
        });
    }

    private static setupShield() {
        ReactNativeDeviceActivity.updateShield(this.shieldConfig, this.shieldActions);
    }

    private static setupBlockActions() {
        // Configure what happens when the scheduled interval begins
        ReactNativeDeviceActivity.configureActions({
            activityName: this.ACTIVITY_NAME,
            callbackName: "intervalDidStart", // Called when the scheduled time begins
            actions: [{
                type: "blockSelection",
                familyActivitySelectionId: this.SELECTION_ID, // The stored selection ID
                shieldId: this.SHIELD_CONFIG_ID // The shield to show when blocked
            }]
        });

        // Configure what happens when the scheduled interval ends
        ReactNativeDeviceActivity.configureActions({
            activityName: this.ACTIVITY_NAME,
            callbackName: "intervalDidEnd", // Called when the scheduled time ends
            actions: [{
                type: "unblockSelection",
                familyActivitySelectionId: this.SELECTION_ID // Unblock the same selection
            }]
        });
    }

}