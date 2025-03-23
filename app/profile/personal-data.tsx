import {ThemedView} from '@/components/base/ThemedView';
import React from "react";
import ThemedListTile from "@/components/base/ThemedListTile";
import ScreenTemplate from '@/components/layouts/ScreenTemplate';

export default function Page() {
    return (
        <ScreenTemplate
            title={"Infos personnelles"}
            headerLeftBtn={"backBtn"}
        >
            {/* Options */}
            <ThemedView className={'w-full flex flex-col gap-6'}>
                <ThemedListTile
                    icon={'BookOpenText'}
                    title={'Guide'}
                />
                <ThemedListTile
                    icon={'CircleHelp'}
                    title={'F.A.Q'}
                />
                <ThemedListTile
                    icon={'Target'}
                    title={'Règles générales'}
                />
            </ThemedView>
        </ScreenTemplate>
    );
}

