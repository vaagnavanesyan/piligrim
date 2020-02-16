import React, { Component } from 'react';
import Carousel, { ParallaxImage } from 'react-native-snap-carousel';
import { Dimensions, View, Text, StyleSheet, Platform, TouchableOpacity, ScrollView, Image } from 'react-native';

const { width: screenWidth } = Dimensions.get('window')

export class Dashboard extends Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      films: [],
      slider: []
    }
  }

  componentDidMount() {
    fetch("https://piligrim-app.herokuapp.com/api/dashboard")
      .then(res => res.json())
      .then(result => {
        this.setState(result)
      })
  }

  _renderItem({ item, index }, parallaxProps) {
    return (
      <TouchableOpacity onPress={() => alert(item.link)}>
        <View style={styles.item}>
          <ParallaxImage
            source={{ uri: item.image }}
            containerStyle={styles.imageContainer}
            style={styles.image}
            parallaxFactor={0.4}
            {...parallaxProps}
          />
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <ScrollView>
        <Carousel
          sliderWidth={screenWidth}
          sliderHeight={screenWidth}
          itemWidth={screenWidth - 60}
          data={this.state.slider}
          renderItem={this._renderItem}
          hasParallaxImages={true}
        />
        <View>
          {
            this.state.films.map(film => <Image
              key={film.name}
              style={{ width: 100, height: 200 }}
              source={{ uri: film.poster }}
            />)
          }
        </View>
      </ScrollView>
    );
  }
}


const styles = StyleSheet.create({
  item: {
    width: screenWidth - 60,
    height: screenWidth - 60,
  },
  imageContainer: {
    flex: 1,
    marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
    backgroundColor: 'white',
    borderRadius: 8,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
  },
})