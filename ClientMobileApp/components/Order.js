import React from 'react';
import { Container, Body, Text, Spinner, Header, List, ListItem, Content, Left, Thumbnail, Right, Button, Separator, FooterTab, View } from 'native-base';
import { api } from './Helper';
import { StyleSheet } from 'react-native';
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

        this.addItem = this.addItem.bind(this);
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

    addItem(id, name, quantity) {
        const items = this.state.order;
        if(items.indexOf(x => x.id == id) > -1) {
            var item = items.find(i => i.id == id);
            item.quantity += quantity;
            items[items.indexOf(x => x.id == id)] = item;
        }
        else {
            items.push({id: id, name: name, quantity: quantity});
        }        
        this.setState({order: items})
    }

    render() {
        const footerVisible = this.state.order !== 0;
        const items = this.state.categories.map(c => this.state.menu.filter(i => i.categoryId === c.id));
        console.log(items)

        if (this.state.loading || (typeof this.state.menu == 'undefined' && this.state.menu == 0) || this.state.categories == 0) {
            return (
                <Container>
                    <Spinner color='blue' />
                </Container>
            );
        }

        return (
            <Container>
                <Header />
                <Content>
                    {this.state.categories.map(c => {
                        const items = this.state.menu.filter(i => i.categoryId === c.id);
                        items.unshift({ name: c.name, header: true });
                        return <List key={c.id} dataArray={items}
                            renderRow={(item) => {
                                if(item.header)
                                    return(
                                        <ListItem itemHeader first>
                                            <Text>{item.name}</Text>
                                        </ListItem>
                                    );
                                
                                return <ListItem thumbnail>
                                    <Left>
                                        <Thumbnail square large source={{ uri: item.image }} />
                                    </Left>
                                    <Body>
                                        <Text>{item.name}</Text>
                                        <Text note numberOfLines={1}> </Text>
                                        <Text note style={styles.price} numberOfLines={1}>{item.price}</Text>
                                    </Body>
                                    <Right>
                                        <Button transparent onPress={this.function_call}>
                                            <Text style={styles.selectionButtons}>-</Text>
                                        </Button>
                                    </Right>
                                    <Right>
                                        <Text style={styles.itemCount}>{getItemQuantity(item.menuItemId)}</Text>
                                    </Right>
                                    <Right>
                                        <Button transparent onPress={this.addItem(item.menuItemId, item.name, 1)}>
                                            <Text style={styles.selectionButtons}>+</Text>
                                        </Button>
                                    </Right>
                                </ListItem>
                            }}>                            
                        </List>
                    })}
                </Content>
                <OrderTotal hide={footerVisible}>
                    <FooterTab>
                        <Left>
                            <Text style={styles.footerText}>Order Total</Text>
                        </Left>
                        <Right>
                            <Text style={styles.footerText}>3.99</Text>
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
    selectionButtons: {
        fontSize: 24
    },
    itemCount: {
        fontSize: 20
    },
    footerText: {
        color: 'white',
        marginLeft: 10,
        marginRight: 10
    }
});