import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { SafeAreaView } from 'react-native';
import { AppearanceProvider, useColorScheme } from 'react-native-appearance';

import { MovieCard, MoviesFeed } from './components';
import { ThemeContext, Themes } from './themes';

const Stack = createStackNavigator();

const DashboardScreen = (props: any) => <MoviesFeed {...props} />;

const MovieScreen = ({ route }: any) => <MovieCard {...route.params} />;

const App = () => {
  const theme = useColorScheme() === 'dark' ? 'dark' : 'light';
  return (
    <AppearanceProvider>
      <ThemeContext.Provider value={Themes[theme]}>
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
    </AppearanceProvider>
  );
};

export default App;
