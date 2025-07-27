import * as Notifications from 'expo-notifications';
import {ToastService} from "@/utils/services/toastService";
import {LogType, ToastType} from "@/utils/enums";
import {notificationLogService} from "@/utils/constants";

export abstract class NotificationService {

    static async init() {
        /*
        if (!Device.isDevice) {
            ToastService.show({
                type: ToastType.Warning,
                message: 'Les notifications push ne fonctionnent que sur un vrai appareil mobile.'
            });
            return;
        }
         */
        const pushToken = await this.requestPermission();
        this.setupNotificationHandler();
    }

    static testNotification() {
        Notifications.scheduleNotificationAsync({
            content: {
                title: "Test Notification",
                body: "Ceci est une notification de test.",
                data: {extraData: "Test data"},
            },
            trigger: {
                type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
                seconds: 1, // Trigger after 1 seconds
            },
        }).then(() => {
            notificationLogService.log({
                type: LogType.Info,
                data: ["Test notification scheduled successfully."]
            });
        }).catch(error => {
            notificationLogService.log({
                type: LogType.Error,
                data: ["Error scheduling test notification:", error]
            });
        });
    }

    private static async requestPermission(): Promise<string | null> {
        const {status: existingStatus} = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;

        if (existingStatus !== 'granted') {
            const {status} = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }

        if (finalStatus !== 'granted') {
            ToastService.show({
                type: ToastType.Error,
                message: "Permission de notifications non accordée. Veuillez l'activer dans les paramètres de l'application si vous voulez en recevoir."
            });
            return null;
        }

        const tokenData = await Notifications.getExpoPushTokenAsync();
        notificationLogService.log({
            type: LogType.Info,
            data: ['Expo Push Token:', tokenData.data]
        });

        return tokenData.data;
    }

    private static setupNotificationHandler() {
        Notifications.setNotificationHandler({
            handleNotification: async () => ({
                shouldShowAlert: true,
                shouldPlaySound: true,
                shouldSetBadge: true,
                shouldShowBanner: true,
                shouldShowList: true,
            }),
        });
    }
}