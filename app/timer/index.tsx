import {ThemedText} from '@/components/base/ThemedText';
import {ThemedView} from '@/components/base/ThemedView';
import React, {useState} from "react";
import {SafeAreaView} from "react-native-safe-area-context";
import LucideIcon from "@/components/base/LucideIcon";
import {ThemedButton} from "@/components/base/ThemedButton";
import {ThemedTextInput} from "@/components/base/ThemedTextInput";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {useNavigation} from "expo-router";
import {TimerSelect} from "@/components/TimerSelect";

export default function Page() {
    const navigation = useNavigation();
    const [numberOfSessions, setNumberOfSessions] = useState(0);
    const [workTime, setWorkTime] = useState({hour: 0, minute: 0, second: 0});
    const [breakTime, setBreakTime] = useState({hour: 0, minute: 0, second: 0});


    return (
        <ThemedView className={"w-full h-screen"} fillStyle={"default"}>
            <KeyboardAwareScrollView
                enableOnAndroid={true}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
            >
                <SafeAreaView
                    className={"w-full flex flex-col gap-14 p-6 pt-0"}
                >
                    {/* Header */}
                    <ThemedView className={'w-full flex flex-row items-center justify-between'}>
                        <ThemedButton
                            title={"Test"}
                            icon={{name: 'ChevronLeft'}}
                            showTitle={false}
                            type={"outlined"}
                            onPress={() => navigation.goBack()}
                        />

                        <ThemedText type={'title'}>Minuteur</ThemedText>

                        <ThemedButton
                            title={"Test"}
                            icon={{name: 'Settings'}}
                            showTitle={false}
                            type={"outlined"}
                            onPress={() => console.log("Profile")}
                        />
                    </ThemedView>

                    {/* Temps de travail */}
                    <ThemedView className={'w-full flex flex-col gap-3'}>
                        <ThemedView className={'w-full flex flex-row items-center gap-3'}>
                            <LucideIcon name={'Briefcase'}/>
                            <ThemedText type={'defaultSemiBold'}>Temps de travail</ThemedText>
                        </ThemedView>

                        <TimerSelect onChange={(time) => setWorkTime(time)}/>
                    </ThemedView>

                    {/* Temps de repos */}
                    <ThemedView className={'w-full flex flex-col gap-3'}>
                        <ThemedView className={'w-full flex flex-row items-center gap-3'}>
                            <LucideIcon name={'OctagonPause'}/>
                            <ThemedText type={'defaultSemiBold'}>Temps de repos</ThemedText>
                        </ThemedView>

                        <TimerSelect onChange={(time) => setBreakTime(time)}/>
                    </ThemedView>

                    {/* Nombre de sessions */}
                    <ThemedView className={'w-full flex flex-col gap-3'}>
                        <ThemedView className={'w-full flex flex-row items-center gap-3'}>
                            <LucideIcon name={'CirclePlay'}/>
                            <ThemedText type={'defaultSemiBold'}>Nombre de sessions</ThemedText>
                        </ThemedView>

                        <ThemedView
                            className={'w-full flex flex-row justify-center items-center'}
                        >
                            <ThemedButton
                                title={"Test"}
                                icon={{name: 'Minus'}}
                                showTitle={false}
                                fullWidth={true}
                                fullHeight={true}
                                radiusStyle={"left-only"}
                                onPress={() => setNumberOfSessions((previous) => previous !== 0 ? previous - 1 : 0)}
                            />

                            <ThemedTextInput
                                value={numberOfSessions.toString()}
                                readOnly={true}
                                textAlign={"center"}
                                className={'flex-1 h-full'}
                                radiusStyle={"none"}
                                bigText={true}
                                onChangeText={(text) => {
                                    const parsedNumber = parseInt(text, 10);
                                    setNumberOfSessions(isNaN(parsedNumber) ? 0 : parsedNumber);
                                }}
                            />

                            <ThemedButton
                                title={"Test"}
                                icon={{name: 'Plus'}}
                                showTitle={false}
                                fullWidth={true}
                                fullHeight={true}
                                radiusStyle={"right-only"}
                                onPress={() => setNumberOfSessions((previous) => previous >= 10 ? 10 : previous + 1)}
                            />
                        </ThemedView>
                    </ThemedView>


                    {/* Debug */}
                    <ThemedText>
                        Temps de travail: {workTime.hour}h {workTime.minute}m {workTime.second}s
                    </ThemedText>
                    <ThemedText>
                        Temps de repos: {breakTime.hour}h {breakTime.minute}m {breakTime.second}s
                    </ThemedText>


                    <ThemedView className={'w-full flex flex-row items-center gap-3'}>
                        <ThemedButton
                            title={"Réinitialiser"}
                            fullWidth={true}
                            type={"danger"}
                            onPress={() => console.log('/timer')}
                        />
                        <ThemedButton
                            title={"Suivant"}
                            fullWidth={true}
                            type={"success"}
                            onPress={() => console.log('/timer')}
                        />
                    </ThemedView>

                </SafeAreaView>
            </KeyboardAwareScrollView>
        </ThemedView>
    );
}

