import React from 'react';
import { Container, Body, Text, Spinner, Header, List, ListItem, Content, Left, Thumbnail, Right, Button, Separator, FooterTab, View } from 'native-base';
import { api } from './Helper';
import { StyleSheet, FlatList } from 'react-native';
import OrderTotal from './OrderTotal';

export default class Order extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            restaurantId: 0,
            tableId: 0,
            count: 0,
            menu: [],
            order: [],
            categories: []
        };
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
            fetch(api + 'category')
                .then(res => res.json())
                .then(data => this.setState({ categories: data }))
            fetch(api + 'menu/' + this.state.restaurantId)
                .then(res => res.json())
                .then(data => this.setState({ menu: data }));
        });

        this.setState({ loading: false });
    }

    addItem(id, quantity) {
        let items = this.state.menu;
        if (items.find(i => i.menuItemId === id)) {
            let item = items.find(i => i.menuItemId === id);
            item.quantity += quantity;
            //items[items.indexOf(x => x.menuItemId === id)] = item;
        }
        this.setState({ menu: items })
        this.forceUpdate()
    }

    removeItem(id, quantity) {
        let items = this.state.menu;
        if (items.find(i => i.menuItemId === id)) {
            let item = items.find(i => i.menuItemId === id);
            if (item.quantity > 0) {
                item.quantity -= quantity;
            }
            //items[items.indexOf(x => x.menuItemId === id)] = item;
        }
        this.setState({ menu: items })
        this.forceUpdate()
    }

    render() {
        let total = Math.round(this.state.menu.reduce(function (prev, cur) {
            return prev + cur.price * cur.quantity;
        }, 0)* 100) / 100;

        console.log(total)

        let footerHidden = total === 0;

        if (this.state.loading || (typeof this.state.menu === 'undefined' && this.state.menu === 0) || this.state.categories === 0) {
            return (
                <Container>
                    <Spinner color='blue' />
                </Container>
            );
        }
        console.log(this.state.menu);
        return (
            <Container>
                <Header />
                <Content>
                    <FlatList data={this.state.menu} extraData={this.state} renderItem={({ item }) => (
                        <ListItem thumbnail>
                            <Left>
                                <Thumbnail square large source={{ uri: item.image }} />
                            </Left>
                            <Body>
                                <Text>{item.name}</Text>
                                <Text note numberOfLines={1}> </Text>
                                <Text note style={styles.price} numberOfLines={1}>{item.price}</Text>
                            </Body>
                            <Right>
                                <Button transparent onPress={() => this.removeItem(item.menuItemId, 1)}>
                                    <Text style={styles.selectionButtons}>-</Text>
                                </Button>
                            </Right>
                            <Right>
                                <Text style={styles.itemCount}>{item.quantity}</Text>
                            </Right>
                            <Right>
                                <Button transparent onPress={() => this.addItem(item.menuItemId, 1)}>
                                    <Text style={styles.selectionButtons}>+</Text>
                                </Button>
                            </Right>
                        </ListItem>
                    )} keyExtractor={item => item.name}>
                    </FlatList>
                </Content>
                <OrderTotal hide={footerHidden}>
                    <FooterTab>
                        <Left>
                            <Text style={styles.footerText}>Order Total</Text>
                        </Left>
                        <Right>
                            <Text style={styles.footerText}>{total}</Text>
                        </Right>
                        <Right style={styles.marginZero}>
                            <Button transparent><Text style={styles.total}>View</Text></Button>
                        </Right>
                    </FooterTab>
                </OrderTotal>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    price: {
        color: 'blue',
    },
    total: {
        color: 'white',
    },
    selectionButtons: {
        fontSize: 24
    },
    itemCount: {
        fontSize: 20
    },
    footerText: {
        color: 'white',
        marginLeft: 10
    },
    marginZero: {
        marginLeft: 0
    }
});