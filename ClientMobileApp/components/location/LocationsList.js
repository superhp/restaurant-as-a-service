import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    FlatList
} from 'react-native';
import LocationListItem from './LocationListItem';

export default class LocationsList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <FlatList
                data={this.props.locations}
                keyExtractor={(item, index) => 'location_item_' + item.id}
                renderItem={({item}) => 
                    <LocationListItem onLocationSelected={this.props.onLocationSelected} location={item} />
                } 
            />
        );
    }
}

const styles = StyleSheet.create({
    categoryContainer: {
        backgroundColor: "#eaeaea",
        padding: 10
    },
    categoryText: {
        fontSize: 18,
        fontStyle: 'italic',
        color: "darkgrey"
    }
});