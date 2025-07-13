import {FlatListProps, StyleProp, TextStyle, ViewStyle} from "react-native";
import {icons} from "lucide-react-native";
import {PodColor} from "@/utils/enums";
import {SubscriptionFrequency} from "@rodinwm/rodin-models/frontend";

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
    onNextPress: () => void;
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
        [SubscriptionFrequency.YEARLY]: number;
        [SubscriptionFrequency.MONTHLY]: number;
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

export interface SystemApp {
    name: string;
}