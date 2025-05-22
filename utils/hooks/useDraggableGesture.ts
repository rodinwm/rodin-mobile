import {useWindowDimensions} from 'react-native';
import {useAnimatedStyle, useSharedValue, withSpring,} from 'react-native-reanimated';
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
    const {width, height} = useWindowDimensions();
    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);

    const gesture = Gesture.Pan()
        .onUpdate((event) => {
            translateX.value = event.translationX;
            translateY.value = event.translationY;
        }).onEnd((event) => {
            // Snap X vers gauche ou droite selon la moitié de l'écran
            const targetX = event.translationX < props.parentLayout.width / 2 ? 10 : props.parentLayout.width - props.elementLayout.width - 10;
            // Snap Y vers haut ou bas selon la moitié de l'écran
            const targetY = event.translationY < props.parentLayout.height / 2 ? 10 : props.parentLayout.height - props.elementLayout.height - 10;

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
