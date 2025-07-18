import {Text, type TextProps} from 'react-native';
import {FontService} from "@/utils/services/fontService";
import {FontWeightEnum} from "@/utils/enums";

export type ThemedTextProps = TextProps & {
    type?: 'small' | 'miniBold' | 'miniExtraBold' | 'default' | 'bigTitle' | 'title' | 'h1' | 'defaultSemiBold' | 'defaultExtraBold' | 'subtitle' | 'link' | 'logo';
    filled?: boolean;
    inverseColor?: boolean;
    numberOfLines?: number;
    disableDarkMode?: boolean;
};

export function ThemedText({
                               className,
                               numberOfLines,
                               type = 'default',
                               filled = true,
                               inverseColor = false,
                               disableDarkMode = false,
                               style,
                               ...otherProps
                           }: ThemedTextProps
) {
    const styles = {
        small: {
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
        styles[type].fontSize,
        filled ?
            // TODO: Fix this later
            disableDarkMode ? 'text-foreground-light dark:text-foreground-light' :
                !inverseColor ?
                    `text-foreground-light dark:text-foreground-dark`
                    : `text-foreground-dark dark:text-foreground-light`
            : '',
        type === "link" ? 'underline underline-offset-8' : '',
        className ?? ''
    ];

    return (
        <Text
            className={classNames.join(' ')}
            style={{
                fontFamily: type === 'bigTitle' ?
                    FontService.getBigTitleFontStatic() : FontService.getMainFontStatic(styles[type].fontWeight),
                lineHeight: 0,
                ...(style as object || {})
            }}
            numberOfLines={numberOfLines}
            ellipsizeMode="tail"
            {...otherProps}
        />
    );
}