import {View, type ViewProps} from 'react-native';

export type ThemedViewProps = ViewProps & {
    outlined?: boolean;
    fillStyle?: "default" | "opacity-15" | "none";
    radiusStyle?: "default" | "full" | "none";
    paddingStyle?: "default" | "asymetric" | "mini" | "none";
};

export function ThemedView({
                               className,
                               outlined = false,
                               fillStyle = "none",
                               radiusStyle = "none",
                               paddingStyle = "none",
                               ...otherProps
                           }: ThemedViewProps
) {
    const classNames: string[] = [
        fillStyle === "default" ?
            'bg-background-light dark:bg-background-dark' : fillStyle === "opacity-15" ?
                'bg-foreground-light/15 dark:bg-foreground-dark/15' : '',
        radiusStyle === "default" ?
            'rounded-3xl' : radiusStyle === "full" ?
                'rounded-full' : '',
        outlined ? 'border border-foreground-light/20 dark:border-foreground-dark/20' : '',
        paddingStyle === "default" ?
            'p-6' : paddingStyle === "asymetric" ?
                'px-6 py-3' : paddingStyle === "mini" ?
                    'p-3' : '',
        className ?? ''
    ];

    return (
        <View
            className={classNames.join(' ')}
            {...otherProps}
        />
    );
}
