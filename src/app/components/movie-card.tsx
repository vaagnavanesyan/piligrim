import React, { useState, useEffect } from 'react';
import {
  Image,
  Linking,
  StyleSheet,
  Text,
  View,
  Dimensions,
  ActivityIndicator,
  Button,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import { ParserService } from '../../site-parser';
import { Movie } from 'src/site-parser/services/types';
const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export const MovieCard = (props: any) => {
  const [movie, setMovie] = useState({} as Movie);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const result = await ParserService.getMovie(props.movie.link);
      setMovie(result);
      setLoading(false);
    };
    fetchData();
  }, [props.movie.link]);

  const handleClick = async () => {
    const movie = await ParserService.getMovie(props.movie.link);
    Linking.openURL(movie.video);
  };

  return (
    <ScrollView style={styles.background}>
      {isLoading && (
        <ActivityIndicator
          animating
          size="large"
          color={styles.movieName.color}
        />
      )}
      {!isLoading && (
        <>
          <View style={styles.movieInfoContainer}>
            <Image
              source={{ uri: props.movie.poster }}
              resizeMode="contain"
              style={styles.moviePoster}
            />
            <View style={styles.movieTextContainer}>
              <Text style={styles.movieName}>{movie.name}</Text>
              <Text style={styles.movieGenre}>{movie.genre}</Text>
              <Text style={styles.movieDuration}>
                {movie.duration / 60} мин
              </Text>
            </View>
          </View>
          <Button title="Смотреть" onPress={handleClick} />
          <Text style={styles.movieDuration}>{movie.description}</Text>
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#070215',
  },
  movieInfoContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  moviePoster: {
    flex: 3,
    width: screenWidth,
    height: 0.5 * screenHeight,
  },
  movieTextContainer: {
    marginTop: 30,
    marginLeft: 10,
    flex: 4,
  },
  movieName: {
    color: '#9B528E',
    fontSize: 24,
  },
  movieDuration: {
    color: '#7992D2',
    fontSize: 20,
  },
  movieGenre: {
    color: '#C7BDDF',
    fontSize: 18,
  },
});
