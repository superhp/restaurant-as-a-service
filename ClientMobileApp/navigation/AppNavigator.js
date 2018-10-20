import React from 'react';
import { createSwitchNavigator, createStackNavigator } from 'react-navigation';
import SignUpScreen from '../screens/SignUpScreen';
import AuthLoadingScreen from '../screens/AuthLoadingScreen';


import MainTabNavigator from './MainTabNavigator';

const AuthStack = createStackNavigator({
  SignUp: SignUpScreen
})

export default createSwitchNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  AuthLoading: AuthLoadingScreen,
  Auth: AuthStack,
  App: MainTabNavigator,
});