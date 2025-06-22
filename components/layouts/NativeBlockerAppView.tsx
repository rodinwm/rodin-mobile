import React, {useEffect} from "react";
import {DeviceActivitySelectionView} from "react-native-device-activity";
import {AppBlockerService} from "@/utils/services/appBlockerService";

type Props = {}

export function NativeBlockerAppView({}: Props) {
    // First things first, you need to request authorization
    useEffect(() => {
        AppBlockerService.init();
    }, [])

    const [familyActivitySelection, setFamilyActivitySelection] = React.useState<string | null>(null);

    // next you need to present a native view to let the user select which activities to track, you need to do this before you can start tracking (this is a completely unstyled clickable native view):
    return (
        <DeviceActivitySelectionView
            familyActivitySelection={familyActivitySelection}
            onSelectionChange={(event) => {
                const selection = event.nativeEvent.familyActivitySelection;
                console.log(selection);
                setFamilyActivitySelection(selection);
            }}
        />
    );
}
