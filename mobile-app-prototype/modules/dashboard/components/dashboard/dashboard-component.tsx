import React, { Component, Suspense } from 'react';
import Carousel, { ParallaxImage } from 'react-native-snap-carousel';
import { Dimensions, View, Text, StyleSheet, Platform, TouchableOpacity, ScrollView, Image } from 'react-native';

const { width, height } = Dimensions.get('window')

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

  renderSlide({ item, index }, parallaxProps) {
    return (
      <TouchableOpacity onPress={() => alert(item.link)}>
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

  render() {
    return (
      <ScrollView style={styles.background}>
        <Carousel
          sliderWidth={width}
          sliderHeight={width}
          itemWidth={width - 60}
          data={this.state.slider}
          renderItem={this.renderSlide}
          hasParallaxImages={true}
        />
        <View style={styles.gallery}>
          {
            this.state.films.map(film =>
              <TouchableOpacity
                onPress={() => alert(film.link)}
                key={film.name}
                style={styles.film}>
                <Image
                  style={styles.filmPoster}
                  source={{ uri: film.poster }}
                />
                <Text style={styles.filmName}>{film.name}</Text>
                <Text style={styles.filmDuration}>{film.duration / 60} мин</Text>
                <Text style={styles.filmGenre}>{film.genre}</Text>
              </TouchableOpacity>
            )
          }
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#070215',
  },
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
  },
  gallery: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    marginTop: 10
  },
  film: {},
  filmPoster: {
    width: width * .45,
    height: width * .45,
    marginTop: 10,
    marginLeft: 5,
    marginRight: 5
  },
  filmName: {
    color: '#9B528E',
    fontSize: 18, //fix issue with long strings
  },
  filmDuration: {
    color: '#7992D2',
    fontSize: 20
  },
  filmGenre: {
    color: '#C7BDDF',
    fontSize: 16,
  },
})