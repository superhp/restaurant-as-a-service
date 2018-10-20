import React from 'react';
import {
    View,
    StyleSheet,
    Text,
    FlatList
} from 'react-native';
import RestaurantCard from '../components/home/RestaurantCard';
import { api } from '../constants/Api';
import { Carousel } from 'react-native-ui-lib';

export default class HomeScreen extends React.Component {
    static navigationOptions = {
        header: null,
    };

    state = {
        restaurants: []
    }

    componentDidMount() {
        fetch(`${api}restaurant`)
            .then(res => res.json())
            .then(data => this.setState({ restaurants: data }))
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.sectionTitle}>Restaurants</Text>
                <Carousel containerStyle={{height: 250}}>
                    {
                        this.state.restaurants.map(restaurant => {
                            return <RestaurantCard key={restaurant.id} restaurant={restaurant} />
                        })
                    }
                </Carousel>                
            </View>
        );
    };
}

const styles = StyleSheet.create({
    container: {
        marginTop: 23,
        padding: 10,
        flex: 1,
        flexDirection: 'column',
        flexWrap: "wrap",
        backgroundColor: '#fff',
    },
    sectionTitle: {
        fontSize: 40,
        fontWeight: 'bold'
    }
});
