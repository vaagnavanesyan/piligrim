import React from 'react';
import {
  Dimensions,
  Image,
  Linking,
  Platform,
  StyleSheet,
  View,
} from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';
import Carousel from 'react-native-snap-carousel';

import { ParserService } from '../../../site-parser';

const { width, height } = Dimensions.get('window');

const renderSlide = ({ item }: any) => {
  return (
    <TouchableHighlight
      onPress={() => Linking.openURL(ParserService.getAbsoluteUrl(item.link))}>
      <View style={styles.slide}>
        <Image style={styles.slideContainer} source={{ uri: item.image }} />
      </View>
    </TouchableHighlight>
  );
};
export const Slider = ({ slider }: any) => {
  return (
    <Carousel
      sliderWidth={width}
      sliderHeight={width}
      itemWidth={width - 60}
      data={slider}
      renderItem={renderSlide}
      hasParallaxImages={true}
    />
  );
};

const styles = StyleSheet.create({
  slide: {
    width: width - 60,
    height: height / 4,
  },
  slideContainer: {
    flex: 1,
    marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
    backgroundColor: '#070215',
    borderRadius: 8,
  },
  slideImage: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'contain',
  },
});
