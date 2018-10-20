import React from 'react';
import {
    View,
    StyleSheet,
    Text,
    FlatList
} from 'react-native';
import RestaurantCard from '../components/home/RestaurantCard';
import { api } from '../constants/Api';
import { Carousel, TouchableOpacity } from 'react-native-ui-lib';

export default class HomeScreen extends React.Component {
    static navigationOptions = {
        header: null,
    };

    state = {
        restaurants: [],
        offers: []
    }

    componentDidMount() {
        fetch(`${api}restaurant`)
            .then(res => res.json())
            .then(data => this.setState({ restaurants: data }))
    }

    render() {
        return (
            <View style={styles.container}>
                <View>
                    <Text style={styles.sectionTitle}>Restaurants</Text>
                    <TouchableOpacity style={styles.link}><Text style={styles.linkText}>See all</Text></TouchableOpacity>
                </View>                
                <Carousel containerStyle={{height: 250}}>
                    {
                        this.state.restaurants.map(restaurant => {
                            return <RestaurantCard key={restaurant.id} restaurant={restaurant} navigation={this.props.navigation}/>
                        })
                    }
                </Carousel>    
                <Text style={styles.sectionTitle}>Offers</Text>
                {
                    this.state.offers.length > 0 
                    ? <FlatList data={this.state.offers}/>
                    : <View style={styles.emptyOffers}>
                        <Text>It is very empty in here</Text>
                    </View>
                }
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
        fontSize: 30,
        fontWeight: 'bold'
    },
    emptyOffers: {
        flex: 1,
        height: 100,
        backgroundColor: '#eaeaea',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    link: {
        alignItems: 'flex-end',
        marginTop: -21,
        marginRight: 5
    },
    linkText: {
        color: '#4286f4',
        fontSize: 16
    }
});
