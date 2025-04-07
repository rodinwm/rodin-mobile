import {FlatListProps, StyleProp, TextStyle, ViewStyle} from "react-native";
import {icons} from "lucide-react-native";
import {PodColor} from "@/utils/enums";

export interface DailyTip {
    text: string;
}

export interface MotivationSentence {
    id: number;
    sentence: string;
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
    onSkip?: () => void;
}

export interface TimerValue {
    hour: number;
    minute: number;
    second: number;
}

export interface Pod {
    id: string;
    color: PodColor;
}
