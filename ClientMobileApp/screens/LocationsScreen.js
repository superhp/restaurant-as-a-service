import React from 'react';
import {
    View,
    StyleSheet,
    ActivityIndicator,
    TouchableOpacity,
    FlatList,
    Text
} from 'react-native';
import { api } from '../constants/Api';
import { Popup } from 'react-native-map-link';

export default class LocationsScreen extends React.Component {
    static navigationOptions = {
        title: 'Locations',
    };

    state = {
        isLoading: true,
        restaurantId: 0,
        locations: [],
        isVisible: false,
        selectedLocation: { address: "" }
    }

    componentDidMount() {
        const { navigation } = this.props;
        let restaurantId = navigation.getParam('restaurantId', 'NO-ID');

        fetch(api + 'location/' + restaurantId)
            .then(res => res.json())
            .then(data => this.setState({
                restaurantId: restaurantId,
                locations: data,
                isLoading: false
            }));
    }

    openMaps(item) {
        console.log(item);

        this.setState({ isVisible: true, selectedLocation: item });
    }

    render() {
        if (this.state.isLoading) {
            return (
                <View style={styles.loadingBar}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            );
        }

        return (
            <View>
                <Popup
                    isVisible={this.state.isVisible}
                    onCancelPressed={() => this.setState({ isVisible: false })}
                    onAppPressed={() => this.setState({ isVisible: false })}
                    onBackButtonPressed={() => this.setState({ isVisible: false })}
                    options={{
                        latitude: "38.8976763",
                        longitude: "-77.0387185",
                        title: this.state.selectedLocation.address,
                        dialogTitle: 'This is the dialog Title',
                        dialogMessage: 'This is the amazing dialog Message',
                        cancelText: 'This is the cancel button text'
                    }}
                />
                <FlatList
                data={this.state.locations}
                keyExtractor={({item, index}) => item}
                renderItem={({item}) => 
                    <View key={item.locationId} style={styles.itemContainer}>
                        <TouchableOpacity key={item.locationId} onPress={() => this.openMaps(item)}>
                            <View style={styles.textContainer}>
                                <Text style={styles.itemName}>{item.address}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                } />
            </View>
        );
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'stretch',
    },
    loadingBar: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textContainer: {
        marginLeft: 10
    },
    itemName: {
        fontSize: 22,
        fontWeight: 'bold'
    },
    itemContainer: {
        paddingRight: 10,
        paddingTop: 10,
        paddingBottom: 10,
        height: 90,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: 'lightgrey',
        borderBottomWidth: 0.5,
    },
});