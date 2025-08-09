import React, {useState} from "react";
import {useRouter} from "expo-router";
import {TimerValue} from "@rodinwm/rodin-models/frontend";
import {LucideIcon, ScreenTemplate, ThemedButton, ThemedText, ThemedView, TimerSelect} from "@/components";
import {defaultBreakTime, defaultWorkTime} from '@/utils/constants';
import {useAuthUser} from "@/utils/hooks/useAuthUser";
import {LoadingScreen} from "@/components/layouts/LoadingScreen";

export default function Page() {
    const router = useRouter();
    const {authUser} = useAuthUser({});
    const [numberOfSessions, setNumberOfSessions] = useState(0);
    const [workTime, setWorkTime] = useState<TimerValue>(authUser?.defaultWorkTime as unknown as TimerValue ?? defaultWorkTime);
    const [breakTime, setBreakTime] = useState<TimerValue>(authUser?.defaultBreakTime as unknown as TimerValue ?? defaultBreakTime);

    if (!authUser) {
        return <LoadingScreen/>;
    }

    return (
        <ScreenTemplate
            scrollEnabled={false}
            setHeightToScreenSize={true}
            title={"Minuteur"}
            headerLeftBtn={"backBtn"}
            headerRightBtn={{
                icon: 'Settings',
                onPress: () => router.push('/timer/default-timer'),
            }}
        >

            {/* Temps de travail */}
            <ThemedView className={'w-full flex flex-col gap-3'}>
                <ThemedView className={'w-full flex flex-row items-center gap-2 opacity-50'}>
                    <LucideIcon name={'Brain'}/>
                    <ThemedText type={'defaultSemiBold'}>Temps de travail</ThemedText>
                </ThemedView>

                <TimerSelect
                    defaultValue={authUser.defaultWorkTime as unknown as TimerValue ?? defaultWorkTime}
                    onMounted={(time: TimerValue) => setWorkTime(time)}
                    onChange={(time: TimerValue) => setWorkTime(time)}
                    minuteLimit={{min: 1, max: 59}}
                />
            </ThemedView>

            {/* Temps de repos */}
            <ThemedView className={'w-full flex flex-col gap-3'}>
                <ThemedView className={'w-full flex flex-row items-center gap-2 opacity-50'}>
                    <LucideIcon name={'OctagonPause'}/>
                    <ThemedText type={'defaultSemiBold'}>Temps de repos</ThemedText>
                </ThemedView>

                <TimerSelect
                    defaultValue={authUser.defaultBreakTime as unknown as TimerValue ?? defaultBreakTime}
                    onMounted={(time: TimerValue) => setBreakTime(time)}
                    onChange={(time: TimerValue) => setBreakTime(time)}
                    minuteLimit={{min: 1, max: 59}}
                />
            </ThemedView>

            {/* Nombre de sessions */}
            <ThemedView className={'w-full flex flex-row justify-between gap-3'}>
                <ThemedView className={'flex flex-row items-center gap-2 opacity-50'}>
                    <LucideIcon name={'RotateCcw'}/>
                    <ThemedText type={'defaultSemiBold'}>Nombre de sessions</ThemedText>
                </ThemedView>


                <ThemedView style={{width: 105}}>
                    <TimerSelect
                        hideHours={true}
                        hideMinutes={true}
                        maximumSeconds={99}
                        secondLimit={{
                            min: 1,
                            max: 99
                        }}
                        secondLabel={''}
                        onChange={(time: TimerValue) => setNumberOfSessions(time.seconds)}
                    />
                </ThemedView>
            </ThemedView>


            <ThemedView className={'w-full flex flex-row gap-3'}>
                <ThemedButton
                    title={"Réinitialiser"}
                    type={"danger"}
                    className={'flex-1'}
                    onPress={() => console.log('/timer')}
                />
                <ThemedButton
                    title={"Suivant"}
                    className={'flex-1'}
                    justifyItems={"justify-between"}
                    onPress={() => router.push({
                        pathname: '/timer/request-exercise-before',
                        params: {
                            stringWorkTime: JSON.stringify(workTime),
                            stringBreakTime: JSON.stringify(breakTime),
                            numberOfSessions: numberOfSessions
                        }
                    })}
                    suffixIcon={{
                        name: "ChevronRight",
                    }}
                />
            </ThemedView>
        </ScreenTemplate>
    );
}

