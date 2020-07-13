import { StyleSheet } from 'react-native';

export const withTheme = (theme: any) =>
  StyleSheet.create({
    background: {
      backgroundColor: theme.background,
    },
    movieName: {
      color: theme.movieName,
      fontSize: 18,
    },
  });
