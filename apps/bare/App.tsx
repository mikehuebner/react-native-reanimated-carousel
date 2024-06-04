import React from 'react';
import { Dimensions, SafeAreaView, Text, View, useColorScheme } from 'react-native';

import { Colors } from 'react-native/Libraries/NewAppScreen';
import Carousel from '@mikehuebner/react-native-reanimated-carousel';

const { width: PAGE_WIDTH } = Dimensions.get('window');
const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={[backgroundStyle, { alignItems: 'center', justifyContent: 'center', flex: 1 }]}>
      <Carousel
        loop
        width={PAGE_WIDTH}
        height={PAGE_WIDTH / 2}
        data={[...new Array(6).keys()]}
        renderItem={({ index }) => (
          <View key={index} style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
            <Text>Hello</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default App;
