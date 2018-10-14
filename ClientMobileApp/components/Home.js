import React, { Component } from 'react';
import { Container, Header, Left, Right, Button, Body, Title, Card, CardItem, Content } from 'native-base';
import Carousel from 'react-native-carousel';
import Expo from "expo";
import { StatusBar, StyleSheet, View, Image, Text } from 'react-native';

export default class Home extends Component {

    constructor(props) {
        super(props);
        this.state = { loading: true };
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
    }

    render() {
        return this.state.loading ? null : (
            <Container style={styles.container}>
                <Header style={{ backgroundColor: 'white' }}>
                    <Body style={{ alignItems: 'center' }}>
                        <Image style={{ width: '50%', height: '50%' }} source={require('../assets/waiterless-small.png')} />
                    </Body>
                </Header>

                <Carousel style={{ alignItems: 'center', boxShadow: '10px 10px 5px grey' }}
                    indicatorAtBottom={false}
                    indicatorOffset={250}
                    delay={10000}>
                    <View style={styles.page}>
                        <Image style={{width: 375, height: '60%'}} source={{uri: 'https://i.ytimg.com/vi/0m73kD6Se1E/maxresdefault.jpg'}} />                        
                    </View>                                
                    <View style={styles.page}>
                        <Image style={{width: 375, height: '60%'}} source={{uri: 'http://www.cili.lt/wp-content/uploads/2018/04/1-44545.jpg'}} />
                    </View>
                </Carousel>
                <Content>
                </Content>
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
    },
    headerText: {
        color: '#ff6600'
    }
});