import {TextInput, type TextInputProps} from 'react-native';
import {FontHelper} from "@/utils/helpers/fontHelper";
import {FontWeightEnum} from "@/utils/enums";

export type ThemedViewProps = TextInputProps & {
    bigText?: boolean;
    radiusStyle?: "default" | "full" | "left-only" | "right-only" | "none";
};

export function ThemedTextInput({
                                    bigText,
                                    className,
                                    maxLength,
                                    radiusStyle = "default",
                                    ...otherProps
                                }: ThemedViewProps
) {
    const classNames: string[] = [
        'font-sans px-6 py-4 border border-foreground-light/20 dark:border-foreground-dark/20 text-foreground-light dark:text-foreground-dark bg-foreground-light/15 dark:bg-foreground-dark/15 ',
        bigText ? 'text-2xl' : 'text-lg',
        radiusStyle === "default" ?
            'rounded-3xl' : radiusStyle === "full" ?
                'rounded-full' : radiusStyle === "left-only" ?
                    'rounded-l-3xl' : radiusStyle === "right-only" ?
                        'rounded-r-3xl' : '',
        className ?? ''
    ];

    return (
        <TextInput
            className={classNames.join(' ')}
            placeholderClassName={bigText ? 'text-2xl' : 'text-lg'}
            style={{fontFamily: FontHelper.getMainFontStatic(FontWeightEnum.Medium)}}
            {...otherProps}
        />
    );
}
