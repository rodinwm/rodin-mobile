import {Platform} from "react-native";
import {PERMISSIONS, request} from 'react-native-permissions';
import {LogService} from "@/utils/services/logService";
import {LogType} from "@/utils/enums";
import {AppBlockerService} from "@/utils/services/appBlockerService";

export abstract class PermissionHelper {
    private static readonly logService = new LogService(this.name);

    static async requestAllPermissions() {
        try {
            switch (Platform.OS) {
                case "ios":
                    AppBlockerService.requestPermissions().then(() => {
                    });
                    break;
                case "android":
                    request(PERMISSIONS.ANDROID.CAMERA).then(() => {
                    });
                    break;
                default:
                    break;
            }
        } catch (error) {
            this.logService.log({
                type: LogType.Error,
                data: ["Permissions request error :", error]
            });
        }
    }
}