import React from 'react';
import {
    StyleSheet,
    View,
    Dimensions,
    Image,
    Text,
    TouchableOpacity
} from 'react-native';
import RestaurantTag from './RestaurantTag';

export default class RestaurantCard extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let tags = this.props.restaurant.tags.map(tag => {
            return (<RestaurantTag key={`key_${tag}`} text={tag} />);
        });

        return (
            <TouchableOpacity style={styles.card} activeOpacity={0.8} onPress={() => {
                    this.props.navigation.navigate('Locations',{
                        restaurantId: this.props.restaurant.id
                    })
                }}>
                <Image style={styles.cardImage} source={{ uri: this.props.restaurant.cover }} />
                <View style={styles.cardFooter}>
                    <Text style={styles.title}>{this.props.restaurant.name}</Text>
                    <View style={styles.tags}>
                        {tags}
                    </View>
                </View>
            </TouchableOpacity>

        );
    }
}

const styles = StyleSheet.create({
    card: {
        width: Dimensions.get('window').width - 30,
        height: Dimensions.get('window').width / 2 + 30,
        backgroundColor: '#fff',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
        margin: 5,
        borderRadius: 3
    },
    cardImage: {
        flex: 2,
        flexWrap: 'wrap',
        flexDirection: 'row',
        borderRadius: 3,
    },
    cardFooter: {
        padding: 10,
        paddingTop: 3,
        justifyContent: 'flex-start',
        backgroundColor: '#fff',
        height: 70,
        marginTop: -70,
        opacity: 0.8,
        borderBottomLeftRadius: 3,
        borderBottomRightRadius: 3
    },
    title: {
        fontSize: 26
    },
    tags: {
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: 3
    }
});