import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity
} from 'react-native';
import { Popup } from 'react-native-map-link';

export default class LocationMap extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Popup
                isVisible={this.props.showMap}
                onCancelPressed={() => this.props.hideMap() }
                onAppPressed={() => this.props.hideMap() }
                onBackButtonPressed={() => this.props.hideMap() }
                options={{
                    latitude: this.props.selectedLocation.latitude,
                    longitude: this.props.selectedLocation.longitude,
                    title: this.props.selectedLocation.address,
                    dialogTitle: 'Choose an app for navigation',
                    cancelText: 'Back'
                }}
            />
        );
    }
}

const styles = StyleSheet.create({
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