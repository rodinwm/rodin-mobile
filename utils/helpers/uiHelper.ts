import * as Haptics from "expo-haptics";

export abstract class UIHelper {
    static hapticImpact(impactType?: 'error' | 'success') {
        if (process.env.EXPO_OS === 'ios') {
            switch (impactType) {
                case "error":
                    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error).then();
                    break;
                case "success":
                    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).then();
                    break;
                default:
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).then();
                    break;
            }
        }
    }
}