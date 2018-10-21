import React from 'react';
import {
    View,
    StyleSheet,
    Text,
    FlatList,
    TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import DrawerHeader from '../components/drawer/DrawerHeader';
import PaymentMethod from '../components/payment-methods/PaymentMethod';

export default class PaymentMethodsScreen extends React.Component {
    constructor(props) {
        super(props);
    }

    static navigationOptions = {
        title: 'Payment methods',
        drawerIcon: ({ tintColor }) => (
            <Icon name="ios-card" size={30} color={tintColor} />
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <DrawerHeader title='Payment methods' navigation={this.props.navigation} />
                <View style={styles.content}>
                    {/* <Text>TEST</Text> */}
                    <FlatList data={[
                        { id: 1, type: "mastercard", shortNumber: "4200", default: true },
                        { id: 2, type: "visa", shortNumber: "4200", default: false }]}
                        renderItem={({ item }) =>
                            <PaymentMethod item={item}/>                                                    
                        }
                        keyExtractor={(item, index) => 'item_' + item.id} />
                </View>
                <TouchableOpacity style={styles.bottomButton}>
                    <Text style={styles.buttonText}>Add new card</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        marginTop: 23
    },
    content: {
        flex: 1
    },
    bottomButton: {
        height: 60,
        justifyContent: "center",
        borderTopColor: "#000",
        borderTopWidth: 0.5,
        alignItems: "center"
    },
    buttonText: {
        fontSize: 20,
        color: '#4286f4'
    }
});