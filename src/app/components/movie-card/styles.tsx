import { Dimensions, StyleSheet } from 'react-native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
export const withTheme = (theme: any) =>
  StyleSheet.create({
    background: {
      backgroundColor: theme.background,
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
      color: theme.movieName,
      fontSize: 24,
    },
    movieDuration: {
      color: theme.movieDuration,
      fontSize: 20,
    },
    movieGenre: {
      color: theme.movieGenre,
      fontSize: 18,
    },
    movieDescription: {
      fontSize: 18,
      color: theme.movieDescription,
    },
  });
