import { StyleSheet } from 'react-native';

export const withTheme = (theme: any) =>
  StyleSheet.create({
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
      color: theme.movieName,
      fontSize: 18,
    },
    movieDuration: {
      color: theme.movieDuration,
      flex: 1,
    },
    movieGenre: {
      color: theme.movieGenre,
    },
  });
