import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity
} from 'react-native';

export default class RestaurantTag extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <TouchableOpacity style={styles.tag}>
                <Text style={styles.tagText}>{this.props.text}</Text>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    tag: {
        backgroundColor: "#87b5ff",
        borderRadius: 15,
        padding: 3,
        paddingRight: 10,
        paddingLeft: 10,
        marginRight: 3        
    },
    tagText: {
        textAlign: 'center',
        textAlignVertical: 'center',
        color: '#002d77',
        fontWeight: 'bold'
    }
});