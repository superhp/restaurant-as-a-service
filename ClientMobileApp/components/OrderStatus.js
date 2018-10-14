import React from 'react';
import { Footer, Container, Content, Text, H3, Button } from 'native-base';
import { StyleSheet, Image } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { api } from './Helper';

export default class OrderTotal extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            intervalId: 0,
            orderId: 0,
            status: 0,
            restaurantId: 0,
        }
    }

    componentDidMount() {
        const { navigation } = this.props;
        let orderID = navigation.getParam('orderId', 'NO-ID');
        let restaurantId = navigation.getParam('restaurantId', 'NO-ID');

        console.log(orderID + ' ' + restaurantId);

        this._interval = setInterval(this.continuousFetch, 3000);
        this.setState({ orderId: orderID, restaurantId: restaurantId});
    }
    componentWillUnmount() {
        clearInterval(this._interval);
    }

    continuousFetch = () => {
        console.log('fetch')
        fetch(api + 'order/' + this.state.orderId)
            .then(res => res.json())
            .then(data => { this.setState({ status: data.status }); console.log('fetch done') })
            .catch()
    }

    handleDone = () => {
        clearInterval(this.state.intervalId);
        this.setState({
            intervalId: 0,
            orderId: 0,
            status: 0,
            restaurantId: 0
        })
        // this.props.navigation.navigate('QRScanner');
        // this.props.navigation.navigate('Home');
        console.log('nope')
    }

    render() {
        return (
            <Container>
                <Content contentContainerStyle={{ justifyContent: 'center', flex: 1, alignItems: 'center' }}>
                    <Image source={require('../assets/tumblr_nmygzzqVs11qbmm1co1_250.gif')} />
                    <Text style={styles.secondaryText}>Your order is now...</Text>
                    {
                        this.state.status === 0
                            ? <Text style={styles.primaryText}>Pending</Text>
                            : this.state.status === 1
                                ? <Text style={styles.primaryText}>In progress</Text>
                                : <Text style={styles.primaryText}>Complete</Text>
                    }
                    {/* {
                        this.state.status === 2 ? <Button block onPress={() => this.handleDone()}><Text>OK</Text></Button> : null
                    } */}
                </Content>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    primaryText: {
        textAlign: 'center',
        fontSize: 40
    },
    secondaryText: {
        textAlign: 'center',
        fontSize: 25
    }
});