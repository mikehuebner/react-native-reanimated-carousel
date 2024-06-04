import React, { useMemo } from 'react';
import { I18nManager, Platform, Text, View } from 'react-native';

import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as Updates from 'expo-updates';

import { QRCode } from '../components/QRCode';
import Home, { CustomAnimations, ExperimentPage, LayoutsPage } from '../Home';
import { useColor } from '../hooks/useColor';
import { useWebContext } from '../store/WebProvider';
import { isWeb } from '../utils';

const Restart = () => {
  if (Platform.OS === 'web') window.location.reload();
  else Updates.reloadAsync();
};

const Stack = createStackNavigator();

export const RootNavigator = () => {
  const headerShown = !useWebContext()?.page;
  const { isDark, colors } = useColor();
  const [isRTL, setIsRTL] = React.useState(I18nManager.isRTL);

  const theme = useMemo(() => {
    const { background, text } = colors;
    DefaultTheme.colors = {
      ...DefaultTheme.colors,
      card: background,
      border: background,
      background,
      text,
    };

    return { ...DefaultTheme };
  }, [isDark, colors]);

  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown,
          headerRight: ({ tintColor }) => (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              {isWeb && (
                <>
                  <QRCode tintColor={tintColor} />
                  <Text style={{ color: tintColor }}> | </Text>
                </>
              )}
              <TouchableWithoutFeedback
                onPress={() => {
                  I18nManager.forceRTL(!isRTL);
                  setIsRTL(!isRTL);
                  Restart();
                }}
              >
                <Text style={{ color: tintColor, marginRight: 12 }}>{isRTL ? 'LTR' : 'RTL'}</Text>
              </TouchableWithoutFeedback>
            </View>
          ),
        }}
      >
        <Stack.Screen name="Home" component={Home} />
        {[...LayoutsPage, ...CustomAnimations, ...ExperimentPage].map((item) => {
          return <Stack.Screen key={item.name} name={item.name} component={item.page} />;
        })}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
