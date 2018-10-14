import React, { Component } from 'react';
import { Container, Header, Left, Right, Button, Body, Title, Text, Content } from 'native-base';
import Carousel from 'react-native-carousel';
import Expo from "expo";
import { StatusBar, StyleSheet, View } from 'react-native';

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
                <Content>
                    <Carousel>
                        <View>
                            <Text>Page 1</Text>
                        </View>
                        <View>
                            <Text>Page 2</Text>
                        </View>
                        <View>
                            <Text>Page 3</Text>
                        </View>
                    </Carousel>
                </Content>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#002b47'
    },
    headerText: {
        color: '#ff6600'
    }
});