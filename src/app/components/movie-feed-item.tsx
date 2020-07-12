import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export const MovieFeedItem = (props: any) => {
  const handleClick = async () => {
    props.navigation.push('Movie', { movie: props.movie });
  };

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

const styles = StyleSheet.create({
  movie: {
    display: 'flex',
    flexDirection: 'row',
    marginVertical: 10,
  },
  moviePoster: {
    flex: 1,
  },
  movieTextContainer: {
    marginLeft: 10,
    flex: 4,
  },
  movieName: {
    color: '#9B528E',
    fontSize: 18,
  },
  movieDuration: {
    color: '#7992D2',
    flex: 1,
  },
  movieGenre: {
    color: '#C7BDDF',
  },
});
