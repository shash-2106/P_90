import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import SignupLogin from './screens/SignupLoginScreen';
import AskScreen from './screens/AskScreen';
import ResponseScreen from './screens/ResponseScreen';
import {AppTabNavigator} from './Components/AppTabNavigator';
import {createSwitchNavigator,createAppContainer} from 'react-navigation';
export default function App() {
  return (
    <View style={styles.container}>
     <AppContainer/>
    </View>
  );
}
const SwitchNavigator  = createSwitchNavigator({screen:SignupLogin,screen:AppTabNavigator});
const AppContainer = createAppContainer(SwitchNavigator);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
