import {TextInput, type TextInputProps} from 'react-native';
import {FontHelper} from "@/utils/helpers/fontHelper";
import {FontWeightEnum} from "@/utils/enums";

export type ThemedViewProps = TextInputProps & {
    value?: string;
    bigText?: boolean;
    radiusStyle?: "default" | "full" | "left-only" | "right-only" | "none";
};

export function ThemedTextInput({
                                    value,
                                    bigText,
                                    className,
                                    radiusStyle = "default",
                                    ...otherProps
                                }: ThemedViewProps
) {
    const classNames: string[] = [
        'h-auto font-sans px-6 py-4 border border-foreground-light/20 dark:border-foreground-dark/20 text-foreground-light dark:text-foreground-dark bg-foreground-light/15 dark:bg-foreground-dark/15 ',
        bigText ? 'text-2xl' : 'text-lg',
        radiusStyle === "default" ?
            'rounded-2xl' : radiusStyle === "full" ?
                'rounded-full' : radiusStyle === "left-only" ?
                    'rounded-l-2xl' : radiusStyle === "right-only" ?
                        'rounded-r-2xl' : '',
        className ?? ''
    ];

    return (
        <TextInput
            className={classNames.join(' ')}
            keyboardType={"number-pad"}
            value={value}
            maxLength={2}
            style={{fontFamily: FontHelper.getMainFontStatic(FontWeightEnum.Medium)}}
            {...otherProps}
        />
    );
}
