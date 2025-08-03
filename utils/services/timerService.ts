import {TimerValue} from "@rodinwm/rodin-models/frontend";

export abstract class TimerService {

    static convertSessionTimeInSeconds({workTime, breakTime}: {
        workTime: TimerValue,
        breakTime: TimerValue
    }) {
        return {
            workTimeInSeconds: workTime.hours * 3600 + workTime.minutes * 60 + workTime.seconds,
            breakTimeInSeconds: breakTime.hours * 3600 + breakTime.minutes * 60 + breakTime.seconds
        };
    }

    static convertSessionTimeStringInSeconds({stringWorkTime, stringBreakTime}: {
        stringWorkTime: string,
        stringBreakTime: string
    }) {
        return this.convertSessionTimeInSeconds({
            workTime: JSON.parse(stringWorkTime) as TimerValue,
            breakTime: JSON.parse(stringBreakTime) as TimerValue
        });
    }

}