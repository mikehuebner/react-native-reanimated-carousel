// @ts-expect-error -- This is required for Vite to work, not sure why
import React, { PropsWithChildren, ReactElement, forwardRef, useCallback, useImperativeHandle } from 'react';
import { StyleSheet } from 'react-native';

import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { runOnJS, useDerivedValue } from 'react-native-reanimated';

import { ItemRenderer } from './ItemRenderer';
import { ScrollViewGesture } from './ScrollViewGesture';
import { useAutoPlay } from '../hooks/useAutoPlay';
import { useCarouselController } from '../hooks/useCarouselController';
import { useCommonVariables } from '../hooks/useCommonVariables';
import { useInitProps } from '../hooks/useInitProps';
import { useLayoutConfig } from '../hooks/useLayoutConfig';
import { useOnProgressChange } from '../hooks/useOnProgressChange';
import { usePropsErrorBoundary } from '../hooks/usePropsErrorBoundary';
import { CTX } from '../store';
import { computedRealIndexWithAutoFillData } from '../utils/computed-with-auto-fill-data';

import type { ICarouselInstance, TCarouselProps } from '../types';

const Carousel = forwardRef<ICarouselInstance, TCarouselProps<unknown>>((_props, ref) => {
  const props = useInitProps(_props);

  const {
    testID,
    loop,
    autoFillData,
    // Fill data with autoFillData
    data,
    // Length of fill data
    dataLength,
    // Length of raw data
    rawDataLength,
    mode,
    style,
    width,
    height,
    vertical,
    autoPlay,
    windowSize,
    autoPlayReverse,
    autoPlayInterval,
    scrollAnimationDuration,
    withAnimation,
    fixedDirection,
    renderItem,
    onScrollEnd,
    onSnapToItem,
    onScrollStart,
    onProgressChange,
    customAnimation,
    defaultIndex,
  } = props;

  const commonVariables = useCommonVariables(props);
  const { size, handlerOffset } = commonVariables;

  const offsetX = useDerivedValue(() => {
    const totalSize = size * dataLength;
    const x = handlerOffset.value % totalSize;

    if (!loop) return handlerOffset.value;

    return isNaN(x) ? 0 : x;
  }, [loop, size, dataLength, handlerOffset]);

  // @ts-expect-error == types do not exist
  usePropsErrorBoundary({ ...props, dataLength });
  const progressValue = useOnProgressChange({
    autoFillData,
    loop,
    size,
    offsetX,
    rawDataLength,
    onProgressChange,
  });

  const carouselController = useCarouselController({
    loop,
    size,
    dataLength,
    autoFillData,
    handlerOffset,
    withAnimation,
    defaultIndex,
    fixedDirection,
    duration: scrollAnimationDuration,
    onScrollEnd: () => runOnJS(_onScrollEnd)(),
    onScrollStart: () => !!onScrollStart && runOnJS(onScrollStart)(),
  });

  const { next, prev, scrollTo, getSharedIndex, getCurrentIndex } = carouselController;

  const { start: startAutoPlay, pause: pauseAutoPlay } = useAutoPlay({
    autoPlay,
    autoPlayInterval,
    autoPlayReverse,
    carouselController,
  });

  const _onScrollEnd = useCallback(() => {
    const _sharedIndex = Math.round(getSharedIndex());

    const realIndex = computedRealIndexWithAutoFillData({
      index: _sharedIndex,
      dataLength: rawDataLength,
      loop,
      autoFillData,
    });

    if (onSnapToItem) onSnapToItem(realIndex);

    if (onScrollEnd) onScrollEnd(realIndex);
  }, [loop, autoFillData, rawDataLength, getSharedIndex, onSnapToItem, onScrollEnd]);

  const scrollViewGestureOnScrollStart = useCallback(() => {
    pauseAutoPlay();
    onScrollStart?.();
  }, [onScrollStart, pauseAutoPlay]);

  const scrollViewGestureOnScrollEnd = useCallback(() => {
    startAutoPlay();
    _onScrollEnd();
  }, [_onScrollEnd, startAutoPlay]);

  const scrollViewGestureOnTouchBegin = useCallback(pauseAutoPlay, [pauseAutoPlay]);

  const scrollViewGestureOnTouchEnd = useCallback(startAutoPlay, [startAutoPlay]);

  useImperativeHandle(
    ref,
    () => ({
      next,
      prev,
      getCurrentIndex,
      scrollTo,
      progressValue,
    }),
    [getCurrentIndex, next, prev, progressValue, scrollTo],
  );

  // @ts-expect-error == types do not exist
  const layoutConfig = useLayoutConfig({ ...props, size });

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <CTX.Provider value={{ props, common: commonVariables }}>
        <ScrollViewGesture
          key={mode}
          size={size}
          translation={handlerOffset}
          style={[
            styles.container,
            {
              width: width || '100%',
              height: height || '100%',
            },
            style,
            vertical ? styles.itemsVertical : styles.itemsHorizontal,
          ]}
          testID={testID}
          onScrollStart={scrollViewGestureOnScrollStart}
          onScrollEnd={scrollViewGestureOnScrollEnd}
          onTouchBegin={scrollViewGestureOnTouchBegin}
          onTouchEnd={scrollViewGestureOnTouchEnd}
        >
          <ItemRenderer
            data={data}
            dataLength={dataLength}
            rawDataLength={rawDataLength}
            loop={loop}
            size={size}
            windowSize={windowSize}
            autoFillData={autoFillData}
            offsetX={offsetX}
            handlerOffset={handlerOffset}
            layoutConfig={layoutConfig}
            renderItem={renderItem}
            customAnimation={customAnimation}
          />
        </ScrollViewGesture>
      </CTX.Provider>
    </GestureHandlerRootView>
  );
});

export default Carousel as <T>(props: PropsWithChildren<TCarouselProps<T>>) => ReactElement;
const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
  itemsHorizontal: {
    flexDirection: 'row',
  },
  itemsVertical: {
    flexDirection: 'column',
  },
});
