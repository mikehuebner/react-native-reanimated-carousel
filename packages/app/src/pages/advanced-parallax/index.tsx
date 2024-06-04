import { useCallback, useState } from 'react';
import { View, useWindowDimensions } from 'react-native';

import Animated, { SharedValue, interpolate, interpolateColor, useAnimatedStyle } from 'react-native-reanimated';
import Carousel, { TAnimationStyle } from '@mikehuebner/react-native-reanimated-carousel';

import { SBItem } from '../../components/SBItem';
import SButton from '../../components/SButton';
import { ElementsText } from '../../constants';

interface ItemProps {
  index: number;
  animationValue: SharedValue<number>;
}
const CustomItem = ({ index, animationValue }: ItemProps) => {
  const maskStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      animationValue.value,
      [-1, 0, 1],
      ['#000000dd', 'transparent', '#000000dd'],
    );

    return {
      backgroundColor,
    };
  }, [animationValue]);

  return (
    <View style={{ flex: 1 }}>
      <SBItem key={index} index={index} style={{ borderRadius: 0 }} />
      <Animated.View
        pointerEvents="none"
        style={[
          {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          },
          maskStyle,
        ]}
      />
    </View>
  );
};
function Index() {
  const [isAutoPlay, setIsAutoPlay] = useState(false);
  const windowWidth = useWindowDimensions().width;
  const animationStyle: TAnimationStyle = useCallback(
    (value: number) => {
      'worklet';

      const zIndex = interpolate(value, [-1, 0, 1], [10, 20, 30]);
      const translateX = interpolate(value, [-2, 0, 1], [-windowWidth, 0, windowWidth]);

      return {
        transform: [{ translateX }],
        zIndex,
      };
    },
    [windowWidth],
  );

  return (
    <View style={{ flex: 1 }}>
      <Carousel
        loop={true}
        autoPlay={isAutoPlay}
        style={{ width: windowWidth, height: 240 }}
        width={windowWidth}
        data={[...new Array(6).keys()]}
        renderItem={({ index, animationValue }) => {
          return <CustomItem key={index} index={index} animationValue={animationValue} />;
        }}
        customAnimation={animationStyle}
        scrollAnimationDuration={1200}
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

export default Index;
