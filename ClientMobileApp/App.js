import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import Home from './components/Home';
import Order from './components/Order';
import QRScanner from './components/QRScanner';
import OrderStatus from './components/OrderStatus';

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
    QRScanner: QRStack
})
