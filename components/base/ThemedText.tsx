import {Text, type TextProps} from 'react-native';
import {FontHelper} from "@/utils/helpers/fontHelper";
import {FontWeightEnum} from "@/utils/enums";

export type ThemedTextProps = TextProps & {
    type?: 'mini' | 'miniBold' | 'default' | 'title' | 'h1' | 'defaultSemiBold' | 'subtitle' | 'link';
    filled?: boolean;
    inverseColor?: boolean;
    numberOfLines?: number;
};

export function ThemedText({
                               className,
                               numberOfLines,
                               type = 'default',
                               filled = true,
                               inverseColor = false,
                               ...otherProps
                           }: ThemedTextProps
) {
    const style = {
        mini: {
            fontSize: "text-xs",
            fontWeight: FontWeightEnum.Light,
        },
        miniBold: {
            fontSize: "text-xs",
            fontWeight: FontWeightEnum.Bold,
        },
        default: {
            fontSize: "text-lg",
            fontWeight: FontWeightEnum.Light,
        },
        defaultSemiBold: {
            fontSize: "text-lg",
            fontWeight: FontWeightEnum.SemiBold,
        },
        title: {
            fontSize: "text-3xl",
            fontWeight: FontWeightEnum.ExtraBold,
        },
        h1: {
            fontSize: "text-2xl",
            fontWeight: FontWeightEnum.SemiBold,
        },
        subtitle: {
            fontSize: "text-xl",
            fontWeight: FontWeightEnum.Bold,
        },
        link: {
            fontSize: "text-lg text-blue-500",
            fontWeight: FontWeightEnum.Medium,
        },
    };

    const classNames: string[] = [
        style[type].fontSize,
        filled ?
            !inverseColor ?
                'text-foreground-light dark:text-foreground-dark'
                : 'text-foreground-dark dark:text-foreground-light'
            : '',
        className ?? ''
    ];

    return (
        <Text
            className={classNames.join(' ')}
            style={{
                fontFamily: FontHelper.getMainFontStatic(style[type].fontWeight)
            }}
            numberOfLines={numberOfLines}
            ellipsizeMode="tail"
            {...otherProps}
        />
    );
}