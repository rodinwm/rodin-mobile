import React from "react";
import {SystemAppIcon, ThemedCheckbox, ThemedListTile} from "@/components";
import {SystemApp} from "@/utils/interfaces";

type Props = {
    app: SystemApp;
    onPress?: () => void;
    isSelected?: boolean;
}

export function SystemAppTile({app, onPress, isSelected = false}: Props) {
    return (
        <ThemedListTile
            key={app.name}
            icon={(
                <SystemAppIcon
                    app={app}
                    mini={true}
                    showAppName={false}
                    onPress={onPress}
                />
            )}
            fillStyle={"none"}
            title={app.name}
            subtitle={app.name}
            onPress={onPress}
            suffixIcon={(
                <ThemedCheckbox
                    isChecked={isSelected}
                    disabled={true}
                />
            )}
        />
    );
}