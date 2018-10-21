import React from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    StyleSheet
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default DrawerHeader = (props) => {
    return <View style={styles.container}>
        <TouchableOpacity style={{ alignItems: "flex-start" }} onPress={() => {props.navigation.goBack()}}>
            <Icon name="md-arrow-back" size={30} />
        </TouchableOpacity>
        <Text style={styles.title}>{props.title}</Text>
    </View>
}

const styles = StyleSheet.create({
    container: {
        height: 60,
        alignItems: "center",
        flexDirection: "row",
        padding: 10,
        borderBottomColor: "#000",
        borderBottomWidth: 0.5,
        shadowColor: "#000",
        shadowOffset: {
            width: 1,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
    },
    title: {
        marginLeft: 20,
        fontSize: 20,
        fontWeight: "bold"
    }
});