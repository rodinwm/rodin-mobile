import {useAnimatedStyle, useSharedValue} from 'react-native-reanimated';
import {Gesture} from 'react-native-gesture-handler';

export function useDraggableGesture() {
    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);

    const gesture = Gesture.Pan()
        .onUpdate((event) => {
            translateX.value = event.translationX;
            translateY.value = event.translationY;
        })
        .onEnd(() => {
            // Optionnel : revenir à l'origine après le drag
            // translateX.value = 0;
            // translateY.value = 0;
        });

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [
            {translateX: translateX.value},
            {translateY: translateY.value},
        ],
    }));

    return {gesture, animatedStyle};
}
