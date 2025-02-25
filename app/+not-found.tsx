import {Link, Stack} from 'expo-router';

import {ThemedText} from '@/components/ThemedText';
import {ThemedView} from '@/components/ThemedView';

export default function NotFoundScreen() {
    return (
        <>
            <Stack.Screen options={{title: 'Oops!'}}/>
            <ThemedView className={"flex flex-col justify-center items-center p-4"}>
                <ThemedText type="title">This screen doesn't exist.</ThemedText>
                <Link href="/(tabs)/index" className={"mt-4 px-4"}>
                    <ThemedText type="link">Go to home screen!</ThemedText>
                </Link>
            </ThemedView>
        </>
    );
}