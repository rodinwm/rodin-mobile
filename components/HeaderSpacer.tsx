import {ThemedView} from "@/components/base/ThemedView";
import React from "react";
import LucideIcon from "@/components/base/LucideIcon";

export function HeaderSpacer() {
    return (
        <ThemedView paddingStyle={'mini'} className={'opacity-0'}>
            <LucideIcon name={"ChevronLeft"}/>
        </ThemedView>
    );
}