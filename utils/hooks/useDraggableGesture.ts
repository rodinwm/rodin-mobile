import {useWindowDimensions} from 'react-native';
import {useAnimatedStyle, useSharedValue, withSpring,} from 'react-native-reanimated';
import {Gesture} from 'react-native-gesture-handler';

export function useDraggableGesture() {
    const {width, height} = useWindowDimensions();
    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);

    const gesture = Gesture.Pan()
        .onUpdate((event) => {
            translateX.value = event.translationX;
            translateY.value = event.translationY;
        }).onEnd((event) => {
            const endX = event.translationX;
            const endY = event.translationY;

            // Snap X vers gauche ou droite selon la moitié de l'écran
            const targetX = endX < width / 2 ? 10 : width - 100;
            // Snap Y vers haut ou bas selon la moitié de l'écran
            const targetY = endY < height / 2 ? 10 : height - 100;

            translateX.value = withSpring(targetX, {damping: 20});
            translateY.value = withSpring(targetY, {damping: 20});
        });

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [
            {translateX: translateX.value},
            {translateY: translateY.value},
        ],
    }));

    return {gesture, animatedStyle};
}
