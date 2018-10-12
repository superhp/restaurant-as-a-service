import {createBottomTabNavigator, createStackNavigator} from 'react-navigation';
import Home from './components/Home';
import Order from './components/Order';
import QRScanner from './components/QRScanner';

const QRStack = createStackNavigator({
    QRScanner: QRScanner,
    Order: Order,
});

export default createBottomTabNavigator({
    Home: Home,
    QRScanner: QRStack
})
