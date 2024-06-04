import { useRef } from 'react';
import type { ImageSourcePropType, ImageURISource, StyleProp, ViewStyle } from 'react-native';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

import { Image } from 'expo-image';

interface Props {
  style?: StyleProp<ViewStyle>;
  index?: number;
  showIndex?: boolean;
  img?: ImageSourcePropType;
}

export const SBImageItem = ({ style, index: _index, showIndex = true, img }: Props) => {
  const index = _index ?? 0;
  const source = useRef<ImageURISource>({
    uri: `https://picsum.photos/id/${index}/400/300`,
  }).current;

  return (
    <View style={[styles.container, style]}>
      <ActivityIndicator size="small" />
      <Image cachePolicy={'memory-disk'} key={index} style={styles.image} source={img ?? source} />
      {showIndex && (
        <Text
          style={{
            position: 'absolute',
            color: '#6E6E6E',
            fontSize: 40,
            backgroundColor: '#EAEAEA',
            borderRadius: 5,
            overflow: 'hidden',
            paddingHorizontal: 10,
            paddingTop: 2,
          }}
        >
          {index}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderRadius: 8,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
});
