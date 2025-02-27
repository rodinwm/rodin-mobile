import {Text, type TextProps} from 'react-native';
import {useThemeColor} from '@/hooks/useThemeColor';
import {FontHelper} from "@/utils/helpers/fontHelper";
import {FontWeightEnum} from "@/utils/enums";

export type ThemedTextProps = TextProps & {
    lightColor?: string;
    darkColor?: string;
    type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link';
};

export function ThemedText({
                               lightColor,
                               darkColor,
                               type = 'default',
                               ...rest
                           }: ThemedTextProps
) {
    const color = useThemeColor({light: lightColor, dark: darkColor}, 'text');
    const classNames = {
        default: "text-base",
        defaultSemiBold: "text-base",
        title: "text-3xl",
        subtitle: "text-xl",
        link: "text-base text-blue-500",
    }
    const fontWeights = {
        default: FontWeightEnum.Light,
        defaultSemiBold: FontWeightEnum.SemiBold,
        title: FontWeightEnum.ExtraBold,
        subtitle: FontWeightEnum.Bold,
        link: FontWeightEnum.Medium,
    }

    return (
        <Text
            className={classNames[type]}
            style={{
                color,
                fontFamily: FontHelper.getMainFont(fontWeights[type]),
            }}
            {...rest}
        />
    );
}