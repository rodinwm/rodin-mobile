import {Text, type TextProps} from 'react-native';
import {FontHelper} from "@/utils/helpers/fontHelper";
import {FontWeightEnum} from "@/utils/enums";

export type ThemedTextProps = TextProps & {
    type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link';
    inverseColor?: boolean;
};

export function ThemedText({type = 'default', inverseColor = false, ...rest}: ThemedTextProps) {
    const style = {
        default: {
            fontSize: "text-base",
            fontWeight: FontWeightEnum.Light,
        },
        defaultSemiBold: {
            fontSize: "text-base",
            fontWeight: FontWeightEnum.SemiBold,
        },
        title: {
            fontSize: "text-3xl",
            fontWeight: FontWeightEnum.ExtraBold,
        },
        subtitle: {
            fontSize: "text-xl",
            fontWeight: FontWeightEnum.Bold,
        },
        link: {
            fontSize: "text-base text-blue-500",
            fontWeight: FontWeightEnum.Medium,
        },
    };

    return (
        <Text
            className={`${style[type].fontSize} ${!inverseColor ? 'text-foreground-light dark:text-foreground-dark' : 'text-foreground-dark dark:text-foreground-light'}`}
            style={{
                fontFamily: FontHelper.getMainFontStatic(style[type].fontWeight)
            }}
            {...rest}
        />
    );
}