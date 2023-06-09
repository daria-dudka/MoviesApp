import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../screens/Home';
import Details from '../screens/Details';
import Search from '../screens/Search';
import NavBar from './NavBar';

const Stack = createNativeStackNavigator();

const MainNavigation = () => {
  return (
    <Stack.Navigator headerMode={'screen'}>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerTransparent: true,
          header: ({navigation}) => (
            <NavBar navigation={navigation} main={true} />
          ),
        }}
      />
      <Stack.Screen
        name="Details"
        component={Details}
        options={{
          headerTransparent: true,
          header: ({navigation}) => <NavBar navigation={navigation} />,
        }}
      />
      <Stack.Screen
        name="Search"
        component={Search}
        options={{
          headerTransparent: true,
          header: ({navigation}) => <NavBar navigation={navigation} />,
        }}
      />
    </Stack.Navigator>
  );
};

export default MainNavigation;
