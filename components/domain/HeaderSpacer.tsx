import {LucideIcon, ThemedView} from "@/components";
import React from "react";

export function HeaderSpacer() {
    return (
        <ThemedView paddingStyle={'none'} className={'opacity-0'}>
            <LucideIcon name={"ChevronLeft"}/>
        </ThemedView>
    );
}