import {
  runOnJS,
  useAnimatedReaction,
  type SharedValue,
} from "react-native-reanimated";

import type { TCarouselProps } from "../types";
import { computedOffsetXValueWithAutoFillData } from "../utils/computed-with-auto-fill-data";

export function useOnProgressChange(
  opts: {
    size: number;
    autoFillData: boolean;
    loop: boolean;
    offsetX: SharedValue<number>;
    rawDataLength: number;
  } & Pick<TCarouselProps, "onProgressChange">,
) {
  const { autoFillData, loop, offsetX, size, rawDataLength, onProgressChange } =
    opts;

  useAnimatedReaction(
    () => offsetX.value,
    (_value) => {
      let value = computedOffsetXValueWithAutoFillData({
        value: _value,
        rawDataLength,
        size,
        autoFillData,
        loop,
      });

      if (!loop) {
        value = Math.max(-((rawDataLength - 1) * size), Math.min(value, 0));
      }

      let absoluteProgress = Math.abs(value / size);

      if (value > 0) absoluteProgress = rawDataLength - absoluteProgress;

      if (onProgressChange) {
        if (typeof onProgressChange === "function")
          runOnJS(onProgressChange)(value, absoluteProgress);
        else onProgressChange.value = absoluteProgress;
      }
    },
    [loop, autoFillData, rawDataLength, onProgressChange],
  );
}