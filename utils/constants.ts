import {TimerValue} from "@rodinwm/rodin-models/frontend";

export const defaultWorkTime: TimerValue = {hours: 0, minutes: 30, seconds: 0};
export const defaultBreakTime: TimerValue = {hours: 0, minutes: 10, seconds: 0};

export const clickAudioSource = require("@/assets/sounds/click.mp3");

export const numbersFrom1To99: string[] = Array.from({length: 99}, (_, i) => (i + 1).toString().padStart(2, '0'));

