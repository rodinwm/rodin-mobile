import {PropsWithChildren, useState} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';

import {ThemedView} from '@/components/base/ThemedView';
import {ThemedText} from '@/components/base/ThemedText';
import {LucideIcon} from '@/components/base/LucideIcon';
import {Colors} from '@/utils/colors';
import {useColorScheme} from '@/utils/hooks/useColorScheme';

export function Collapsible({children, title}: PropsWithChildren & { title: string }) {
    const [isOpen, setIsOpen] = useState(false);
    const theme = useColorScheme() ?? 'light';

    return (
        <ThemedView>
            <TouchableOpacity
                style={styles.heading}
                onPress={() => setIsOpen((value) => !value)}
                activeOpacity={0.8}>
                <LucideIcon
                    size={20}
                    color={theme === 'light' ? Colors.foreground.light : Colors.foreground.dark}
                    name="ChevronRight"
                    style={{
                        transform: [{rotate: isOpen ? `90deg` : '0deg'}]
                    }}
                />

                <ThemedText type="defaultSemiBold">{title}</ThemedText>
            </TouchableOpacity>
            {isOpen && <ThemedView style={styles.content}>{children}</ThemedView>}
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    heading: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    content: {
        marginTop: 6,
        marginLeft: 24,
    },
});
