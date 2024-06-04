import type { FC } from 'react';

import Animated, {
  useAnimatedStyle,
  useDerivedValue,
} from 'react-native-reanimated';

import { cleanup, render } from '@testing-library/react-native';

describe('useSharedValue', () => {
  afterEach(cleanup);

  it('retains value on rerender', () => {
    const initialValue = 0;
    const updatedValue = 1;

    interface Props {
      key: string;
      value: number;
    }

    const TestComponent: FC<Props> = (props) => {
      const opacity = useDerivedValue(() => props.value, [props.value]);
      const animatedStyle = useAnimatedStyle(
        () => ({
          opacity: opacity.value,
        }),
        [opacity],
      );

      return <Animated.View style={animatedStyle} />;
    };

    // When rendering with initial value
    const { rerender, root } = render(
      <TestComponent key="box" value={initialValue} />,
    );

    expect(typeof root !== 'string' ? root.props.style.opacity : false).toBe(
      initialValue,
    );

    // When rendering with updated value
    rerender(<TestComponent key="box" value={updatedValue} />);

    expect(typeof root !== 'string' ? root.props.style.opacity : false).toBe(
      initialValue,
    );
  });
});
