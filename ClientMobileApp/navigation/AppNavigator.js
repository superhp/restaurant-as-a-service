import React from 'react';
import { createSwitchNavigator, createStackNavigator } from 'react-navigation';
import SignUpScreen from '../screens/SignUpScreen';
import AuthLoadingScreen from '../screens/AuthLoadingScreen';
import CreateAccountScreen from '../screens/CreateAccountScreen';
import LogInScreen from '../screens/LogInScreen';

import MainTabNavigator from './MainTabNavigator';

const AuthStack = createStackNavigator({  
  SignUp: SignUpScreen,
  LogIn: LogInScreen,
  CreateAccount: CreateAccountScreen,
})

export default createSwitchNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  AuthLoading: AuthLoadingScreen,
  Auth: AuthStack,
  App: MainTabNavigator,
});