import {icons} from 'lucide-react-native';
import {StyleProp} from "react-native";

export default function LucideIcon({name, color, size, className, style}: {
    name: keyof typeof icons,
    color: string,
    size: number,
    className?: string,
    style?: StyleProp<any>,
}) {
    const LucideIcon = icons[name];
    return <LucideIcon color={color} size={size} className={className} style={style}/>;
};

