import {FlatListProps, StyleProp, TextStyle, ViewStyle} from "react-native";

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