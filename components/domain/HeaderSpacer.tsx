import {ThemedView} from "@/components/base/ThemedView";
import {LucideIcon} from "@/components/base/LucideIcon";
import React from "react";

export function HeaderSpacer() {
    return (
        <ThemedView paddingStyle={'none'} className={'opacity-0'}>
            <LucideIcon name={"ChevronLeft"}/>
        </ThemedView>
    );
}