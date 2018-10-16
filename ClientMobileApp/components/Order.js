import React, { Component } from 'react';
import { Container, Body, Text, Spinner, Header, Card, ListItem, Content, Left, Thumbnail, Right, Button, CardItem, FooterTab } from 'native-base';
import { api } from './Helper';
import { StatusBar, StyleSheet, FlatList } from 'react-native';
import OrderTotal from './OrderTotal';
import Modal from "react-native-modal";
import { OptimizedFlatList } from 'react-native-optimized-flatlist';

export default class Order extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            restaurantId: 0,
            tableId: 0,
            count: 0,
            menu: [],
            cart: [], 
            showOrder: false,
            showAddon: false, 
            categories: [],
            restaurant: {}
        };
    }

    componentDidMount() {
        StatusBar.setHidden(true);
    }

    async componentWillMount() {
        await Expo.Font.loadAsync({
            'Roboto': require('native-base/Fonts/Roboto.ttf'),
            'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
            'Ionicons': require('@expo/vector-icons/fonts/Ionicons.ttf'),
        });

        const { navigation } = this.props;
        const data = navigation.getParam('data', 'NO-ID');

        var splitData = data.split('-')
        this.setState({
            restaurantId: splitData[0],
            tableId: splitData[1]
        }, () => {
            fetch(api + 'restaurant/' + this.state.restaurantId)
                .then(res => res.json())
                .then(data => this.setState({ restaurant: data }))
            fetch(api + 'category')
                .then(res => res.json())
                .then(data => this.setState({ categories: data }))
            fetch(api + 'menu/' + this.state.restaurantId)
                .then(res => res.json())
                .then(data => {                    
                    let cart = {};
                    data.map(x => cart[x.menuItemId] = 0); 
                    this.setState({ menu: data, cart: cart }); 
                });
        });

        this.setState({ loading: false });
    }

    addItem = (id) => {
        this.state.menu.find(i => i.menuItemId === id).quantity++;
        this.setState({ menu: this.state.menu });
    }

    removeItem = (id) => {
        let item = this.state.menu.find(i => i.menuItemId === id);
        item.quantity = item.quantity > 1 ? --item.quantity : 0; 
        this.setState({ menu: this.state.menu });
    }

    triggerShowOrder = () => {
        let boo = !this.state.showOrder;
        this.setState({ showOrder: boo });
    }

    triggerShowAddons = () => {
        this.setState({
            showAddon: true,
            showOrder: false
        })
    }

    onNoPressed = () => {
        this.setState({
            showAddon: false
        });
        //this.triggerShowOrder();
    }

    onYesPressed = () => {
        this.addItem(15, 1);
        this.setState({
            showAddon: false
        });
        //this.triggerShowOrder();
    }


    onOrderNowPressed = () => {
        // {
        //     "restaurantId": 1,
        //     "customerId": 1,
        //     "paidPrice": 10.5,
        //     "table": "best-table",
        //     "items": [
        //         {
        //             "quantity": 1,
        //             "menuItemId": 2
        //         }
        //     ],
        //     "status": 0
        // }

        fetch(api + 'order', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                restaurantId: this.state.restaurantId,
                customerId: 1,
                table: this.state.tableId.toString(),
                items: this.state.menu.filter(m => m.quantity !== 0).map(m => Object({ quantity: m.quantity, menuItemId: m.menuItemId })),
                status: 0
            }),
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                this.setState({ showOrder: false })
                this.props.navigation.navigate('OrderStatus', {
                    orderId: data,
                    restaurantId: this.state.restaurantId
                });
            })
    }

    getCount = (menuItemId) => this.state.menu.find(i => i.menuItemId === menuItemId).quantity; 

    renderItem = ({item}) => (
        <MyListItem item={item} getCount={this.getCount} addItem={this.addItem} removeItem={this.removeItem} restaurant={this.state.restaurant} />
    )

    render() {
        let total = Math.round(this.state.menu.reduce(function (prev, cur) {
            return prev + cur.price * cur.quantity;
        }, 0) * 100) / 100;

        let footerHidden = total === 0;

        if (this.state.loading || (typeof this.state.menu === 'undefined' && this.state.menu === 0) || this.state.categories === 0) {
            return (
                <Container>
                    <Spinner color='blue' />
                </Container>
            );
        }

        let ketchup = this.state.menu.find(m => m.menuItemId == 15);
        if (ketchup === undefined) {
            ketchup = {
                image: "",
                name: "",
                price: 0.0
            }
        }

        return (
            <Container>
                <Header style={{backgroundColor: this.state.restaurant.mainColor}}>
                    <Body>
                        <Text style={{fontSize: 18, color: this.state.restaurant.secondaryColor}}>{this.state.restaurant.name}</Text>
                    </Body>
                    <Right>
                        <Thumbnail large source={{ uri: this.state.restaurant.logo }} />
                    </Right>
                    <Body>
                        <Text style={{fontSize: 18, color: this.state.restaurant.secondaryColor}}>Table #{this.state.tableId.toString()}</Text>
                    </Body>
                </Header>
                <Content>
                    <FlatList data={this.state.menu} renderItem={this.renderItem} keyExtractor={item => item.name + item.menuItemId} />
                </Content>
                <OrderTotal hide={footerHidden || this.state.showOrder} style={{backgroundColor: this.state.restaurant.mainColor}}>
                    <FooterTab style={{backgroundColor: this.state.restaurant.mainColor}}>
                        <Left>
                            <Text style={{fontSize: 18, color: this.state.restaurant.secondaryColor, marginLeft: 10}}>Order Total</Text>
                        </Left>
                        <Right>
                            <Text style={{fontSize: 18, color: this.state.restaurant.secondaryColor}}>{total}</Text>
                        </Right>
                        <Right style={styles.marginZero}>
                            <Button transparent onPress={this.triggerShowAddons}><Text style={{fontSize: 18, color: this.state.restaurant.secondaryColor}}>Proceed</Text></Button>
                        </Right>
                    </FooterTab>
                </OrderTotal>
                <Modal isVisible={this.state.showAddon} onModalHide={this.triggerShowOrder} onBackdropPress={() => this.setState({ showAddon: false })}>
                    <Card>
                        <CardItem header bordered>
                            <Left>
                                <Text style={{fontSize: 22, color: this.state.restaurant.secondaryColor}}>You may also like</Text>
                            </Left>
                        </CardItem>

                        <CardItem>
                            <Left>
                                <Thumbnail square large source={{ uri: ketchup.image }} />
                            </Left>
                            <Body>
                                <Text style={{fontSize: 18}}>{ketchup.name}</Text>
                                <Text note numberOfLines={1} style={{fontSize: 18}}> </Text>
                                <Text note style={{fontSize: 18}} numberOfLines={1}>{ketchup.price}</Text>
                            </Body>
                        </CardItem>
                 
                        <Button block style={{ backgroundColor: this.state.restaurant.mainColor, marginTop: 10, marginLeft: 5, marginRight: 5, marginBottom: 3 }}
                            onPress={this.onNoPressed}>
                            <Text style={{fontSize: 18, color: this.state.restaurant.secondaryColor}}>No, thanks</Text>
                        </Button>
                        <Button block style={{ backgroundColor: this.state.restaurant.mainColor, marginTop: 10, marginLeft: 5, marginRight: 5, marginBottom: 3 }}
                            onPress={this.onYesPressed}>
                            <Text style={{fontSize: 18, color: this.state.restaurant.secondaryColor}}>Yes, please</Text>
                        </Button>
                    </Card>
                </Modal>
                <Modal isVisible={this.state.showOrder} onBackdropPress={() => this.setState({ showOrder: false })}>
                    <Card>
                        <CardItem header bordered>
                            <Left>
                                <Text style={{fontSize: 18, color: this.state.restaurant.secondaryColor}}>Order Total</Text>
                            </Left>
                            <Right>
                                <Text style={{fontSize: 18, color: this.state.restaurant.secondaryColor}}>{total}</Text>
                            </Right>
                        </CardItem>
                        <FlatList data={this.state.menu.filter(m => m.quantity !== 0)} extraData={this.state} renderItem={({ item }) => (
                            <CardItem>
                                <Left>
                                    <Text style={{fontSize: 18, color: this.state.restaurant.secondaryColor}}>{item.quantity}x {item.name}</Text>
                                </Left>
                                <Right>
                                    <Text style={{fontSize: 18, color: this.state.restaurant.secondaryColor}}>{item.price}</Text>
                                </Right>
                            </CardItem>
                        )} keyExtractor={item => item.name + '_totals' + item.menuItemId}>
                        </FlatList>
                        <Button block style={{ backgroundColor: this.state.restaurant.mainColor, marginTop: 10, marginLeft: 5, marginRight: 5, marginBottom: 3 }}
                            onPress={() => this.onOrderNowPressed()}>
                            <Text style={{fontSize: 18, color: this.state.restaurant.secondaryColor}}>Order Now!</Text>
                        </Button>
                    </Card>
                </Modal>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    total: {
        color: 'black',
        fontSize: 18
    },
    selectionButtons: {
        fontSize: 24
    },
    itemCount: {
        fontSize: 20
    },
    globalFontSize: {
        fontSize: 18
    },
    footerText: {
        color: 'black',
        marginLeft: 10,
        fontSize: 18
    },
    marginZero: {
        marginLeft: 0
    },
    headerText: {
        fontSize: 18,
        color: 'black'
    }
});

class MyListItem extends Component {
    render() {
        let item = this.props.item; 
        return (
            <ListItem thumbnail>
                <Left>
                    <Thumbnail square large source={{ uri: item.image }} />
                </Left>
                <Body>
                    <Text style={{fontSize: 18}}>{item.name}</Text>
                    <Text note numberOfLines={1} style={{fontSize: 18}}> </Text>
                    <Text note style={{fontSize: 18}} numberOfLines={1}>{item.price}</Text>
                </Body>
                <Right>
                    <Button  style={{backgroundColor: this.props.restaurant.mainColor}} onPress={() => {this.props.removeItem(item.menuItemId); this.forceUpdate()}}>
                        <Text style={{ color: this.props.restaurant.secondaryColor, fontSize: 24 }}>-</Text>
                    </Button>
                </Right>
                <Right>
                    <Text style={{fontSize: 18}}>{this.props.getCount(item.menuItemId)}</Text>
                </Right>
                <Right>
                    <Button  style={{backgroundColor: this.props.restaurant.mainColor}} onPress={() => {this.props.addItem(item.menuItemId); this.forceUpdate()}}>
                        <Text style={{ color: this.props.restaurant.secondaryColor, fontSize: 24 }}>+</Text>
                    </Button>
                </Right>
            </ListItem>
        )
    }
}