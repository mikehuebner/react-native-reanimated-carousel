import type { PropsWithChildren } from 'react';

interface Props {
  shouldUpdate: boolean;
}

export const LazyView = (props: PropsWithChildren<Props>) => {
  const { shouldUpdate, children } = props;

  if (!shouldUpdate) return <></>;

  return <>{children}</>;
};
