import {StyleSheet, Text} from 'react-native';
import BottomSheet, {BottomSheetView} from "@gorhom/bottom-sheet";
import React, {forwardRef} from "react";
import {BottomSheetMethods} from '@gorhom/bottom-sheet/lib/typescript/types';

export type ThemedBottomSheetProps = {};

export const ThemedBottomSheet = forwardRef<BottomSheetMethods, ThemedBottomSheetProps>(
    (props, ref) => {
        return (
            <BottomSheet
                ref={ref} // Utilisation correcte du ref
                index={-1} // Caché au démarrage
                snapPoints={['25%', '50%']} // Hauteurs possibles
                enablePanDownToClose={true} // Swipe vers le bas pour fermer
            >
                <BottomSheetView style={styles.contentContainer}>
                    <Text>Awesome 🎉</Text>
                </BottomSheetView>
            </BottomSheet>
        );
    }
);

const styles = StyleSheet.create({
    contentContainer: {
        flex: 1,
        padding: 36,
        alignItems: 'center',
    },
});
