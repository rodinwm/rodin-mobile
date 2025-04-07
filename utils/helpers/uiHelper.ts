import * as Haptics from "expo-haptics";

export abstract class UIHelper {
    static hapticImpact(impactType?: 'error') {
        if (process.env.EXPO_OS === 'ios') {
            switch (impactType) {
                case "error":
                    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error).then();
                    break;
                default:
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).then();
                    break;
            }
        }
    }
}