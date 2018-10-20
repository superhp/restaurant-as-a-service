import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity
} from 'react-native';

export default class LocationsListItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.itemContainer}>
                <TouchableOpacity onPress={() => this.props.onLocationSelected(this.props.location)}>
                    <View style={styles.textContainer}>
                        <Text style={styles.itemName}>{this.props.location.address}</Text>
                    </View>
                </TouchableOpacity>
            </View>
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