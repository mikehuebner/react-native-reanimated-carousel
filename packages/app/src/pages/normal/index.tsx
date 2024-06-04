import { useRef, useState } from 'react';
import { useWindowDimensions } from 'react-native';

import { ScrollView } from 'react-native-gesture-handler';
import { useSharedValue } from 'react-native-reanimated';
import type { ICarouselInstance } from '@mikehuebner/react-native-reanimated-carousel';
import Carousel from '@mikehuebner/react-native-reanimated-carousel';
import { SafeAreaView } from 'react-native-safe-area-context';

import { SBItem } from '../../components/SBItem';
import SButton from '../../components/SButton';
import { ElementsText } from '../../constants';

function Index() {
  const windowWidth = useWindowDimensions().width;
  const scrollOffsetValue = useSharedValue(0);

  const [data, setData] = useState([...new Array(4).keys()]);
  const [isVertical, setIsVertical] = useState(false);
  const [isFast, setIsFast] = useState(false);
  const [isAutoPlay, setIsAutoPlay] = useState(false);
  const [isPagingEnabled, setIsPagingEnabled] = useState(true);
  const ref = useRef<ICarouselInstance>(null);

  const baseOptions = isVertical
    ? ({
        vertical: true,
        width: windowWidth,
        height: windowWidth / 2,
      } as const)
    : ({
        vertical: false,
        width: windowWidth,
        height: windowWidth / 2,
      } as const);

  return (
    <SafeAreaView edges={['bottom']} style={{ flex: 1 }}>
      <Carousel
        {...baseOptions}
        loop
        enabled // Default is true, just for demo
        ref={ref}
        defaultScrollOffsetValue={scrollOffsetValue}
        testID={'xxx'}
        style={{ width: '100%' }}
        autoPlay={isAutoPlay}
        autoPlayInterval={isFast ? 100 : 2000}
        data={data}
        onScrollStart={() => {
          console.log('Started the swipe!');
        }}
        onScrollEnd={() => {
          console.log('Ended the swipe!');
        }}
        onConfigurePanGesture={(g) => g.enabled(false)}
        pagingEnabled={isPagingEnabled}
        onSnapToItem={(index) => console.log('current index:', index)}
        renderItem={({ index }) => <SBItem key={index} index={index} />}
      />
      <ScrollView style={{ flex: 1 }}>
        <SButton
          onPress={() => {
            setData([...new Array(5).keys()]);
          }}
        >
          {'Change the data length to 5'}
        </SButton>
        <SButton
          onPress={() => {
            setData([...new Array(3).keys()]);
          }}
        >
          {'Change the data length to 3'}
        </SButton>
        <SButton
          onPress={() => {
            setIsVertical(!isVertical);
          }}
        >
          {isVertical ? 'Set horizontal' : 'Set Vertical'}
        </SButton>
        <SButton
          onPress={() => {
            setIsFast(!isFast);
          }}
        >
          {isFast ? 'NORMAL' : 'FAST'}
        </SButton>
        <SButton
          onPress={() => {
            setIsPagingEnabled(!isPagingEnabled);
          }}
        >
          PagingEnabled:{isPagingEnabled.toString()}
        </SButton>
        <SButton
          onPress={() => {
            setIsAutoPlay(!isAutoPlay);
          }}
        >
          {ElementsText.AUTOPLAY}:{`${isAutoPlay}`}
        </SButton>
        <SButton
          onPress={() => {
            console.log(ref.current?.getCurrentIndex());
          }}
        >
          Log current index
        </SButton>
        <SButton
          onPress={() => {
            setData(data.length === 6 ? [...new Array(8).keys()] : [...new Array(6).keys()]);
          }}
        >
          Change data length to:{data.length === 6 ? 8 : 6}
        </SButton>
        <SButton
          onPress={() => {
            ref.current?.scrollTo({ count: -1, animated: true });
          }}
        >
          prev
        </SButton>
        <SButton
          onPress={() => {
            ref.current?.scrollTo({ count: 1, animated: true });
          }}
        >
          next
        </SButton>
      </ScrollView>
    </SafeAreaView>
  );
}

export default Index;
