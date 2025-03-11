import BottomSheet, {BottomSheetView} from "@gorhom/bottom-sheet";
import React, {ReactNode, useEffect, useRef} from "react";
import {ThemedView} from "@/components/base/ThemedView";
import {Pressable} from "react-native";
import {BlurView} from "expo-blur";
import {useBottomTabOverflow} from "@/components/base/TabBarBackground";
import {useSafeAreaInsets} from "react-native-safe-area-context";

export type ThemedBottomSheetProps = {
    isOpen: boolean;
    children?: ReactNode;
    onClose?: () => void;
    takeBottomBarIntoAccount?: boolean;
};

export default function ThemedBottomSheet(props: ThemedBottomSheetProps) {
    const margin = 10;
    const ref = useRef<BottomSheet>(null);
    const insets = useSafeAreaInsets();

    useEffect(() => {
        if (props.isOpen) {
            ref.current?.expand();
        } else {
            ref.current?.close();
        }
    }, [props.isOpen]);

    return (
        <>
            {/* Flou d'arrière-plan */}
            <Pressable
                className={props.isOpen ? '' : 'hidden'}
                onPress={props.onClose}
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
                enablePanDownToClose={true}
                bottomInset={margin + (props.takeBottomBarIntoAccount ? insets.bottom + useBottomTabOverflow() : 0)}
                onClose={props.onClose}
                style={{marginHorizontal: margin}}
                handleComponent={() => (
                    <ThemedView
                        paddingStyle={"mini"}
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
                        outlined={true}
                        className={'shadow-xl'}
                    />
                )}
            >
                <BottomSheetView className={'p-6 flex flex-col gap-3'}>
                    {props.children}
                </BottomSheetView>
            </BottomSheet>
        </>
    );

}