import { ImageSourcePropType } from 'react-native';

import img_0 from '../../assets/bg-images/0.jpg';
import img_1 from '../../assets/bg-images/1.jpg';
import img_2 from '../../assets/bg-images/2.jpg';
import img_3 from '../../assets/bg-images/3.jpg';
import img_4 from '../../assets/bg-images/4.jpg';
import img_5 from '../../assets/bg-images/5.jpg';
import img_6 from '../../assets/bg-images/6.jpg';
import img_7 from '../../assets/bg-images/7.jpg';
import img_8 from '../../assets/bg-images/8.jpg';
import img_9 from '../../assets/bg-images/9.jpg';

export function getImages(length: number = 10): ImageSourcePropType[] {
  const imageList = [
    img_0,
    img_1,
    img_2,
    img_3,
    img_4,
    img_5,
    img_6,
    img_7,
    img_8,
    img_9,
  ];
  if (length < 1) {
    return [];
  }

  if (length > imageList.length) {
    return [
      ...Array.from(
        { length: length / imageList.length },
        () => imageList,
      ).flat(),
      ...imageList.slice(0, length % imageList.length),
    ];
  }

  return imageList.slice(0, length - 1);
}
