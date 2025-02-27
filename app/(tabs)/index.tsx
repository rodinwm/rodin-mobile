import {ThemedText} from '@/components/ThemedText';
import {ThemedView} from '@/components/ThemedView';
import {SafeAreaView} from "react-native";

export default function Page() {
    return (
        <ThemedView className={"w-full flex flex-col p-3 gap-2 text-xs"}>
            <SafeAreaView/>
            <ThemedText type={'title'}>Welcome</ThemedText>
        </ThemedView>
    );
}

