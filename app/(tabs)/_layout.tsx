import {Tabs} from 'expo-router';
import React from 'react';
import {Platform} from 'react-native';

import {HapticTab, LucideIcon, TabBarBackground} from '@/components';
import {useColorScheme} from '@/utils/hooks/useColorScheme';
import {FontService} from "@/utils/services/fontService";
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
                headerTitleStyle: {fontFamily: FontService.getMainFontStatic(FontWeightEnum.Bold)},
                tabBarLabelStyle: {fontFamily: FontService.getMainFontStatic(FontWeightEnum.Bold)},
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
                    title: 'Accueil',
                    tabBarIcon: ({color}) => <LucideIcon size={28} name="House" color={color}/>,
                }}
            />
            <Tabs.Screen
                name="blocker"
                options={{
                    title: "RodShield",
                    tabBarIcon: ({color}) => <LucideIcon size={28} name="Shield" color={color}/>,
                }}
            />
            <Tabs.Screen
                name="community"
                options={{
                    title: 'Communauté',
                    tabBarIcon: ({color}) => <LucideIcon size={28} name="Users" color={color}/>,
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
