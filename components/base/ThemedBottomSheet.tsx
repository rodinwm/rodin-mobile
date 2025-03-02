import BottomSheet, {BottomSheetView} from "@gorhom/bottom-sheet";
import React, {ReactNode, useEffect, useRef} from "react";
import {ThemedView} from "@/components/base/ThemedView";
import {Pressable} from "react-native";
import {BlurView} from "expo-blur";

export type ThemedBottomSheetProps = {
    isOpen: boolean;
    children?: ReactNode;
    onClose?: () => void;
};

export default function ThemedBottomSheet(props: ThemedBottomSheetProps) {
    const ref = useRef<BottomSheet>(null);
    const margin = 16;

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
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                }}
            >
                <BlurView intensity={50} tint="dark" style={{flex: 1}}/>
            </Pressable>

            {/* Bottom sheet */}
            <BottomSheet
                ref={ref}
                index={-1}
                detached={true}
                enablePanDownToClose={true}
                bottomInset={margin}
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
                        style={[style, {borderRadius: 36}]}
                        fillStyle={"default"}
                        radiusStyle={"big"}
                        outlined={true}
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