import {Tabs} from 'expo-router';
import React from 'react';
import {Platform} from 'react-native';

import {HapticTab} from '@/components/HapticTab';
import TabBarBackground from '@/components/base/TabBarBackground';
import {useColorScheme} from '@/utils/hooks/useColorScheme';
import LucideIcon from "@/components/base/LucideIcon";
import {FontHelper} from "@/utils/helpers/fontHelper";
import {FontWeightEnum} from "@/utils/enums";
import {Colors} from "@/utils/colors";

export default function TabLayout() {
    const colorScheme = useColorScheme();

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: Colors.foreground[colorScheme ?? 'light'],
                headerShown: false,
                tabBarButton: HapticTab,
                tabBarBackground: TabBarBackground,
                headerTitleStyle: {fontFamily: FontHelper.getMainFontStatic(FontWeightEnum.Bold)},
                tabBarLabelStyle: {fontFamily: FontHelper.getMainFontStatic(FontWeightEnum.Bold)},
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
                name="profile"
                options={{
                    title: 'Profil',
                    tabBarIcon: ({color}) => <LucideIcon size={28} name="CircleUser" color={color}/>,
                }}
            />
        </Tabs>
    );
}
