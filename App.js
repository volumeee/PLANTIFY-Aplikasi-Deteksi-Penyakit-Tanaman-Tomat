import {StyleSheet, View} from 'react-native';
import React, {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';
import StackNavigator from './src/navigation/StackNavigator';

const App = () => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      SplashScreen.hide();
    }, 2000);
    return () => clearTimeout(timeout); // Clear the timeout on unmount
  }, []);

  return (
    <View style={styles.container}>
      <StackNavigator />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
