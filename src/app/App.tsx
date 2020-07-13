import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { SafeAreaView } from 'react-native';

import { MoviesFeed, MovieCard } from './components';
import { Themes, ThemeContext } from './themes';

const Stack = createStackNavigator();

const DashboardScreen = (props: any) => <MoviesFeed {...props} />;

const MovieScreen = ({ route }: any) => <MovieCard {...route.params} />;

const App = () => {
  return (
    <ThemeContext.Provider value={Themes.dark}>
      <SafeAreaView style={{ flex: 1 }}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Dashboard">
            <Stack.Screen
              name="Dashboard"
              component={DashboardScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Movie"
              component={MovieScreen}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </ThemeContext.Provider>
  );
};

export default App;
