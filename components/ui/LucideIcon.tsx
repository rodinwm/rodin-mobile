import {icons} from 'lucide-react-native';
import {Colors} from "@/constants/colors";
import {useColorScheme} from "@/hooks/useColorScheme";

interface ComponentProps {
    name: keyof typeof icons,
    color?: string,
    size?: number,
    className?: string,
    inverseColor?: boolean;
}

export default function LucideIcon(props: ComponentProps) {
    const LucideIcon = icons[props.name];

    let colorScheme = useColorScheme();
    if (props.inverseColor && colorScheme) {
        colorScheme = (colorScheme == 'light') ? 'dark' : 'light';
    }

    return <LucideIcon
        color={props.color ?? Colors.foreground[colorScheme ?? 'light']}
        className={props.className}
        size={props.size}
        //strokeWidth={2.5}
    />;
};

