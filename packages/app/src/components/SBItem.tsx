import { useState } from 'react';
import type { ImageSourcePropType, StyleProp, ViewProps, ViewStyle } from 'react-native';

import { LongPressGestureHandler } from 'react-native-gesture-handler';
import type { AnimatedProps } from 'react-native-reanimated';
import Animated from 'react-native-reanimated';

import Constants from 'expo-constants';

import { SBImageItem } from './SBImageItem';
import { SBTextItem } from './SBTextItem';

interface Props extends AnimatedProps<ViewProps> {
  style?: StyleProp<ViewStyle>;
  index?: number;
  pretty?: boolean;
  showIndex?: boolean;
  img?: ImageSourcePropType;
}

export const SBItem = (props: Props) => {
  const { style, showIndex = true, index, pretty, img, testID, ...animatedViewProps } = props;
  const enablePretty = Constants?.expoConfig?.extra?.enablePretty || false;
  const [isPretty, setIsPretty] = useState(pretty || enablePretty);
  return (
    <LongPressGestureHandler
      onActivated={() => {
        setIsPretty(!isPretty);
      }}
    >
      <Animated.View testID={testID} style={{ flex: 1 }} {...animatedViewProps}>
        {isPretty || img ? (
          <SBImageItem style={style} index={index} showIndex={typeof index === 'number' && showIndex} img={img} />
        ) : (
          <SBTextItem style={style} index={index} />
        )}
      </Animated.View>
    </LongPressGestureHandler>
  );
};
