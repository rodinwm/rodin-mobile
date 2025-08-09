import {ThemedView} from "@/components/base/ThemedView";
import React from "react";
import {LucideIcon} from "@/components";

type Props = {
    type: 'up' | 'down';
    variant?: 'no-fill' | 'default';
};

export function EvolutionArrow(props: Props) {
    return (
        <ThemedView
            className={'flex flex-row justify-center items-center'}
            radiusStyle={props.variant === 'no-fill' ? 'none' : 'small'}
            paddingStyle={props.variant === 'no-fill' ? 'none' : 'extraSmall'}
            fillStyle={props.variant === 'no-fill' ? 'none' : props.type === 'up' ? 'success' : 'danger'}
        >
            <LucideIcon
                size={props.variant === 'no-fill' ? 18 : 10}
                strokeWidth={3}
                color={props.variant !== 'no-fill' ? 'white' : props.type === 'up' ? 'green' : 'red'}
                name={props.variant === 'no-fill' ?
                    props.type === 'up' ? 'ArrowBigUp' : 'ArrowBigDown'
                    :
                    props.type === 'up' ? 'ChevronUp' : 'ChevronDown'
                }
            />
        </ThemedView>
    );
}