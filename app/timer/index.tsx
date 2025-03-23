import {ThemedText} from '@/components/base/ThemedText';
import {ThemedView} from '@/components/base/ThemedView';
import React, {useState} from "react";
import LucideIcon from "@/components/base/LucideIcon";
import {ThemedButton} from "@/components/base/ThemedButton";
import {ThemedTextInput} from "@/components/base/ThemedTextInput";
import {useRouter} from "expo-router";
import {TimerSelect} from "@/components/TimerSelect";
import ThemedBottomSheet from "@/components/base/ThemedBottomSheet";
import ScreenTemplate from "@/components/layouts/ScreenTemplate";
import {TimerValue} from "@/utils/interfaces";

const defaultWorkTime: TimerValue = {hour: 0, minute: 30, second: 0};
const defaultBreakTime: TimerValue = {hour: 0, minute: 10, second: 0};

export default function Page() {
    const router = useRouter();
    const [numberOfSessions, setNumberOfSessions] = useState(0);
    const [workTime, setWorkTime] = useState<TimerValue>(defaultWorkTime);
    const [breakTime, setBreakTime] = useState<TimerValue>(defaultBreakTime);
    const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);


    return (
        <ScreenTemplate
            scrollEnabled={false}
            title={"Minuteurs"}
            headerLeftBtn={"backBtn"}
            headerRightBtn={{
                icon: 'Settings',
                onPress: () => setIsBottomSheetOpen(true),
            }}
            bottomSheet={(
                <ThemedBottomSheet
                    isOpen={isBottomSheetOpen}
                    onClose={() => setIsBottomSheetOpen(false)}
                >
                    <ThemedText type={'title'}>Minuteur par défaut</ThemedText>

                    {/* Temps de travail */}
                    <ThemedView className={'w-full flex flex-col gap-3'}>
                        <ThemedView className={'w-full flex flex-row items-center gap-2 opacity-50'}>
                            <LucideIcon name={'Briefcase'}/>
                            <ThemedText type={'defaultSemiBold'}>Temps de travail</ThemedText>
                        </ThemedView>

                        <TimerSelect
                            defaultValue={defaultWorkTime}
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
                            defaultValue={defaultBreakTime}
                            onChange={(time: TimerValue) => setBreakTime(time)}
                        />
                    </ThemedView>
                </ThemedBottomSheet>
            )}
        >

            {/* Temps de travail */}
            <ThemedView className={'w-full flex flex-col gap-3'}>
                <ThemedView className={'w-full flex flex-row items-center gap-2 opacity-50'}>
                    <LucideIcon name={'Briefcase'}/>
                    <ThemedText type={'defaultSemiBold'}>Temps de travail</ThemedText>
                </ThemedView>

                <TimerSelect
                    //defaultValue={defaultWorkTime}
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
                    //defaultValue={defaultBreakTime}
                    onChange={(time: TimerValue) => setBreakTime(time)}
                />
            </ThemedView>

            {/* Nombre de sessions */}
            <ThemedView className={'w-full flex flex-col gap-3'}>
                <ThemedView className={'w-full flex flex-row items-center gap-2 opacity-50'}>
                    <LucideIcon name={'RotateCcw'}/>
                    <ThemedText type={'defaultSemiBold'}>Nombre de sessions</ThemedText>
                </ThemedView>

                <ThemedView
                    className={'w-full flex flex-row justify-center'}
                >
                    <ThemedButton
                        title={"Test"}
                        icon={{name: 'Minus'}}
                        showTitle={false}
                        className={'flex-1'}
                        radiusStyle={"left-only"}
                        onPress={() => setNumberOfSessions((previous) => previous !== 0 ? previous - 1 : 0)}
                    />

                    <ThemedTextInput
                        value={numberOfSessions.toString()}
                        readOnly={true}
                        textAlign={"center"}
                        radiusStyle={"none"}
                        keyboardType={"number-pad"}
                        maxLength={2}
                        bigText={true}
                        containerClassName={'flex-1'}
                        onChangeText={(text) => {
                            const parsedNumber = parseInt(text, 10);
                            setNumberOfSessions(isNaN(parsedNumber) ? 0 : parsedNumber);
                        }}
                    />

                    <ThemedButton
                        title={"Test"}
                        icon={{name: 'Plus'}}
                        showTitle={false}
                        className={'flex-1'}
                        radiusStyle={"right-only"}
                        onPress={() => setNumberOfSessions((previous) => previous >= 10 ? 10 : previous + 1)}
                    />
                </ThemedView>
            </ThemedView>


            {/* Preview
                    <ThemedView className={'w-full flex flex-col'}>
                        <ThemedText>
                            Temps de travail: {workTime.hour}h {workTime.minute}m {workTime.second}s
                        </ThemedText>
                        <ThemedText>
                            Temps de repos: {breakTime.hour}h {breakTime.minute}m {breakTime.second}s
                        </ThemedText>
                    </ThemedView>
                    */}


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
                    onPress={() => router.push('/timer/request-exercise-before')}
                    suffixIcon={{
                        name: "ChevronRight",
                    }}
                />
            </ThemedView>
        </ScreenTemplate>
    );
}

