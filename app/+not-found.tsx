import {Link, Stack} from 'expo-router';
import {ThemedText} from '@/components/base/ThemedText';
import {ThemedView} from '@/components/base/ThemedView';

export default function NotFoundScreen() {
    return (
        <>
            <Stack.Screen options={{title: 'Oops!'}}/>
            <ThemedView className={"flex flex-col justify-center items-center p-4"}>
                <ThemedText type="title">This screen doesn't exist.</ThemedText>
                <Link href="/(tabs)" className={"mt-4 px-4"}>
                    <ThemedText type="link">Go to home screen!</ThemedText>
                </Link>
            </ThemedView>
        </>
    );
}