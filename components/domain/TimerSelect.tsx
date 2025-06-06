import {useEffect, useState} from "react";
import {useColorScheme} from '@/utils/hooks/useColorScheme';
import {TimerPicker, TimerPickerProps} from "react-native-timer-picker";
import MaskedView from "@react-native-masked-view/masked-view"; // for transparent fade-out
import {LinearGradient} from "expo-linear-gradient"; // or `import LinearGradient from "react-native-linear-gradient"`
import {FontHelper} from "@/utils/helpers/fontHelper";
import {FontWeightEnum} from "@/utils/enums";
import {ThemedView} from "@/components/base/ThemedView";
import {clickAudioSource} from "@/utils/constants";
import {useAudioPlayer} from 'expo-audio';
import {UIHelper} from "@/utils/helpers/UIHelper";
import {TimerValue} from "@rodinwm/rodin-models";

type Props = TimerPickerProps & {
    defaultValue?: TimerValue;
    onChange?: (time: TimerValue) => void;
}

export function TimerSelect({
                                defaultValue,
                                onChange,
                                ...otherProps
                            }: Props
) {
    const [isMounted, setIsMounted] = useState(false);
    const [time, setTime] = useState<TimerValue>(defaultValue ?? {hours: 0, minutes: 0, seconds: 0});
    const colorScheme = useColorScheme() ?? 'light';
    const audioPlayer = useAudioPlayer(clickAudioSource); // TODO: Find how to use this to play sound at each change

    const updateTime = (time: TimerValue) => {
        setTime(time);
        console.info("New time select =", time)
        if (onChange) {
            onChange(time);
        }
    };

    useEffect(() => {
        setIsMounted(true);
    }, []);

    return isMounted ? (
        <ThemedView>
            <TimerPicker
                padHoursWithZero={true}
                padWithNItems={1}
                hourLabel="heures"
                minuteLabel="minutes"
                secondLabel="sec"
                maximumHours={23}
                maximumMinutes={59}
                maximumSeconds={59}
                LinearGradient={LinearGradient}
                MaskedView={MaskedView}
                initialValue={defaultValue}
                onDurationChange={updateTime}
                disableInfiniteScroll={true}
                pickerFeedback={() => {
                    UIHelper.hapticImpact('selection');
                }}
                styles={{
                    theme: colorScheme,
                    backgroundColor: "transparent",
                    text: {fontFamily: FontHelper.getMainFontStatic(FontWeightEnum.Bold)},
                    pickerItem: {fontSize: 24, width: 'auto'},
                    pickerItemContainer: {width: 105},
                    pickerLabel: {fontSize: 12},
                    pickerLabelContainer: {width: 50, marginRight: -20},
                    pickerContainer: {
                        width: '97.5%',
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: 0,
                        gap: 14,
                    },
                }}
                {...otherProps}
            />
            <ThemedView
                className={"absolute w-full top-[50%] -translate-y-1/2"}
                fillStyle={"opacity-10"}
                paddingStyle={'default'}
                radiusStyle={"small"}
            />
        </ThemedView>
    ) : (
        <ThemedView/>
    );
}