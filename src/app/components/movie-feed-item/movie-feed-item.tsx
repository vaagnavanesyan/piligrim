import React, { useContext } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

import { ThemeContext } from '../../themes';
import { withTheme } from './styles';

export const MovieFeedItem = (props: any) => {
  const handleClick = async () => {
    props.navigation.push('Movie', { movie: props.movie });
  };
  const theme = useContext(ThemeContext);
  const styles = withTheme(theme);
  return (
    <TouchableOpacity
      style={styles.movie}
      onPress={() => handleClick()}
      key={props.movie.name}>
      <Image
        width={128}
        height={128}
        source={{ uri: props.movie.poster }}
        style={styles.moviePoster}
      />
      <View style={styles.movieTextContainer}>
        <Text style={styles.movieName}>{props.movie.name}</Text>
        <Text style={styles.movieGenre}>{props.movie.genre}</Text>
      </View>
      <View>
        <Text style={styles.movieDuration}>
          {props.movie.duration / 60} мин
        </Text>
      </View>
    </TouchableOpacity>
  );
};
