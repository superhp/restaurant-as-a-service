import React from 'react';
import { Container, Button, Text, Spinner } from 'native-base';

export default class Order extends React.Component {
    constructor(props) {
        super(props);
        this.state = { loading: true };
    }

    async componentWillMount() {
        await Expo.Font.loadAsync({
            'Roboto': require('native-base/Fonts/Roboto.ttf'),
            'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
            'Ionicons': require('@expo/vector-icons/fonts/Ionicons.ttf'),
        });
        this.setState({ loading: false });
    }

    render() {
        const { navigation } = this.props;
        const data = navigation.getParam('data', 'NO-ID');
        
        if(this.state.loading){
            return (
                <Container>
                    <Spinner color='blue' />
                </Container>
              );
        }

        return (
            <Container>
                
            </Container>
        );
    }
}