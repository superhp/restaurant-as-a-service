import React, { Component } from 'react';
import { Container, Header, Left, Right, Button, Body, Title, Card, ListItem, Thumbnail } from 'native-base';
import Carousel from 'react-native-carousel';
import Expo from "expo";
import { StatusBar, StyleSheet, View, Image, Text, FlatList } from 'react-native';
import { api } from './Helper';

export default class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            restaurants: []
        };
    }
    async componentWillMount() {
        await Expo.Font.loadAsync({
            Roboto: require("native-base/Fonts/Roboto.ttf"),
            Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
            Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf"),
        });

        this.setState({ loading: false });
    }

    componentDidMount() {
        StatusBar.setHidden(true);
        fetch(api + 'restaurant')
            .then(res => res.json())
            .then(data => this.setState({ restaurants: data }));
    }

    render() {
        return this.state.loading ? null : (
            <Container style={styles.container}>
                <Header style={{ backgroundColor: 'white' }}>
                    <Body style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <Image style={{ width: '60%', height: '60%' }} source={require('../assets/waiterless-small.png')} />
                    </Body>
                </Header>

                <Carousel style={{ alignItems: 'center', boxShadow: '10px 10px 5px grey' }}
                    indicatorAtBottom={false}
                    indicatorOffset={230}
                    delay={10000}>
                    <View style={styles.page}>
                        <Image style={{ width: '90%', height: '60%' }} source={{ uri: 'https://i.ytimg.com/vi/0m73kD6Se1E/maxresdefault.jpg' }} />
                    </View>
                    <View style={styles.page}>
                        <Image style={{ width: '90%', height: '60%' }} source={{ uri: 'http://www.cili.lt/wp-content/uploads/2018/04/1-44545.jpg' }} />
                    </View>
                </Carousel>
                <FlatList data={this.state.restaurants} extraData={this.state} renderItem={({ item }) => (
                    <ListItem thumbnail>
                        <Left>
                            <Thumbnail square large source={{ uri: item.logo }} />
                        </Left>
                        <Body>
                            <Text style={{ fontSize: 24 }}>{item.name}</Text>
                        </Body>
                    </ListItem>
                )} keyExtractor={item => item.name + item.id}>
                </FlatList>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    page: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
    }
});