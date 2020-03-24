/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */
import { MoviesFeed } from './components/movies-feed';
import React from 'react';
import { SafeAreaView, ScrollView, StatusBar, View } from 'react-native';

const App = () => {
  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <MoviesFeed />
      </SafeAreaView>
    </>
  );
};

export default App;
