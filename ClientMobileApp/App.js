import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation';
import Home from './components/Home';

export default createBottomTabNavigator({
    Home: Home
})
