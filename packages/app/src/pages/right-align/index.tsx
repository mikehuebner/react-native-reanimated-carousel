import { useRef, useState } from 'react';
import { View } from 'react-native';

import Carousel from '@mikehuebner/react-native-reanimated-carousel';

import { SBItem } from '../../components/SBItem';
import SButton from '../../components/SButton';
import { ElementsText, windowDimensions } from '../../constants';

import type { ICarouselInstance } from '@mikehuebner/react-native-reanimated-carousel';

const PAGE_WIDTH = windowDimensions.width;

function Index() {
  const [data, setData] = useState([...new Array(6).keys()]);
  const [isFast, setIsFast] = useState(false);
  const [isAutoPlay, setIsAutoPlay] = useState(false);
  const [isPagingEnabled, setIsPagingEnabled] = useState(true);
  const ref = useRef<ICarouselInstance>(null);

  const baseOptions = {
    vertical: false,
    width: PAGE_WIDTH * 0.85,
    height: PAGE_WIDTH / 2,
  } as const;

  return (
    <View style={{ flex: 1 }}>
      <Carousel
        {...baseOptions}
        loop={false}
        ref={ref}
        style={{ width: '100%', transform: [{ rotateY: '-180deg' }] }}
        autoPlay={isAutoPlay}
        autoPlayInterval={isFast ? 100 : 2000}
        data={data}
        pagingEnabled={isPagingEnabled}
        onSnapToItem={(index) => console.log('current index:', index)}
        renderItem={({ index }) => (
          <View style={{ flex: 1, marginLeft: '2.5%' }}>
            <SBItem key={index} index={index} />
          </View>
        )}
      />
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
    </View>
  );
}

export default Index;
