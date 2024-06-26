import { useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

export const QRCode = ({ tintColor }: { tintColor?: string }) => {
  const [visible, setVisible] = useState(false);
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        setVisible(!visible);
      }}
    >
      <View>
        <Text style={{ color: tintColor }}>{'QR CODE'}</Text>
        {visible && (
          <View style={styles.qrCodeContainer}>
            <Image style={styles.qrCodeImage} source={{ uri: '../../assets/web-example-qrcode.png' }} />
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  qrCodeContainer: {
    position: 'absolute',
    bottom: -10,
    transform: [{ translateY: '100%' }],
    height: 200,
    width: 200,
    right: 0,
  },
  qrCodeImage: {
    flex: 1,
    borderRadius: 5,
    borderWidth: 3,
    borderColor: '#26292E',
  },
});
