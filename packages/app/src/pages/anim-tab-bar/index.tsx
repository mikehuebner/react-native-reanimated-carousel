import { useCallback, useRef, useState } from 'react';
import { Pressable, View, useWindowDimensions } from 'react-native';

import Animated, {
  Extrapolation,
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import Carousel from '@mikehuebner/react-native-reanimated-carousel';

import SButton from '../../components/SButton';
import { ElementsText } from '../../constants';
import { useToggleButton } from '../../hooks/useToggleButton';

import type { ICarouselInstance } from '@mikehuebner/react-native-reanimated-carousel';

const PAGE_WIDTH = 60;
const PAGE_HEIGHT = 40;
const DATA = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

function Index() {
  const windowWidth = useWindowDimensions().width;
  const r = useRef<ICarouselInstance>(null);
  const AutoPLay = useToggleButton({
    defaultValue: false,
    buttonTitle: ElementsText.AUTOPLAY,
  });
  const [loop, setLoop] = useState(false);

  return (
    <View style={{ flex: 1 }}>
      <View style={{ marginVertical: 100 }}>
        <Carousel
          key={`${loop}`}
          ref={r}
          loop={loop}
          style={{
            width: windowWidth,
            height: PAGE_HEIGHT,
            justifyContent: 'center',
            alignItems: 'center',
            borderBottomWidth: 1,
            borderBottomColor: '#0071fa',
          }}
          width={PAGE_WIDTH}
          height={PAGE_HEIGHT}
          data={DATA}
          renderItem={({ item, animationValue }) => {
            return (
              <Item
                animationValue={animationValue}
                label={item}
                onPress={() =>
                  r.current?.scrollTo({
                    count: animationValue.value,
                    animated: true,
                  })
                }
              />
            );
          }}
          autoPlay={AutoPLay.status}
        />
      </View>
      {AutoPLay.button}
      <SButton onPress={() => setLoop(!loop)}>{`Loop: ${loop}`}</SButton>
      <View
        style={{
          marginTop: 24,
          flexDirection: 'row',
          justifyContent: 'space-evenly',
        }}
      >
        <SButton onPress={() => r.current?.prev()}>{'Prev'}</SButton>
        <SButton onPress={() => r.current?.next()}>{'Next'}</SButton>
      </View>
    </View>
  );
}

export default Index;

interface Props {
  animationValue: Animated.SharedValue<number>;
  label: string;
  onPress?: () => void;
}

const Item = (props: Props) => {
  const { animationValue, label, onPress } = props;

  const translateY = useSharedValue(0);

  const containerStyle = useAnimatedStyle(() => {
    const opacity = interpolate(animationValue.value, [-1, 0, 1], [0.5, 1, 0.5], Extrapolation.CLAMP);

    return {
      opacity,
    };
  }, [animationValue]);

  const labelStyle = useAnimatedStyle(() => {
    const scale = interpolate(animationValue.value, [-1, 0, 1], [1, 1.25, 1], Extrapolation.CLAMP);

    const color = interpolateColor(animationValue.value, [-1, 0, 1], ['#b6bbc0', '#0071fa', '#b6bbc0']);

    return {
      transform: [{ scale }, { translateY: translateY.value }],
      color,
    };
  }, [animationValue, translateY]);

  const onPressIn = useCallback(() => {
    translateY.value = withTiming(-8, { duration: 250 });
  }, [translateY]);

  const onPressOut = useCallback(() => {
    translateY.value = withTiming(0, { duration: 250 });
  }, [translateY]);

  return (
    <Pressable onPress={onPress} onPressIn={onPressIn} onPressOut={onPressOut}>
      <Animated.View
        style={[
          {
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          },
          containerStyle,
        ]}
      >
        <Animated.Text style={[{ fontSize: 18, color: '#26292E' }, labelStyle]}>{label}</Animated.Text>
      </Animated.View>
    </Pressable>
  );
};
