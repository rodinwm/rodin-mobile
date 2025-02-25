import {Text, type TextProps} from 'react-native';
import {useThemeColor} from '@/hooks/useThemeColor';

export type ThemedTextProps = TextProps & {
    lightColor?: string;
    darkColor?: string;
    type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link';
};

export function ThemedText({
                               style,
                               lightColor,
                               darkColor,
                               type = 'default',
                               ...rest
                           }: ThemedTextProps
) {
    const color = useThemeColor({light: lightColor, dark: darkColor}, 'text');
    const classNames = {
        default: "text-base",
        defaultSemiBold: "text-base font-semibold",
        title: "text-3xl font-bold",
        subtitle: "text-xl font-bold",
        link: "text-base text-blue-500",
    }

    return (
        <Text
            className={classNames[type]}
            style={{color}}
            {...rest}
        />
    );
}