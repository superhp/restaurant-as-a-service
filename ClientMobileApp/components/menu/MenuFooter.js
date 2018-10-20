import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity
} from 'react-native';

export default class MenuFooter extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.hidden)
            return null;

        return (
            <View style={[styles.footerContainer, { backgroundColor: this.props.mainColor }]}>
                <Text style={[styles.footerText, { marginLeft: 10, color: this.props.secondaryColor }]}>Total:</Text>
                <View style={styles.totalsContainer}>
                    <Text style={[styles.footerText, { color: this.props.secondaryColor }]}>{this.props.total}</Text>
                    <TouchableOpacity style={styles.orderButton} onPress={() => {this.props.onOrder()}}>
                        <Text style={[styles.footerText, { color: this.props.secondaryColor }]}>Order</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    footerContainer: {
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
    },
    footerText: {
        fontSize: 22,
        fontWeight: 'bold'
    },
    totalsContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    orderButton: {
        paddingLeft: 10,
        paddingRight: 10,
        marginLeft: 10,
        borderLeftColor: 'black',
        borderLeftWidth: 1
    }
});