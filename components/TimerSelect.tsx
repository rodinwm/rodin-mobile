import {useState} from "react";
import {TimerValue} from "@/utils/interfaces";
import {useColorScheme} from '@/utils/hooks/useColorScheme';
import {TimerPicker} from "react-native-timer-picker";
import MaskedView from "@react-native-masked-view/masked-view"; // for transparent fade-out
import {LinearGradient} from "expo-linear-gradient"; // or `import LinearGradient from "react-native-linear-gradient"`
import {Audio} from "expo-av"; // for audio feedback (click sound as you scroll)
import * as Haptics from "expo-haptics";
import {FontHelper} from "@/utils/helpers/fontHelper";
import {FontWeightEnum} from "@/utils/enums";
import {ThemedView} from "@/components/base/ThemedView";

type Props = {
    defaultValue?: TimerValue;
    onChange?: (time: TimerValue) => void;
}

export function TimerSelect({defaultValue, onChange}: Props) {
    const [time, setTime] = useState<TimerValue>(defaultValue ?? {hours: 0, minutes: 0, seconds: 0});
    const colorScheme = useColorScheme() ?? 'light';

    const updateTime = (time: TimerValue) => {
        setTime(time);
        console.info("New time select =", time)
        if (onChange) {
            onChange(time);
        }
    };

    return (
        <ThemedView>
            <TimerPicker
                padHoursWithZero={true}
                padWithNItems={1}
                hourLabel="hrs"
                minuteLabel="min"
                secondLabel="sec"
                clickSoundAsset={require("@/assets/sounds/click.mp3")}
                Audio={Audio}
                LinearGradient={LinearGradient}
                Haptics={Haptics}
                MaskedView={MaskedView}
                initialValue={defaultValue}
                onDurationChange={updateTime}
                disableInfiniteScroll={true}
                styles={{
                    theme: colorScheme,
                    backgroundColor: "transparent",
                    text: {
                        fontFamily: FontHelper.getMainFontStatic(FontWeightEnum.Bold),
                    },
                    pickerItem: {
                        fontSize: 24,
                    },
                    pickerLabel: {
                        fontSize: 14,
                    },
                    pickerContainer: {
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        //justifyContent: 'center',
                        justifyContent: 'space-between',
                        padding: 0,
                        gap: 14,
                    },
                }}
            />
            <ThemedView
                className={"absolute w-full top-[50%] -translate-y-1/2"}
                fillStyle={"opacity-10"}
                paddingStyle={'default'}
                radiusStyle={"small"}
            />
        </ThemedView>
    );
}