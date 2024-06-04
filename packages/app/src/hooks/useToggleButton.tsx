import { useMemo, useState } from 'react';

import SButton from '../components/SButton';

export function useToggleButton(opts: { defaultValue: boolean; buttonTitle: string }) {
  const { buttonTitle, defaultValue = false } = opts;
  const [status, setStatus] = useState(defaultValue);

  const button = useMemo(() => {
    return (
      <SButton onPress={() => setStatus(!status)}>
        {buttonTitle}: {`${status}`}
      </SButton>
    );
  }, [status, buttonTitle]);

  return {
    status,
    button,
  };
}
