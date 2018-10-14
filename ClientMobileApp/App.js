import React from 'react'
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Home from './components/Home';
import Order from './components/Order';
import QRScanner from './components/QRScanner';
import OrderStatus from './components/OrderStatus';
import Settings from './components/Settings';

const QRStack = createStackNavigator(
    {
        QRScanner: QRScanner,
        Order: Order,
        OrderStatus: OrderStatus
    },
    {
        navigationOptions: () => ({
            header: null
        })
    }
);

export default createBottomTabNavigator({
    Home: Home,
    QRScanner: QRStack,
    Settings: Settings
},
{
    navigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ focused, horizontal, tintColor }) => {
            const { routeName } = navigation.state;
            let iconName;
            if (routeName === 'Home') {
                iconName = `ios-home${focused ? '' : '-outline'}`;
            } else if (routeName === 'QRScanner') {
                iconName = `ios-qr-scanner${focused ? '' : '-outline'}`;
            } else if (routeName === 'Settings') {
                iconName = `ios-settings${focused ? '' : '-outline'}`;
            }

            // You can return any component that you like here! We usually use an
            // icon component from react-native-vector-icons
            return <Ionicons name={iconName} size={horizontal ? 20 : 25} color={tintColor} />;
        },
    }),
    tabBarOptions: {
        activeTintColor: '#ff6600',
        inactiveTintColor: '#7992c5',
        showLabel: false,
        style: {
            backgroundColor: '#041f30',
        },
    },
})
