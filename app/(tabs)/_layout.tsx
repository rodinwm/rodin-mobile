import {Tabs} from 'expo-router';
import React from 'react';
import {Platform, TouchableOpacity} from 'react-native';

import {HapticTab} from '@/components/HapticTab';
import TabBarBackground from '@/components/ui/TabBarBackground';
import {Colors} from '@/constants/colors';
import {useColorScheme} from '@/hooks/useColorScheme';
import LucideIcon from "@/components/ui/LucideIcon";
import {mainFont} from "@/constants/strings";
import {ThemedText} from "@/components/ThemedText";

export default function TabLayout() {
    const colorScheme = useColorScheme();

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
                headerShown: false,
                tabBarButton: HapticTab,
                tabBarBackground: TabBarBackground,
                headerTitleStyle: {fontFamily: mainFont},
                tabBarLabelStyle: {fontFamily: mainFont},
                headerTitle: () => (
                    <ThemedText type={'title'}>Rodin</ThemedText>
                ),
                headerLeft: () => (
                    <TouchableOpacity onPress={() => console.log("Menu ouvert")}>
                        <LucideIcon size={24} name="Menu" color={Colors[colorScheme ?? 'light'].tint}/>
                    </TouchableOpacity>
                ),
                headerRight: () => (
                    <TouchableOpacity onPress={() => console.log("Profil ouvert")}>
                        <LucideIcon size={24} name="User" color={Colors[colorScheme ?? 'light'].tint}/>
                    </TouchableOpacity>
                ),
                tabBarStyle: Platform.select({
                    ios: {
                        // Use a transparent background on iOS to show the blur effect
                        position: 'absolute',
                        height: "auto",
                        paddingTop: 10,
                    },
                    default: {},
                }),
            }}>
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Home',
                    tabBarIcon: ({color}) => <LucideIcon size={28} name="House" color={color}/>,
                }}
            />
            <Tabs.Screen
                name="explore"
                options={{
                    title: 'Explore',
                    tabBarIcon: ({color}) => <LucideIcon size={28} name="Telescope" color={color}/>,
                }}
            />
        </Tabs>
    );
}
