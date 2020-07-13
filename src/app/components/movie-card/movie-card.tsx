import React, { useState, useEffect, useContext } from 'react';
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

import { ParserService } from '../../../site-parser';
import { Movie } from 'src/site-parser/services/types';
import { ThemeContext } from '../../themes';
import { withTheme } from './styles';

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
  const theme = useContext(ThemeContext);
  const styles = withTheme(theme);

  return (
    <ScrollView style={styles.background}>
      {isLoading && <ActivityIndicator animating size="large" />}
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
          <Text style={styles.movieDescription}>{movie.description}</Text>
        </>
      )}
    </ScrollView>
  );
};
