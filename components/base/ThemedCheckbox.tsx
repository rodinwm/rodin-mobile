import {Colors} from "@/utils/colors";
import {useColorScheme} from "@/utils/hooks/useColorScheme";
import {LucideIcon} from "@/components/base/LucideIcon";
import BouncyCheckbox, {BouncyCheckboxProps} from "react-native-bouncy-checkbox";
import React from "react";

export type ThemedCheckboxProps = BouncyCheckboxProps & {}

export function ThemedCheckbox({
                                   ...otherProps
                               }: ThemedCheckboxProps
) {
    const colorScheme = useColorScheme() ?? 'light';

    return (
        <BouncyCheckbox
            iconComponent={(
                <LucideIcon name={"Check"} size={14} inverseColor={true}/>
            )}
            fillColor={Colors.foreground[colorScheme]}
            //unFillColor={Colors.foreground[colorScheme] + "33"} // FIXME: find how to hide checkkk icon when checkbox is not checked
            disableText={true}
            {...otherProps}
        />
    );
};

