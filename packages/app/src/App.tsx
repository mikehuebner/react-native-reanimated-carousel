import { PropsWithChildren, Suspense } from 'react';
import { View, useWindowDimensions } from 'react-native';

import {
  GestureHandlerRootView,
  enableExperimentalWebImplementation,
} from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import ExamplePan from './ExamplePan';
import { RootNavigator } from './navigation/root';
import { WebProvider } from './store/WebProvider';
import { isWeb } from './utils';

const WebContainer = ({ children }: PropsWithChildren) => {
  const { width } = useWindowDimensions();

  return (
    <SafeAreaProvider>
      <WebProvider>
        <View
          style={{
            height: '100%',
            width,
            alignSelf: 'center',
            margin: 'auto',
            flex: 1,
          }}
        >
          {children}
        </View>
      </WebProvider>
    </SafeAreaProvider>
  );
};

function App() {
  const app = (
    <Suspense fallback={null}>
      <View style={{ flex: 1 }}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          {/* <ExamplePan /> */}
          <RootNavigator />
        </GestureHandlerRootView>
      </View>
    </Suspense>
  );

  if (isWeb) return <WebContainer>{app}</WebContainer>;

  return app;
}

export default App;
