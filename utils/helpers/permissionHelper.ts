import {Platform} from "react-native";
import {PERMISSIONS, request} from 'react-native-permissions';

export abstract class PermissionHelper {
    static async getAllPermissions() {
        try {
            switch (Platform.OS) {
                case "ios":
                    request(PERMISSIONS.IOS.CAMERA).then(() => {
                    });
                    break;
                case "android":
                    request(PERMISSIONS.ANDROID.CAMERA).then(() => {
                    });
                    break;
                default:
                    break;
            }
        } catch (err) {
            console.error(err);
        }
        return null;
    }
}