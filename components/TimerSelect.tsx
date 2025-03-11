import {useState} from "react";
import {ThemedView} from "@/components/base/ThemedView";
import {WheelStyle} from "@/utils/interfaces";
import WheelPicker from "react-native-wheely";
import {FontHelper} from "@/utils/helpers/fontHelper";
import {FontWeightEnum} from "@/utils/enums";
import {Colors} from "@/utils/colors";
import {useColorScheme} from '@/utils/hooks/useColorScheme';
import {ThemedText} from "@/components/base/ThemedText";

const HOURS = Array.from({length: 24}, (_, index) => {
    const hour = index.toString();
    return hour.length === 2 ? hour : '0' + hour;
});
const MINUTES = Array.from({length: 60}, (_, index) => {
    const minute = index.toString();
    return minute.length === 2 ? minute : '0' + minute;
});

interface TimerSelectProps {
    onChange?: (time: { hour: number; minute: number; second: number }) => void;
}

export function TimerSelect({onChange}: TimerSelectProps) {
    const [hour, setHour] = useState(0);
    const [minute, setMinute] = useState(0);
    const [second, setSecond] = useState(0);
    const colorScheme = useColorScheme() ?? 'light';

    const updateTime = (newHour: number, newMinute: number, newSecond: number) => {
        setHour(newHour);
        setMinute(newMinute);
        setSecond(newSecond);
        if (onChange) {
            onChange({hour: newHour, minute: newMinute, second: newSecond});
        }
    };

    const wheelStyle: WheelStyle = {
        visibleRest: 1,
        itemTextStyle: {
            fontFamily: FontHelper.getMainFontStatic(FontWeightEnum.Bold),
            fontSize: 20,
            color: Colors.foreground[colorScheme],
        },
        containerStyle: {
            width: '100%',
            flex: 1,
        },
        selectedIndicatorStyle: {
            backgroundColor: Colors.background[colorScheme],
            borderRadius: 10,
        },
        flatListProps: {
            nestedScrollEnabled: true,
        }
    }

    return (
        <ThemedView
            outlined={true}
            fillStyle={"opacity-15"}
            radiusStyle={"default"}
            className={'w-full flex flex-col items-center overflow-hidden'}
        >
            <ThemedView
                fillStyle={"opacity-15"}
                className={'w-full flex flex-row items-center border-b'}
                style={{borderColor: Colors.foreground[colorScheme] + '33'}}
            >
                <ThemedText type={"defaultSemiBold"} className={"flex-1 text-center"}>Heures</ThemedText>
                <ThemedText type={"defaultSemiBold"} className={"flex-1 text-center"}>Minutes</ThemedText>
                <ThemedText type={"defaultSemiBold"} className={"flex-1 text-center"}>Secondes</ThemedText>
            </ThemedView>
            <ThemedView className={'flex flex-row items-center gap-2 px-2'}>
                <WheelPicker
                    options={HOURS}
                    selectedIndex={hour}
                    visibleRest={wheelStyle.visibleRest}
                    itemTextStyle={wheelStyle.itemTextStyle}
                    flatListProps={wheelStyle.flatListProps}
                    containerStyle={wheelStyle.containerStyle}
                    selectedIndicatorStyle={wheelStyle.selectedIndicatorStyle}
                    onChange={(value) => updateTime(value, minute, second)}
                />

                <WheelPicker
                    options={MINUTES}
                    selectedIndex={minute}
                    visibleRest={wheelStyle.visibleRest}
                    itemTextStyle={wheelStyle.itemTextStyle}
                    flatListProps={wheelStyle.flatListProps}
                    containerStyle={wheelStyle.containerStyle}
                    selectedIndicatorStyle={wheelStyle.selectedIndicatorStyle}
                    onChange={(value) => updateTime(hour, value, second)}
                />

                <WheelPicker
                    options={MINUTES}
                    selectedIndex={second}
                    visibleRest={wheelStyle.visibleRest}
                    itemTextStyle={wheelStyle.itemTextStyle}
                    flatListProps={wheelStyle.flatListProps}
                    containerStyle={wheelStyle.containerStyle}
                    selectedIndicatorStyle={wheelStyle.selectedIndicatorStyle}
                    onChange={(value) => updateTime(hour, minute, value)}
                />
            </ThemedView>
        </ThemedView>
    );
}