import React from 'react';
import {
    StyleSheet,
    Modal,
    View,
    TouchableOpacity,
    Text,
    TouchableWithoutFeedback,
    FlatList,
    Button
} from 'react-native';

export default class MenuModal extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={this.props.visible}
                onRequestClose={() => {
                    this.props.onModalClose()
                }}>
                <TouchableOpacity
                    style={styles.backdrop}
                    activeOpacity={1}
                    onPressOut={() => { this.props.onModalClose() }}>
                    <TouchableWithoutFeedback>
                        <View style={styles.modalContent}>
                            <View style={styles.modalHeader}>
                                <Text style={styles.modalHeaderText}>TEST</Text>
                            </View>
                            <FlatList
                                data={this.props.order}
                                keyExtractor={(item, index) => `${item.menuItemId}_totals`}
                                renderItem={({ item }) =>
                                    <View style={styles.contentItem}>
                                        <Text style={styles.itemText}>{item.quantity}x {item.name}</Text>
                                        <View style={styles.itemRight}>
                                            <Text style={styles.itemText}>{item.price * item.quantity}</Text>
                                        </View>
                                    </View>
                                } />
                            <View>
                                <View>
                                    <Button color={this.props.mainColor} onPress={() => { }} title='Order Now!' />
                                </View>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </TouchableOpacity>
            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    backdrop: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    modalContent: {
        width: '80%',
        backgroundColor: '#fff',
        borderRadius: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    modalHeader: {
        height: 50,
        borderBottomColor: 'lightgrey',
        borderBottomWidth: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    modalHeaderText: {
        fontSize: 22,
        fontWeight: 'bold'
    },
    contentItem: {
        padding: 5,
        flexDirection: "row",
    },
    itemRight: {
        flex: 2,
        flexDirection: "row",
        justifyContent: 'flex-end'
    },
    itemText: {
        fontSize: 18,
        fontStyle: 'italic'
    }
});