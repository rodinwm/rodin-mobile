import {ThemedText} from '@/components/base/ThemedText';
import {ThemedView} from '@/components/base/ThemedView';
import {useState} from "react";
import {SafeAreaView} from "react-native-safe-area-context";
import LucideIcon from "@/components/base/LucideIcon";
import {ThemedButton} from "@/components/base/ThemedButton";
import {ThemedTextInput} from "@/components/base/ThemedTextInput";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {useNavigation} from "expo-router";

export default function Page() {
    const navigation = useNavigation();
    const [numberOfSessions, setNumberOfSessions] = useState(0);

    return (
        <ThemedView className={"w-full h-screen"} fillStyle={"default"}>
            <KeyboardAwareScrollView
                enableOnAndroid={true}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
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
                            filled={false}
                            onPress={() => navigation.goBack()}
                        />

                        <ThemedText type={'title'}>Minuteur</ThemedText>

                        <ThemedButton
                            title={"Test"}
                            icon={{name: 'Settings'}}
                            showTitle={false}
                            filled={false}
                            onPress={() => console.log("Profile")}
                        />
                    </ThemedView>

                    {/* Temps de travail */}
                    <ThemedView className={'w-full flex flex-col gap-3'}>
                        <ThemedView className={'w-full flex flex-row items-center gap-3'}>
                            <LucideIcon name={'Briefcase'}/>
                            <ThemedText type={'defaultSemiBold'}>Temps de travail</ThemedText>
                        </ThemedView>

                        <ThemedView
                            fillStyle={"opacity-15"}
                            outlined={true}
                            radiusStyle={"default"}
                            paddingStyle={"default"}
                            className={'w-full flex flex-col items-center gap-3 bg-foreground-light/15 dark:bg-foreground-dark/15'}
                        >
                            <LucideIcon name={'Briefcase'} size={150}/>
                            <ThemedText type={'subtitle'}>Temps de travail</ThemedText>
                        </ThemedView>
                    </ThemedView>

                    {/* Temps de repos */}
                    <ThemedView className={'w-full flex flex-col gap-3'}>
                        <ThemedView className={'w-full flex flex-row items-center gap-3'}>
                            <LucideIcon name={'OctagonPause'}/>
                            <ThemedText type={'defaultSemiBold'}>Temps de repos</ThemedText>
                        </ThemedView>

                        <ThemedView
                            fillStyle={"opacity-15"}
                            outlined={true}
                            radiusStyle={"default"}
                            paddingStyle={"default"}
                            className={'w-full flex flex-col items-center gap-3 bg-foreground-light/15 dark:bg-foreground-dark/15'}
                        >
                            <LucideIcon name={'OctagonPause'} size={150}/>
                            <ThemedText type={'subtitle'}>Temps de repos</ThemedText>
                        </ThemedView>
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


                </SafeAreaView>
            </KeyboardAwareScrollView>
        </ThemedView>
    );
}

