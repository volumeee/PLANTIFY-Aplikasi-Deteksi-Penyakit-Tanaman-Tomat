import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import PlantScreen from '../view/PlantScreen';
import DiagnoseScreen from '../view/DiagnoseScreen';
import ProfileScreen from '../view/ProfileScreen';

const StackNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Plant"
          component={PlantScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Diagnose"
          component={DiagnoseScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;
