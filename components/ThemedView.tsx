import {View, type ViewProps} from 'react-native';
import {useThemeColor} from '@/hooks/useThemeColor';

export type ThemedViewProps = ViewProps & {
    lightColor?: string;
    darkColor?: string;
};

export function ThemedView({style, className, lightColor, darkColor, ...otherProps}: ThemedViewProps) {
    const backgroundColor = useThemeColor({light: lightColor, dark: darkColor}, 'background');

    return (
        <View
            style={[{backgroundColor}, style]}
            className={className}
            {...otherProps}
        />
    );
}
