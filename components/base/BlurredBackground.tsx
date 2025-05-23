import {BlurView} from "expo-blur";
import React from "react";

export function BlurredBackground() {
    return (
        <BlurView
            tint="dark"
            className={'flex-1'}
            intensity={30}
            style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0}}
        />
    );
};

