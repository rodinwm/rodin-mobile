import {useAnimatedStyle, useSharedValue, withSpring} from 'react-native-reanimated';
import {Gesture} from 'react-native-gesture-handler';

type Props = {
    elementLayout: {
        width: number;
        height: number;
    };
    parentLayout: {
        width: number;
        height: number;
    };
}

export function useDraggableGesture(props: Props) {
    const offsetX = useSharedValue(0);
    const offsetY = useSharedValue(0);
    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);

    const gesture = Gesture.Pan()
        .onUpdate((event) => {
            // Position temporaire pendant le drag
            const rawX = offsetX.value + event.translationX;
            const rawY = offsetY.value + event.translationY;

            // Marges
            const minX = 10;
            const maxX = props.parentLayout.width - props.elementLayout.width - minX;
            const minY = 10;
            const maxY = props.parentLayout.height - props.elementLayout.height - minY;

            // Clamp dans les bornes
            translateX.value = Math.min(Math.max(rawX, minX), maxX);
            translateY.value = Math.min(Math.max(rawY, minY), maxY);
        })
        .onEnd(() => {
            // Met à jour les offsets
            offsetX.value = translateX.value;
            offsetY.value = translateY.value;

            // Calcul du centre
            const centerX = translateX.value + props.elementLayout.width / 2;
            const centerY = translateY.value + props.elementLayout.height / 2;

            // Position de snap avec marges
            const targetX = centerX < props.parentLayout.width / 2
                ? 10
                : props.parentLayout.width - props.elementLayout.width - 10;

            const targetY = centerY < props.parentLayout.height / 2
                ? 10
                : props.parentLayout.height - props.elementLayout.height - 10;

            // Animation
            translateX.value = withSpring(targetX, {damping: 20});
            translateY.value = withSpring(targetY, {damping: 20});

            // On met aussi à jour les offsets après le snap
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
