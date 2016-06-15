import React from 'react';
import { PixelRatio } from 'react-native';
import Dimensions from 'Dimensions';

export default {
  ratio: PixelRatio.get(),
  pixel: 1 / PixelRatio.get(),
  size: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  }
}