import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator, createDrawerNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import ScannerScreen from '../screens/ScannerScreen';
import MenuScreen from '../screens/MenuScreen';
import LocationsScreen from '../screens/LocationsScreen';
import CustomDrawer from '../components/drawer/CustomDrawer';
import PaymentMethodsScreen from '../screens/PaymentMethodsScreen';

const HomeStack = createStackNavigator({
    Home: HomeScreen,
    Locations: LocationsScreen
});

HomeStack.navigationOptions = {
    tabBarLabel: 'Home',
    tabBarIcon: ({ focused }) => (
        <TabBarIcon
            focused={focused}
            name={
                Platform.OS === 'ios'
                    ? `ios-home${focused ? '' : '-outline'}`
                    : 'md-home'
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
    Menu: MenuScreen,
    Locations: LocationsScreen
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

const tabNavigator = createBottomTabNavigator({
    HomeStack,
    ScannerStack
},
    {
        initialRouteName: 'HomeStack'
    });

const PaymentMethodsStack = createStackNavigator({
    PaymentMethodsList: PaymentMethodsScreen,
})


export default createDrawerNavigator({
    Home: {
        screen: tabNavigator,
        navigationOptions: {
            drawerLabel: () => null
        }
    },
    PaymentMethods: {
        screen: PaymentMethodsStack,
        navigationOptions: {
            drawerLabel: 'Payment methods',
            drawerIcon: ({ tintColor }) => (
                <Icon name="ios-card" size={30} color={tintColor} />
            )
        }
    }
}, {
        contentComponent: CustomDrawer
    })