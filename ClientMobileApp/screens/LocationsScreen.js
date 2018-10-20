import React from 'react';
import {
    View,
    StyleSheet,
    ActivityIndicator,
    TouchableOpacity,
    Text
} from 'react-native';
import { api } from '../constants/Api';
import LocationMap from '../components/location/LocationMap';
import LocationsList from '../components/location/LocationsList';

export default class LocationsScreen extends React.Component {
    static navigationOptions = {
        title: 'Locations',
    };

    state = {
        isLoading: true,
        restaurantId: 0,
        locations: [],
        showMap: false,
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

    openMaps = (item) => {
         this.setState({ showMap: true, selectedLocation: item });
    }

    closeMapModal = () => {
        this.setState({ showMap: false });
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
                <LocationMap selectedLocation={this.state.selectedLocation} showMap={ this.state.showMap } hideMap={ this.closeMapModal } />
                <LocationsList locations={ this.state.locations } onLocationSelected={ this.openMaps }  />
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
    
});