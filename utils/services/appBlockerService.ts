import {
    AuthorizationStatus,
    blockSelection,
    getAuthorizationStatus,
    ShieldActions,
    ShieldConfiguration,
    updateShield
} from "react-native-device-activity";
import {LogService} from "@/utils/services/logService";
import {LogType, PermissionResult} from "@/utils/enums";
import ReactNativeDeviceActivityModule from "react-native-device-activity/build/ReactNativeDeviceActivityModule";
import {Platform} from "react-native";

/**
 * Reference : https://www.npmjs.com/package/react-native-device-activity
 */
export abstract class AppBlockerService {
    private static readonly logService = new LogService(this.name);
    private static readonly config: ShieldConfiguration = {
        title: "Focus activated",
        subtitle: "Cette app est bloquée",
        primaryButtonLabel: "OK",
        iconSystemName: "lock.fill",
    };

    private static readonly actions: ShieldActions = {
        primary: {actions: [{type: "disableBlockAllMode"}], behavior: "defer"},
        secondary: {type: "dismiss", behavior: "close"},
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
                return getAuthorizationStatus() === AuthorizationStatus.approved;
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

    static block(selectionId: string) {
        blockSelection({
            activitySelectionId: selectionId,
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

    /*
    static async selectAppsToBlock() {
        const selection = await selectActivitySelection({
            title: "Choisissez les apps",
            // ...options visuelles
        });
    }
     */

    private static setupShield() {
        updateShield(this.config, this.actions);
    }
}