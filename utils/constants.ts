import {TimerValue} from "@rodinwm/rodin-models/frontend";
import {LogService} from "@/utils/services/logService";
import {ModelService} from "@/utils/services/modelService";
import {LogType} from "@/utils/enums";

export const defaultWorkTime: TimerValue = {hours: 0, minutes: 30, seconds: 0};
export const defaultBreakTime: TimerValue = {hours: 0, minutes: 10, seconds: 0};
export const clickAudioSource = require("@/assets/sounds/click.mp3");

export const onboardingLogService = new LogService("Onboarding");
const modelLogService = new LogService("ModelService");

export const modelService = new ModelService((methodName, error) => {
    modelLogService.log({
        type: LogType.Error,
        data: [`${methodName}() error:`, error]
    });
});