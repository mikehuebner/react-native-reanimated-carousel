import { useState } from 'react';
import { View } from 'react-native';

import Animated, { Extrapolation, SharedValue, interpolate, useAnimatedStyle } from 'react-native-reanimated';

import Carousel from '@mikehuebner/react-native-reanimated-carousel';

import SButton from '../../components/SButton';
import { ElementsText, windowDimensions } from '../../constants';
import { withAnchorPoint } from '../../utils/anchor-point';
import { fruitItems } from '../../utils/items';

const colors = ['#fda282', '#fdba4e', '#800015'];

const PAGE_WIDTH = windowDimensions.width;
const PAGE_HEIGHT = windowDimensions.width * 1.2;

function Index() {
  const [isAutoPlay, setIsAutoPlay] = useState(false);

  const baseOptions = {
    vertical: false,
    width: PAGE_WIDTH,
    height: PAGE_HEIGHT,
  } as const;

  return (
    <View style={{ flex: 1 }}>
      <Carousel
        {...baseOptions}
        loop
        autoPlay={isAutoPlay}
        withAnimation={{
          type: 'spring',
          config: {
            damping: 13,
          },
        }}
        autoPlayInterval={1500}
        data={colors}
        renderItem={({ index, animationValue }) => <Card animationValue={animationValue} key={index} index={index} />}
      />
      <SButton
        onPress={() => {
          setIsAutoPlay(!isAutoPlay);
        }}
      >
        {ElementsText.AUTOPLAY}:{`${isAutoPlay}`}
      </SButton>
    </View>
  );
}

const Card = ({ index, animationValue }: { index: number; animationValue: SharedValue<number> }) => {
  const WIDTH = PAGE_WIDTH / 1.5;
  const HEIGHT = PAGE_HEIGHT / 1.5;

  const cardStyle = useAnimatedStyle(() => {
    const scale = interpolate(animationValue.value, [-0.1, 0, 1], [0.95, 1, 1], Extrapolation.CLAMP);

    const translateX = interpolate(animationValue.value, [-1, -0.2, 0, 1], [0, WIDTH * 0.3, 0, 0]);

    const transform = {
      transform: [
        { scale },
        { translateX },
        { perspective: 200 },
        {
          rotateY: `${interpolate(animationValue.value, [-1, 0, 0.4, 1], [30, 0, -25, -25], Extrapolation.CLAMP)}deg`,
        },
      ],
    };

    return {
      ...withAnchorPoint(transform, { x: 0.5, y: 0.5 }, { width: WIDTH, height: HEIGHT }),
    };
  }, [WIDTH, HEIGHT, animationValue]);

  const blockStyle = useAnimatedStyle(() => {
    const translateX = interpolate(animationValue.value, [-1, 0, 1], [0, 60, 60]);

    const translateY = interpolate(animationValue.value, [-1, 0, 1], [0, -40, -40]);

    const rotateZ = interpolate(animationValue.value, [-1, 0, 1], [0, 0, -25]);

    return {
      transform: [{ translateX }, { translateY }, { rotateZ: `${rotateZ}deg` }],
    };
  }, [animationValue]);

  return (
    <Animated.View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Animated.View
        style={[
          {
            backgroundColor: colors[index],
            alignSelf: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 20,
            width: WIDTH,
            height: HEIGHT,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 8,
            },
            shadowOpacity: 0.44,
            shadowRadius: 10.32,

            elevation: 16,
          },
          cardStyle,
        ]}
      />

      <Animated.Image
        source={fruitItems[index % 3]}
        style={[
          {
            width: WIDTH * 0.8,
            borderRadius: 16,
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            zIndex: 999,
          },
          blockStyle,
        ]}
        resizeMode={'contain'}
      />
    </Animated.View>
  );
};

export default Index;
