import {icons} from 'lucide-react-native';
import {Colors} from "@/utils/colors";
import {useColorScheme} from "@/utils/hooks/useColorScheme";
import {StyleProp, ViewStyle} from "react-native";

type Props = {
    name: keyof typeof icons,
    color?: string,
    size?: number,
    className?: string,
    inverseColor?: boolean;
    strokeWidth?: number;
    style?: StyleProp<ViewStyle>;
}

export default function LucideIcon(props: Props) {
    const LucideIcon = icons[props.name];

    let colorScheme = useColorScheme();
    if (props.inverseColor && colorScheme) {
        colorScheme = (colorScheme == 'light') ? 'dark' : 'light';
    }

    return <LucideIcon
        color={props.color ?? Colors.foreground[colorScheme ?? 'light']}
        className={`flex-shrink-0 ${props.className}`}
        size={props.size}
        style={props.style}
        strokeWidth={props.strokeWidth}
        //strokeWidth={2.5}
    />;
};

