import {useAnimatedStyle, useSharedValue, withSpring} from 'react-native-reanimated';
import {Gesture} from 'react-native-gesture-handler';
import {LayoutRectangle} from "react-native";

type Props = {
    elementLayout: LayoutRectangle;
    parentLayout: LayoutRectangle;
    padding?: number;
}

export function useDraggableGesture({elementLayout, parentLayout, padding = 0}: Props) {
    const offsetX = useSharedValue(padding);
    const offsetY = useSharedValue(padding);
    const translateX = useSharedValue(padding);
    const translateY = useSharedValue(padding);

    const gesture = Gesture.Pan()
        .onUpdate((event) => {
            const rawX = offsetX.value + event.translationX;
            const rawY = offsetY.value + event.translationY;

            const minX = padding;
            const maxX = parentLayout.width - elementLayout.width - padding;
            const minY = padding;
            const maxY = parentLayout.height - elementLayout.height - padding;

            translateX.value = Math.min(Math.max(rawX, minX), maxX);
            translateY.value = Math.min(Math.max(rawY, minY), maxY);
        })
        .onEnd(() => {
            offsetX.value = translateX.value;
            offsetY.value = translateY.value;

            const centerX = translateX.value + elementLayout.width / 2;
            const centerY = translateY.value + elementLayout.height / 2;

            const targetX = centerX < parentLayout.width / 2
                ? padding
                : parentLayout.width - elementLayout.width - padding;

            const targetY = centerY < parentLayout.height / 2
                ? padding
                : parentLayout.height - elementLayout.height - padding;

            translateX.value = withSpring(targetX, {damping: 20});
            translateY.value = withSpring(targetY, {damping: 20});

            offsetX.value = targetX;
            offsetY.value = targetY;
        });


    const animatedStyle = useAnimatedStyle(() => ({
        transform: [
            {translateX: translateX.value},
            {translateY: translateY.value},
        ],
    }));

    return {gesture, animatedStyle};
}
