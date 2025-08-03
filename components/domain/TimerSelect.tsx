import {useEffect, useState} from "react";
import {useColorScheme} from '@/utils/hooks/useColorScheme';
import {TimerPicker, TimerPickerProps} from "react-native-timer-picker";
import MaskedView from "@react-native-masked-view/masked-view"; // for transparent fade-out
import {LinearGradient} from "expo-linear-gradient";
import {FontService} from "@/utils/services/fontService";
import {FontWeightEnum, LogType} from "@/utils/enums";
import {ThemedView} from "@/components/base/ThemedView";
import {clickAudioSource, timerLogService} from "@/utils/constants";
import {useAudioPlayer} from 'expo-audio';
import {UiService} from "@/utils/services/uiService";
import {TimerValue} from "@rodinwm/rodin-models/frontend";
import {Dimensions} from "react-native";

type Props = TimerPickerProps & {
    defaultValue?: TimerValue;
    onChange?: (time: TimerValue) => void;
    onMounted?: (time: TimerValue) => void;
};

export function TimerSelect({defaultValue, onChange, onMounted, ...otherProps}: Props) {
    const [isMounted, setIsMounted] = useState(false);
    const [time, setTime] = useState<TimerValue>(defaultValue ?? {hours: 0, minutes: 0, seconds: 0});
    const colorScheme = useColorScheme();
    const timeColumnWidth = Dimensions.get("screen").width / 3.5;
    const audioPlayer = useAudioPlayer(clickAudioSource); // TODO: Find how to use this to play sound at each change

    const updateTime = (time: TimerValue) => {
        setTime(time);
        timerLogService.log({
            type: LogType.Log,
            data: ['New time selected:', time]
        });
        if (onChange) onChange(time);
    };

    useEffect(() => {
        setIsMounted(true);
        if (onMounted) onMounted(time);
    }, []);

    return isMounted ? (
        <ThemedView>
            <ThemedView
                className={"absolute w-full top-[50%] -translate-y-1/2 z-0"}
                fillStyle={"opacity-10"}
                paddingStyle={'default'}
                radiusStyle={"small"}
            />
            <TimerPicker
                padHoursWithZero={true}
                padWithNItems={1}
                hourLabel="heures"
                minuteLabel="minutes"
                secondLabel="secondes"
                maximumHours={23}
                maximumMinutes={59}
                maximumSeconds={59}
                LinearGradient={LinearGradient}
                MaskedView={MaskedView}
                initialValue={defaultValue}
                onDurationChange={updateTime}
                disableInfiniteScroll={true}
                pickerFeedback={() => {
                    UiService.hapticImpact('selection');
                }}
                styles={{
                    theme: colorScheme,
                    backgroundColor: "transparent",
                    text: {fontFamily: FontService.getMainFontStatic(FontWeightEnum.Bold)},
                    pickerItem: {
                        fontSize: 22,
                    },
                    pickerItemContainer: {
                        width: timeColumnWidth,
                        overflowX: 'visible',
                        //backgroundColor: '#FF000088', // Uncomment for debugging
                    },
                    pickerLabel: {
                        fontSize: 8,
                    },
                    pickerLabelContainer: {
                        width: '50%',
                        paddingLeft: 15,
                        marginRight: -5,
                        //backgroundColor: '#00FF0088', // Uncomment for debugging
                    },
                    pickerContainer: {
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    },
                }}
                {...otherProps}
            />
        </ThemedView>
    ) : (
        <ThemedView/>
    );
}