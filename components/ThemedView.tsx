import {View, type ViewProps} from 'react-native';

export type ThemedViewProps = ViewProps & {
    lightColor?: string;
    darkColor?: string;
};

export function ThemedView({style, className, lightColor, darkColor, ...otherProps}: ThemedViewProps) {

    return (
        <View
            style={[style]}
            className={`bg-background-light dark:bg-background-dark ${className}`}
            {...otherProps}
        />
    );
}
