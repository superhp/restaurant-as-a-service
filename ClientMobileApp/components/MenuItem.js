import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity
} from 'react-native';

export default class MenuItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={[styles.addedIndicator, {
                    backgroundColor: this.props.item.quantity !== 0 ? this.props.mainColor : "#eaeaea",
                    width: this.props.item.quantity !== 0 ? 7 : 4,
                    marginRight: this.props.item.quantity !== 0 ? 10 : 13,
                }]}></View>
                <View style={styles.imageContainer}>
                    <Image style={styles.itemImage} source={{ uri: this.props.item.image }} />
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.itemName}>{this.props.item.name}</Text>
                    <Text style={styles.itemPrice}>{this.props.item.price}</Text>
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        onPress={() => { this.props.decreaseQuantity(this.props.item.menuItemId) }}
                        style={[styles.buttonStyle, { backgroundColor: this.props.mainColor }]}>
                        <Text style={[styles.buttonText, { color: this.props.secondaryColor }]}>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.counterText}>{this.props.item.quantity}</Text>
                    <TouchableOpacity
                        onPress={() => { this.props.increaseQuantity(this.props.item.menuItemId) }}
                        style={[styles.buttonStyle, { backgroundColor: this.props.mainColor }]}>
                        <Text style={[styles.buttonText, { color: this.props.secondaryColor }]}>+</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        paddingRight: 10,
        paddingTop: 10,
        paddingBottom: 10,
        height: 90,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: 'lightgrey',
        borderBottomWidth: 0.5,
    },
    imageContainer: {
        height: 70,
        width: 70
    },
    itemImage: {
        flex: 1,
        flexWrap: 'wrap',
        flexDirection: 'row',
        borderRadius: 5
    },
    textContainer: {
        marginLeft: 10
    },
    itemName: {
        fontSize: 22,
        fontWeight: 'bold'
    },
    itemPrice: {
        fontSize: 18,
        fontStyle: 'italic',
    },
    buttonContainer: {
        flex: 1,
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    buttonStyle: {
        width: 35,
        height: 35,
        justifyContent: 'center',
        borderRadius: 10
    },
    counterText: {
        fontSize: 22,
        marginLeft: 5,
        marginRight: 5
    },
    buttonText: {
        textAlign: 'center',
        fontSize: 22
    },
    addedIndicator: {
        height: 80,
        borderBottomRightRadius: 3,
        borderTopRightRadius: 3,        
    }
});