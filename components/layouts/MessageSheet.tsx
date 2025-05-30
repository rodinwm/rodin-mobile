import React, {ReactNode} from "react";
import {ThemedView} from '@/components/base/ThemedView';
import {ThemedText} from '@/components/base/ThemedText';
import {ThemedButton} from '@/components/base/ThemedButton';
import {ThemedBottomSheet} from '@/components/base/ThemedBottomSheet';

type Props = {
    title: string;
    subtitle: string;
    isOpen: boolean;
    children?: ReactNode;
    confirm?: {
        text: string;
        onPress: () => void;
    }
    cancel?: {
        text: string;
        onPress: () => void;
    }
    onClose: () => void;
    takeBottomBarIntoAccount?: boolean;
}

export function MessageSheet(props: Props) {

    return (
        <ThemedBottomSheet
            isOpen={props.isOpen}
            onClose={props.onClose}
            takeBottomBarIntoAccount={props.takeBottomBarIntoAccount}
        >
            <ThemedText type={'title'}>
                {props.title}
            </ThemedText>

            <ThemedText type={'defaultSemiBold'} className={"opacity-50"}>
                {props.subtitle}
            </ThemedText>

            {props.children && props.children}

            {(props.confirm || props.cancel) && (
                <ThemedView className={'w-full flex flex-row gap-3 mt-4'}>
                    {props.confirm ? (
                        <ThemedButton
                            title={props.confirm.text}
                            className={'flex-1'}
                            onPress={props.confirm.onPress}
                        />
                    ) : null}

                    {props.cancel ? (
                        <ThemedButton
                            title={props.cancel.text}
                            className={'flex-1'}
                            type={"outlined"}
                            onPress={props.cancel.onPress}
                        />
                    ) : null}
                </ThemedView>
            )}

        </ThemedBottomSheet>
    );
}

