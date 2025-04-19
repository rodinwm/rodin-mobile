import {Text, type TextProps} from 'react-native';
import {FontHelper} from "@/utils/helpers/fontHelper";
import {FontWeightEnum} from "@/utils/enums";

export type ThemedTextProps = TextProps & {
    type?: 'mini' | 'miniBold' | 'miniExtraBold' | 'default' | 'bigTitle' | 'title' | 'h1' | 'defaultSemiBold' | 'defaultExtraBold' | 'subtitle' | 'link' | 'logo';
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
        miniExtraBold: {
            fontSize: "text-xs",
            fontWeight: FontWeightEnum.ExtraBold,
        },
        link: {
            fontSize: "text-lg text-blue-500",
            fontWeight: FontWeightEnum.Medium,
        },
        default: {
            fontSize: "text-lg",
            fontWeight: FontWeightEnum.Light,
        },
        defaultSemiBold: {
            fontSize: "text-lg",
            fontWeight: FontWeightEnum.SemiBold,
        },
        defaultExtraBold: {
            fontSize: "text-lg",
            fontWeight: FontWeightEnum.ExtraBold,
        },
        subtitle: {
            fontSize: "text-xl",
            fontWeight: FontWeightEnum.Bold,
        },
        h1: {
            fontSize: "text-2xl",
            fontWeight: FontWeightEnum.SemiBold,
        },
        title: {
            fontSize: "text-3xl",
            fontWeight: FontWeightEnum.ExtraBold,
        },
        bigTitle: {
            fontSize: "text-5xl",
            fontWeight: FontWeightEnum.ExtraBold,
        },
        logo: {
            fontSize: "text-8xl",
            fontWeight: FontWeightEnum.ExtraBold,
        },
    };

    const classNames: string[] = [
        style[type].fontSize,
        filled ?
            !inverseColor ?
                'text-foreground-light dark:text-foreground-dark'
                : 'text-foreground-dark dark:text-foreground-light'
            : '',
        type === "link" ? 'underline underline-offset-8' : '',
        className ?? ''
    ];

    return (
        <Text
            className={classNames.join(' ')}
            style={{
                fontFamily: type === 'bigTitle' ?
                    FontHelper.getBigTitleFontStatic() : FontHelper.getMainFontStatic(style[type].fontWeight)
            }}
            numberOfLines={numberOfLines}
            ellipsizeMode="tail"
            {...otherProps}
        />
    );
}