import { useCallback, useEffect, useRef } from 'react';

import type { ICarouselController } from './useCarouselController';

export function useAutoPlay(opts: {
  autoPlay?: boolean;
  autoPlayInterval?: number;
  autoPlayReverse?: boolean;
  carouselController: ICarouselController;
}) {
  const { autoPlay = false, autoPlayReverse = false, autoPlayInterval, carouselController } = opts;

  const { prev, next } = carouselController;
  const timer = useRef<ReturnType<typeof setTimeout>>();
  const stopped = useRef<boolean>(!autoPlay);

  const play = useCallback(() => {
    if (stopped.current) return;

    timer.current && clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      autoPlayReverse ? prev({ onFinished: play }) : next({ onFinished: play });
    }, autoPlayInterval);
  }, [autoPlayReverse, autoPlayInterval, prev, next]);

  const pause = useCallback(() => {
    if (!autoPlay) return;

    timer.current && clearTimeout(timer.current);
    stopped.current = true;
  }, [autoPlay]);

  const start = useCallback(() => {
    if (!autoPlay) return;

    stopped.current = false;
    play();
  }, [play, autoPlay]);

  useEffect(() => {
    if (autoPlay) start();
    else pause();

    return pause;
  }, [pause, start, autoPlay]);

  return {
    pause,
    start,
  };
}
