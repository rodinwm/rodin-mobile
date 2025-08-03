import {LucideIcon, ScreenTemplate, ThemedButton, ThemedText, ThemedView, TimerSelect} from '@/components';
import React, {useState} from "react";
import {TimerValue} from "@rodinwm/rodin-models/frontend";
import {defaultBreakTime, defaultWorkTime} from "@/utils/constants";
import {useAuthUser} from "@/utils/hooks/useAuthUser";
import {LoadingScreen} from "@/components/layouts/LoadingScreen";
import {ToastService} from "@/utils/services/toastService";
import {ToastType} from "@/utils/enums";

export default function Page() {
    const {authUser} = useAuthUser({});
    const [numberOfSessions, setNumberOfSessions] = useState(0);
    const [workTime, setWorkTime] = useState<TimerValue>(authUser?.defaultWorkTime as unknown as TimerValue ?? defaultWorkTime);
    const [breakTime, setBreakTime] = useState<TimerValue>(authUser?.defaultBreakTime as unknown as TimerValue ?? defaultBreakTime);

    if (!authUser) {
        return <LoadingScreen/>;
    }

    return (
        <ScreenTemplate
            headerLeftBtn={"backBtn"}
            title={"Minuteur par défaut"}
            setHeightToScreenSize={true}
            scrollEnabled={false}
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
                    title={"Enregistrer"}
                    className={'flex-1'}
                    onPress={() => {
                        ToastService.show({
                            type: ToastType.Success,
                            message: "Vos minuteries par défaut ont été enregistrées avec succès.",
                        });
                    }}
                />
            </ThemedView>
        </ScreenTemplate>
    );
}

