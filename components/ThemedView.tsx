import {View, type ViewProps} from 'react-native';

export type ThemedViewProps = ViewProps & {
    filled?: boolean;
    rounded?: boolean;
};

export function ThemedView({className, filled = false, rounded = false, ...otherProps}: ThemedViewProps) {
    const classNames: string[] = [
        filled ? 'bg-background-light dark:bg-background-dark' : '',
        rounded ? 'rounded-3xl' : '',
        className ?? ''
    ];

    return (
        <View
            className={classNames.join(' ')}
            {...otherProps}
        />
    );
}
