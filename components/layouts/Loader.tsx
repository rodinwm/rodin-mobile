import React from "react";
import {useColorScheme} from "@/utils/hooks/useColorScheme";
import {ActivityIndicator} from "react-native";
import {Colors} from "@/utils/colors";

type Props = {};

export function Loader(props: Props) {
    const colorScheme = useColorScheme();

    return (
        <ActivityIndicator size="large" color={Colors.foreground[colorScheme]}/>
    );
}