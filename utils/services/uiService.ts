import * as Haptics from "expo-haptics";
import {dailyTips} from "@/assets/static/daily-tips";

export abstract class UiService {
    static hapticImpact(impactType?: 'error' | 'success' | 'feedback' | 'selection') {
        if (process.env.EXPO_OS === 'ios') {
            switch (impactType) {
                case "error":
                    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error).then();
                    break;
                case "success":
                    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).then();
                    break;
                case "feedback":
                    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning).then();
                    break;
                case "selection":
                    Haptics.selectionAsync().then();
                    break;
                default:
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).then();
                    break;
            }
        }
    }

    static getTipOfTheDay() {
        return dailyTips[new Date().getDate() % dailyTips.length].text;
    }
}