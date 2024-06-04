import { useMemo } from 'react';

import { Layouts } from '../layouts';

import type { TInitializeCarouselProps } from './useInitProps';
import type { TAnimationStyle } from '../components/BaseLayout';

type TLayoutConfigOpts<T> = TInitializeCarouselProps<T> & { size: number };

export function useLayoutConfig<T>(opts: TLayoutConfigOpts<T>): TAnimationStyle {
  const { size, vertical } = opts as Required<TLayoutConfigOpts<T>>;

  return useMemo(() => {
    const baseConfig = { size, vertical };
    switch (opts.mode) {
      case 'parallax':
        return Layouts.parallax(baseConfig, opts.modeConfig);
      case 'horizontal-stack':
        return Layouts.horizontalStack(opts.modeConfig);
      case 'vertical-stack':
        return Layouts.verticalStack(opts.modeConfig);
      default:
        return Layouts.normal(baseConfig);
    }
  }, [opts.mode, opts.modeConfig, size, vertical]);
}
