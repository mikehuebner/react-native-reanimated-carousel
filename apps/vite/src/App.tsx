import { useEffect } from 'react';
import { Text } from 'react-native';
import Animated, {
  Easing,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { App } from 'react-native-reanimated-carousel-example-app';

const ViteApp = () => {
  const arrowValue = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(
    () => ({
      transform: [
        { translateY: interpolate(arrowValue.value, [0, 1], [15, -15]) },
        {
          scale: withTiming(1, {
            duration: 1500,
            easing: Easing.inOut(Easing.ease),
          }),
        },
      ],
      opacity: interpolate(arrowValue.value, [0, 0.5, 0.8, 1], [-0.5, 1, 1, 0]),
    }),
    [arrowValue],
  );

  useEffect(() => {
    arrowValue.value = withRepeat(
      withSequence(
        withDelay(
          50,
          withTiming(1, {
            duration: 1500,
            easing: Easing.inOut(Easing.ease),
          }),
        ),
        withTiming(0, {
          duration: 0,
          easing: Easing.inOut(Easing.ease),
        }),
      ),
      -1,
    );
  }, []);

  return (
    <>
      <Animated.View
        style={[
          {
            transform: [
              { translateY: 0 },
              {
                scale: 0,
              },
            ],
          },
          animatedStyle,
        ]}
      >
        <Text>Open up App.tsx to start working on your app!</Text>
      </Animated.View>
      {/* <App /> */}
    </>
  );
};

export default ViteApp;
