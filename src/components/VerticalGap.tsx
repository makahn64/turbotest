import React from 'react';
import {View} from 'react-native';

type Props = {gapSize?: number};

export const VerticalGap = ({gapSize = 20}: Props) => (
  <View style={{marginVertical: gapSize / 2}} />
);
