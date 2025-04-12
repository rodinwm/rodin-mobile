import {useState} from "react";
import {ThemedView} from "@/components/base/ThemedView";
import {TimerValue, WheelStyle} from "@/utils/interfaces";
import WheelPicker from "react-native-wheely";
import {FontHelper} from "@/utils/helpers/fontHelper";
import {FontWeightEnum} from "@/utils/enums";
import {Colors} from "@/utils/colors";
import {useColorScheme} from '@/utils/hooks/useColorScheme';

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

interface TimerSelectProps {
    defaultValue?: TimerValue;
    onChange?: (time: TimerValue) => void;
}

export function TimerSelect({defaultValue, onChange}: TimerSelectProps) {
    const [time, setTime] = useState<TimerValue>(defaultValue ?? {hour: 0, minute: 0, second: 0});
    const colorScheme = useColorScheme() ?? 'light';

    const updateTime = (time: TimerValue) => {
        setTime(time);
        console.info("New time select =", time)
        if (onChange) {
            onChange(time);
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
            backgroundColor: Colors.foreground[colorScheme] + '19',
            borderRadius: 0,
        },
        flatListProps: {
            nestedScrollEnabled: true,
        }
    }

    return (
        <ThemedView
            //outlined={true}
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
                <WheelPicker
                    options={HOURS}
                    selectedIndex={time.hour}
                    visibleRest={wheelStyle.visibleRest}
                    itemTextStyle={wheelStyle.itemTextStyle}
                    flatListProps={wheelStyle.flatListProps}
                    containerStyle={wheelStyle.containerStyle}
                    selectedIndicatorStyle={{
                        ...(wheelStyle.selectedIndicatorStyle as object),
                        borderTopLeftRadius: 10,
                        borderBottomLeftRadius: 10,
                    }}
                    onChange={(hour) => updateTime({...time, hour})}
                />

                <WheelPicker
                    options={MINUTES}
                    selectedIndex={time.minute}
                    visibleRest={wheelStyle.visibleRest}
                    itemTextStyle={wheelStyle.itemTextStyle}
                    flatListProps={wheelStyle.flatListProps}
                    containerStyle={wheelStyle.containerStyle}
                    selectedIndicatorStyle={wheelStyle.selectedIndicatorStyle}
                    onChange={(minute) => updateTime({...time, minute})}
                />

                <WheelPicker
                    options={MINUTES}
                    selectedIndex={time.second}
                    visibleRest={wheelStyle.visibleRest}
                    itemTextStyle={wheelStyle.itemTextStyle}
                    flatListProps={wheelStyle.flatListProps}
                    containerStyle={wheelStyle.containerStyle}
                    selectedIndicatorStyle={{
                        ...(wheelStyle.selectedIndicatorStyle as object),
                        borderTopRightRadius: 10,
                        borderBottomRightRadius: 10
                    }}
                    onChange={(second) => updateTime({...time, second})}
                />
            </ThemedView>
        </ThemedView>
    );
}