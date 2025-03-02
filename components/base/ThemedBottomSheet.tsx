import BottomSheet, {BottomSheetView} from "@gorhom/bottom-sheet";
import React, {forwardRef, ReactNode} from "react";
import {BottomSheetMethods} from '@gorhom/bottom-sheet/lib/typescript/types';
import {ThemedView} from "@/components/base/ThemedView";

export type ThemedBottomSheetProps = {
    children?: ReactNode;
};

export const ThemedBottomSheet = forwardRef<BottomSheetMethods, ThemedBottomSheetProps>(
    (props, ref) => {
        return (
            <BottomSheet
                ref={ref}
                index={-1}
                detached={true}
                bottomInset={20}
                enablePanDownToClose={true}
                style={{marginHorizontal: 16}}
                handleComponent={() => (
                    <ThemedView
                        paddingStyle={"mini"}
                        className={'w-full flex items-center justify-center'}
                    >
                        <ThemedView
                            //outlined={true}
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
        );
    }
);