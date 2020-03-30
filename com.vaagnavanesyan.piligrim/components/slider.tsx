import React from 'react';
import { Dimensions, Platform, StyleSheet, TouchableOpacity, View, Linking } from 'react-native';
import Carousel, { ParallaxImage } from 'react-native-snap-carousel';
import { ApiService } from '../services/api-service';

const { width, height } = Dimensions.get('window')

const renderSlide = ({ item }: any, parallaxProps: any) => {
    return (
        <TouchableOpacity onPress={() => Linking.openURL(ApiService.getAbsoluteUrl(item.link))}>
            <View style={styles.slide}>
                <ParallaxImage
                    source={{ uri: item.image }}
                    containerStyle={styles.slideContainer}
                    style={styles.slideImage}
                    parallaxFactor={0.75}
                    {...parallaxProps}
                />
            </View>
        </TouchableOpacity>
    );
}
export const Slider = ({ slider }: any) => {
    return <Carousel
        sliderWidth={width}
        sliderHeight={width}
        itemWidth={width - 60}
        data={slider}
        renderItem={renderSlide}
        hasParallaxImages={true}
    />
}


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
        resizeMode: "contain",
    }
})