import {FlatListProps, StyleProp, TextStyle, ViewStyle} from "react-native";
import {icons} from "lucide-react-native";

export interface DailyTip {
    text: string;
}

export interface WheelStyle {
    visibleRest?: number;
    itemTextStyle?: TextStyle;
    containerStyle?: ViewStyle;
    selectedIndicatorStyle?: StyleProp<ViewStyle>;
    flatListProps?: Omit<FlatListProps<string | null>, "data" | "renderItem">;
}

export interface HeaderBtn {
    icon: keyof typeof icons;
    onPress: () => void;
}

export interface OnboardingStepScreenProps {
    onNextPress?: () => void;
}