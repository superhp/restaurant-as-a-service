import React from 'react';
import {
    StyleSheet,
    View,
    Text
} from 'react-native';

export default class MenuCategory extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.categoryContainer}>
                <Text style={styles.categoryText}>{this.props.name}</Text>
            </View>
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