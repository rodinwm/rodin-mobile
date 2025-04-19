import {useState} from "react";
import {ThemedView} from "@/components/base/ThemedView";
import {TimerValue} from "@/utils/interfaces";
import {useColorScheme} from '@/utils/hooks/useColorScheme';
import {RodinWheelPicker} from "@/components/RodinWheelPicker";

const HOURS = Array.from({length: 24}, (_, index) => {
    const hour = index.toString();
    //return hour;
    return hour.length === 2 ? hour : '0' + hour;
});
const MINUTES = Array.from({length: 60}, (_, index) => {
    const minute = index.toString();
    //return minute;
    return minute.length === 2 ? minute : '0' + minute;
});

interface Props {
    defaultValue?: TimerValue;
    onChange?: (time: TimerValue) => void;
}

export function TimerSelect({defaultValue, onChange}: Props) {
    const [time, setTime] = useState<TimerValue>(defaultValue ?? {hour: 0, minute: 0, second: 0});
    const colorScheme = useColorScheme() ?? 'light';

    const updateTime = (time: TimerValue) => {
        setTime(time);
        console.info("New time select =", time)
        if (onChange) {
            onChange(time);
        }
    };

    return (
        <ThemedView
            //borderStyle={"default"}
            //fillStyle={"opacity-15"}
            radiusStyle={"default"}
            className={'w-full flex flex-col items-center overflow-hidden'}
        >
            {/*
            <ThemedView
                fillStyle={"opacity-15"}
                className={'w-full flex flex-row items-center border-b'}
                style={{borderColor: Colors.foreground[colorScheme] + '33'}}
            >
                <ThemedText type={"defaultSemiBold"} className={"flex-1 text-center"}>Heures</ThemedText>
                <ThemedText type={"defaultSemiBold"} className={"flex-1 text-center"}>Minutes</ThemedText>
                <ThemedText type={"defaultSemiBold"} className={"flex-1 text-center"}>Secondes</ThemedText>
            </ThemedView>
            */}
            <ThemedView className={'flex flex-row items-center'}>
                <RodinWheelPicker
                    options={HOURS}
                    selectedIndex={time.hour}
                    isLeftCornerRounded={true}
                    onChange={(hour) => updateTime({...time, hour})}
                />

                <RodinWheelPicker
                    options={MINUTES}
                    selectedIndex={time.minute}
                    onChange={(minute) => updateTime({...time, minute})}
                />

                <RodinWheelPicker
                    options={MINUTES}
                    selectedIndex={time.second}
                    isRightCornerRounded={true}
                    onChange={(second) => updateTime({...time, second})}
                />
            </ThemedView>
        </ThemedView>
    );
}