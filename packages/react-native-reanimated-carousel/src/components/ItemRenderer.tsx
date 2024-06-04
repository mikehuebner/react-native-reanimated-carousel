import { useState } from 'react';

import type { SharedValue, useAnimatedStyle } from 'react-native-reanimated';
import { runOnJS, useAnimatedReaction } from 'react-native-reanimated';

import { BaseLayout } from './BaseLayout';
import { useVisibleRanges } from '../hooks/useVisibleRanges';
import { computedRealIndexWithAutoFillData } from '../utils/computed-with-auto-fill-data';

import type { TAnimationStyle } from './BaseLayout';
import type { VisibleRanges } from '../hooks/useVisibleRanges';
import type { CarouselRenderItem } from '../types';


interface ItemRendererProps {
  data: unknown[];
  dataLength: number;
  rawDataLength: number;
  loop: boolean;
  size: number;
  windowSize?: number;
  autoFillData: boolean;
  offsetX: SharedValue<number>;
  handlerOffset: SharedValue<number>;
  layoutConfig: TAnimationStyle;
  renderItem: CarouselRenderItem<unknown>;
  customAnimation?: (value: number) => ReturnType<typeof useAnimatedStyle>;
}

export const ItemRenderer = (props: ItemRendererProps) => {
  const {
    data,
    size,
    windowSize,
    handlerOffset,
    offsetX,
    dataLength,
    rawDataLength,
    loop,
    autoFillData,
    layoutConfig,
    renderItem,
    customAnimation,
  } = props;

  const visibleRanges = useVisibleRanges({
    total: dataLength,
    viewSize: size,
    translation: handlerOffset,
    windowSize,
    loop,
  });

  const [displayedItems, setDisplayedItems] = useState<VisibleRanges>(null!);

  useAnimatedReaction(
    () => visibleRanges.value,
    (ranges) => runOnJS(setDisplayedItems)(ranges),
    [visibleRanges],
  );

  if (!displayedItems) return null;

  return (
    <>
      {data.map((item, index) => {
        const realIndex = computedRealIndexWithAutoFillData({
          index,
          dataLength: rawDataLength,
          loop,
          autoFillData,
        });
        const { negativeRange, positiveRange } = displayedItems;

        const shouldRender =
          (index >= negativeRange[0] && index <= negativeRange[1]) ||
          (index >= positiveRange[0] && index <= positiveRange[1]);

        if (!shouldRender) return null;

        return (
          <BaseLayout
            key={index}
            index={index}
            handlerOffset={offsetX}
            visibleRanges={visibleRanges}
            animationStyle={customAnimation || layoutConfig}
          >
            {({ animationValue }) =>
              renderItem({
                item,
                index: realIndex,
                animationValue,
              })
            }
          </BaseLayout>
        );
      })}
    </>
  );
};
