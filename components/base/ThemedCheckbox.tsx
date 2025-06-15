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
                <LucideIcon
                    name={"Check"}
                    size={14}
                    inverseColor={true}
                    color={!otherProps.isChecked ? "transparent" : undefined}
                />
            )}
            fillColor={Colors.foreground[colorScheme]}
            disableText={true}
            {...otherProps}
        />
    );
};

