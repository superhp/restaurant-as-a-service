import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import ScannerScreen from '../screens/ScannerScreen';
import MenuScreen from '../screens/MenuScreen';

const HomeStack = createStackNavigator({
    Home: HomeScreen,
});

HomeStack.navigationOptions = {
    tabBarLabel: 'Home',
    tabBarIcon: ({ focused }) => (
        <TabBarIcon
            focused={focused}
            name={
                Platform.OS === 'ios'
                    ? `ios-information-circle${focused ? '' : '-outline'}`
                    : 'md-information-circle'
            }
        />
    ),
    tabBarOnPress({ navigation, defaultHandler }) {
        navigation.popToTop();
        defaultHandler();
    }
};

const ScannerStack = createStackNavigator({
    Scanner: ScannerScreen,
    Menu: MenuScreen
})

ScannerStack.navigationOptions = {
    tabBarLabel: 'Scan',
    tabBarIcon: ({ focused }) => (
        <TabBarIcon
            focused={focused}
            name={
                Platform.OS === 'ios'
                    ? `ios-qr-scanner${focused ? '' : '-outline'}`
                    : 'md-qr-scanner'
            }
        />
    ),
};

export default createBottomTabNavigator({
    HomeStack,
    ScannerStack
},
    {
        initialRouteName: 'HomeStack'
    });
