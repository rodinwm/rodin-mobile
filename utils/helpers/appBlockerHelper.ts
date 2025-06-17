import {
    blockSelection,
    requestAuthorization,
    ShieldActions,
    ShieldConfiguration,
    updateShield
} from "react-native-device-activity";

/**
 * Reference : https://www.npmjs.com/package/react-native-device-activity
 */
export abstract class AppBlockerHelper {
    private static readonly config: ShieldConfiguration = {
        title: "Focus activated",
        subtitle: "Cette app est bloquée",
        primaryButtonLabel: "OK",
        iconSystemName: "lock.fill",
    };

    private static readonly actions: ShieldActions = {
        primary: {type: "disableBlockAllMode", behavior: "defer"},
        secondary: {type: "dismiss", behavior: "close"},
    };

    static init() {
        requestAuthorization().then(() => {
            console.log("Device activity started.");
            this.setupShield();
        }).catch((error) => {
            console.error(error);
        });
    }

    static setupShield() {
        updateShield(this.config, this.actions);
    }

    /*
    static async selectAppsToBlock() {
        const selection = await selectActivitySelection({
            title: "Choisissez les apps",
            // ...options visuelles
        });
    }
     */

    static block(selectionId: string) {
        blockSelection({
            activitySelectionId: selectionId,
        });
    }
}