import {FlatListProps, StyleProp, TextStyle, ViewStyle} from "react-native";
import {icons} from "lucide-react-native";
import {PodColor, SubscriptionRecurrence} from "@/utils/enums";

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


export interface Pod {
    id: string;
    color: PodColor;
}

export interface Subscription {
    title: string;
    description: string;
    price?: {
        [SubscriptionRecurrence.Yearly]: number;
        [SubscriptionRecurrence.Monthly]: number;
    };
    content: string[];
}

export interface ThemedClassName {
    base?: string;
    overflow?: string;
    fillStyle?: string;
    radiusStyle?: string;
    paddingStyle?: string;
    borderWidth?: string;
    borderStyle?: string;
    customClassName?: string;
}