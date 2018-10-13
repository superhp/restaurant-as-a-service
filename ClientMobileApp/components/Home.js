import React, { Component } from 'react';
import { Container, Header, Left, Right, Button, Body, Title, Icon } from 'native-base';
import Expo from "expo";
import { StatusBar } from 'react-native';

export default class Home extends Component {

    constructor(props) {
        super(props);
        this.state = { loading: true};
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
        return this.state.loading ? null :(
            <Container>
                <Header>
                    <Left>
                        <Button transparent>
                        <Icon name='arrow-back' />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Header</Title>
                    </Body>
                    <Right>
                        <Button transparent>
                        <Icon name='menu' />
                        </Button>
                    </Right>
                </Header>
            </Container>
        );
    }
}