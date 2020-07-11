import React from 'react';
import { SafeAreaView } from 'react-native';
import { MoviesFeed } from './components/movies-feed';

const App = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <MoviesFeed />
    </SafeAreaView>
  );
};

export default App;
