import {TimerValue} from "@rodinwm/rodin-models/frontend";
import {LogService} from "@/utils/services/logService";
import {ModelService} from "@/utils/services/modelService";
import {LogType} from "@/utils/enums";

// Timer default values
export const defaultWorkTime: TimerValue = {hours: 0, minutes: 30, seconds: 0};
export const defaultBreakTime: TimerValue = {hours: 0, minutes: 10, seconds: 0};

// Audio sources
export const clickAudioSource = require("@/assets/sounds/click.mp3");

// Services
export const onboardingLogService = new LogService("Onboarding");
export const loginLogService = new LogService("Login");
export const authLogService = new LogService("Auth");
export const timerLogService = new LogService("Timer");
export const notificationLogService = new LogService("Notification");
const modelLogService = new LogService("ModelService");
export const modelService = new ModelService((methodName, error) => {
    modelLogService.log({
        type: LogType.Error,
        data: [`${methodName}() error:`, error]
    });
});