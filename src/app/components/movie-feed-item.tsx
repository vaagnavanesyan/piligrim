import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export class MovieFeedItem extends React.Component<any> {
  shouldComponentUpdate() {
    return false;
  }

  async handleClick() {
    this.props.navigation.push('Movie', { movie: this.props.movie });
  }
  render() {
    return (
      <TouchableOpacity
        style={styles.movie}
        onPress={() => this.handleClick()}
        key={this.props.movie.name}>
        <Image
          width={128}
          height={128}
          source={{ uri: this.props.movie.poster }}
          style={styles.moviePoster}
        />
        <View style={styles.movieTextContainer}>
          <Text style={styles.movieName}>{this.props.movie.name}</Text>
          <Text style={styles.movieGenre}>{this.props.movie.genre}</Text>
        </View>
        <View>
          <Text style={styles.movieDuration}>
            {this.props.movie.duration / 60} мин
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}

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
