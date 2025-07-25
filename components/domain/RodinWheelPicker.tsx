import { WheelStyle } from "@/utils/interfaces";
import WheelPicker from "react-native-wheely";
import { FontService } from "@/utils/services/fontService";
import { FontWeightEnum } from "@/utils/enums";
import { Colors } from "@/utils/colors";
import { useColorScheme } from '@/utils/hooks/useColorScheme';
import { UiService } from "@/utils/services/uiService";

type Props = {
    options: string[];
    selectedIndex?: number;
    onChange?: (index: number) => void;
    isLeftCornerRounded?: boolean;
    isRightCornerRounded?: boolean;
}

export function RodinWheelPicker({
    options,
    selectedIndex = 0,
    onChange = (index: number) => console.info("RodinWheelPicker onChange method not implemented."),
    isLeftCornerRounded,
    isRightCornerRounded,
}: Props
) {
    const colorScheme = useColorScheme();

    const wheelStyle: WheelStyle = {
        visibleRest: 1,
        itemTextStyle: {
            fontFamily: FontService.getMainFontStatic(FontWeightEnum.Bold),
            fontSize: 20,
            color: Colors.foreground[colorScheme],
        },
        containerStyle: {
            width: '100%',
            flex: 1,
        },
        selectedIndicatorStyle: {
            backgroundColor: Colors.foreground[colorScheme] + '19',
            borderRadius: 0,
            ...(isLeftCornerRounded ? {
                borderTopLeftRadius: 10,
                borderBottomLeftRadius: 10,
            } : {}),
            ...(isRightCornerRounded ? {
                borderTopRightRadius: 10,
                borderBottomRightRadius: 10,
            } : {})
        },
        flatListProps: {
            nestedScrollEnabled: true,
        }
    }

    return (
        <WheelPicker
            options={options}
            selectedIndex={selectedIndex}
            onChange={(index) => {
                UiService.hapticImpact();
                if (onChange) {
                    onChange(index);
                }
            }}
            // Common style
            visibleRest={wheelStyle.visibleRest}
            itemTextStyle={wheelStyle.itemTextStyle}
            flatListProps={wheelStyle.flatListProps}
            containerStyle={wheelStyle.containerStyle}
            selectedIndicatorStyle={wheelStyle.selectedIndicatorStyle}
        />
    );
}