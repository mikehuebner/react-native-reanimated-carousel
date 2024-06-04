import { ReactElement, cloneElement, useEffect, useState } from 'react';
import { Text, View } from 'react-native';

import Animated, { Easing } from 'react-native-reanimated';

import Carousel from '@mikehuebner/react-native-reanimated-carousel';

import { windowDimensions } from '../../constants';

const PAGE_WIDTH = windowDimensions.width / 2;

function ReactionContainer(props: {
  text: string;
  children: (text: ReactElement, layout?: { width: number }) => ReactElement;
}) {
  const [width, setWidth] = useState<number>();
  const [layout, setLayout] = useState<{ width: number }>();

  useEffect(() => {
    if (typeof width === 'number') setLayout({ width });
  }, [width]);

  useEffect(() => {
    setLayout(undefined);
  }, [props.text]);

  const text = (
    <Animated.View
      style={[
        {
          flexWrap: 'wrap',
          width: layout?.width,
        },
      ]}
    >
      <Text
        onLayout={({ nativeEvent }) => {
          if (typeof layout === 'undefined') setWidth(nativeEvent.layout.width);
        }}
      >
        {props.text}
      </Text>
    </Animated.View>
  );

  return cloneElement(props.children(text, layout), {
    key: props.text,
  });
}

function Index() {
  return (
    <ReactionContainer text="一二三四五六七八九十">
      {(text, layout) => {
        return (
          <View
            style={{
              alignItems: 'center',
              flex: 1,
              marginTop: 72,
            }}
          >
            <Carousel
              width={layout?.width ?? PAGE_WIDTH}
              height={30}
              style={[
                {
                  width: 200,
                },
              ]}
              snapEnabled={false}
              pagingEnabled={false}
              loop
              autoPlay
              withAnimation={{
                type: 'timing',
                config: {
                  duration: 10000,
                  easing: Easing.linear,
                },
              }}
              autoPlayInterval={0}
              data={[...new Array(6).keys()]}
              renderItem={() => text}
              enabled={false}
            />
          </View>
        );
      }}
    </ReactionContainer>
  );
}

export default Index;
