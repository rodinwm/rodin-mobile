import BottomSheet, {BottomSheetView} from "@gorhom/bottom-sheet";
import React, {ReactNode, useCallback, useEffect, useRef, useState} from "react";
import {ThemedView} from "@/components/base/ThemedView";
import {Pressable} from "react-native";
import {BlurView} from "expo-blur";
import {useBottomTabOverflow} from "@/components/base/TabBarBackground";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {useKeyboard} from "@/utils/hooks/useKeyboard";

export type ThemedBottomSheetProps = {
    isOpen: boolean;
    children?: ReactNode;
    onClose?: () => void;
    closeOnTapOutside?: boolean;
    takeBottomBarIntoAccount?: boolean;
};

export function ThemedBottomSheet({
                                      isOpen,
                                      children,
                                      onClose,
                                      closeOnTapOutside = true,
                                      takeBottomBarIntoAccount = false
                                  }: ThemedBottomSheetProps) {
    const margin = 10;
    const ref = useRef<BottomSheet>(null);
    const insets = useSafeAreaInsets();
    const {isKeyboardVisible, keyboardHeight} = useKeyboard();
    const [localOpen, setLocalOpen] = useState(false);

    // Open/Close logic
    useEffect(() => {
        if (isOpen) {
            ref.current?.expand();
            setLocalOpen(true);
        } else {
            ref.current?.close();
        }
    }, [isOpen]);

    const handleSheetClose = useCallback(() => {
        setLocalOpen(false);
        onClose?.();
    }, [onClose]);

    return (
        <>
            {/* Background blur */}
            <Pressable
                className={isOpen ? '' : 'hidden'}
                onPress={closeOnTapOutside ? handleSheetClose : undefined}
                style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0}}
            >
                <BlurView
                    intensity={50}
                    tint="dark"
                    className={'flex-1'}
                />
            </Pressable>

            {/* Bottom sheet */}
            <BottomSheet
                ref={ref}
                index={-1}
                detached={true}
                enablePanDownToClose={closeOnTapOutside}
                bottomInset={margin + (takeBottomBarIntoAccount ? insets.bottom + useBottomTabOverflow() : 0) + (isKeyboardVisible ? keyboardHeight : 0)}
                onClose={handleSheetClose}
                style={{marginHorizontal: margin}}
                handleComponent={() => (
                    <ThemedView
                        paddingStyle={"small"}
                        className={'w-full flex items-center justify-center'}
                    >
                        <ThemedView
                            radiusStyle={"full"}
                            className={'w-10 h-2'}
                            fillStyle={"opacity-15"}
                        />
                    </ThemedView>
                )}
                backgroundComponent={({style}) => (
                    <ThemedView
                        style={[style, {borderRadius: 40}]}
                        fillStyle={"default"}
                        radiusStyle={"big"}
                        borderStyle={"opacity-20"}
                        className={'shadow-xl'}
                    />
                )}
            >
                <BottomSheetView className={'p-6 flex flex-col gap-3'}>
                    {children}
                </BottomSheetView>
            </BottomSheet>
        </>
    );

}