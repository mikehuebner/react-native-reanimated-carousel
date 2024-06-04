import React from 'react';

import Animated, {
  SharedValue,
  useAnimatedStyle,
  useDerivedValue,
} from 'react-native-reanimated';

import { useOffsetX } from '../hooks/useOffsetX';
import { CTX } from '../store';

import type { IOpts } from '../hooks/useOffsetX';
import type { IVisibleRanges } from '../hooks/useVisibleRanges';
import type { ILayoutConfig } from '../layouts/stack';


export type TAnimationStyle = (
  value: number,
) => ReturnType<typeof useAnimatedStyle>;

export const BaseLayout = (props: {
  index: number;
  handlerOffset: SharedValue<number>;
  visibleRanges: IVisibleRanges;
  animationStyle: TAnimationStyle;
  children: (ctx: {
    animationValue: SharedValue<number>;
  }) => React.ReactElement;
}) => {
  const { handlerOffset, index, children, visibleRanges, animationStyle } =
    props;

  const context = React.useContext(CTX);
  const {
    props: {
      loop,
      dataLength,
      width,
      height,
      vertical,
      customConfig,
      mode,
      modeConfig,
    },
  } = context;
  const size = vertical ? height : width;

  let offsetXConfig: IOpts = {
    handlerOffset,
    index,
    size,
    dataLength,
    loop,
    ...(typeof customConfig === 'function' ? customConfig() : {}),
  };

  if (mode === 'horizontal-stack') {
    const { snapDirection, showLength } = modeConfig as ILayoutConfig;

    offsetXConfig = {
      handlerOffset,
      index,
      size,
      dataLength,
      loop,
      type: snapDirection === 'right' ? 'negative' : 'positive',
      viewCount: showLength,
    };
  }

  const x = useOffsetX(offsetXConfig, visibleRanges);
  const animationValue = useDerivedValue(() => x.value / size, [x, size]);
  const animatedStyle = useAnimatedStyle(() => {
    return animationStyle(x.value / size);
  }, [animationStyle, x]);

  return (
    <Animated.View
      style={[
        {
          width: width || '100%',
          height: height || '100%',
          position: 'absolute',
        },
        animatedStyle,
      ]}
      /**
       * We use this testID to know when the carousel item is ready to be tested in test.
       * e.g.
       *  The testID of first item will be changed to __CAROUSEL_ITEM_0_READY__ from __CAROUSEL_ITEM_0_NOT_READY__ when the item is ready.
       * */
      testID={`__CAROUSEL_ITEM_${index}__`}
    >
      {children({ animationValue })}
    </Animated.View>
  );
};
