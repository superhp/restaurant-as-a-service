import React from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    Text
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { View } from 'react-native-ui-lib';

export default PaymentMethod = (props) => {
    const item = props.item;

    return (
        <TouchableOpacity style={styles.container}>
            <View style={{flex: 1, flexDirection: "row", alignItems: "center"}}>
                <Icon name={`cc-${item.type}`} size={30}/>
                <Text style={styles.text}>**** {item.shortNumber}</Text>
            </View>
            <View style={{flex: 1, flexDirection: "row", justifyContent: "flex-end"}}>
            {
                item.default ? <Text style={styles.defaultBadge}>Default</Text> : null
            }                
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        height: 60,
        flexDirection: "row",
        alignItems: 'center'
    },
    text: {
        marginLeft: 10,
        fontSize: 16
    },
    defaultBadge: {
        borderWidth: 0.7,
        borderColor: "darkgrey",
        color: "darkgrey",
        borderRadius: 5,
        paddingHorizontal: 3,
        paddingVertical: 1
    }
});