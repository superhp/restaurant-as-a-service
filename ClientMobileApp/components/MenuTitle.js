import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image
} from 'react-native';

export default class MenuTitle extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={[styles.titleCard, {backgroundColor: this.props.mainColor}]}>
                <View style={styles.companyLogo}>
                    <Image style={styles.companyLogoImage} source={{ uri: this.props.image }} />
                </View>
                <View style={styles.companyTitle}>
                    <Text style={styles.titleText}>{this.props.title}</Text>
                    <Text style={[styles.tableText,  {color: this.props.secondaryColor}]}>Table #{this.props.table}</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    titleCard: {
        padding: 10,
        height: 110,
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        
        elevation: 3,
    },
    companyLogo: {
        width: 90,
        height: 90,
    },
    companyLogoImage: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    companyTitle: {
        marginLeft: 10
    },
    titleText: {
        fontSize: 26,
        fontWeight: 'bold',
    },
    tableText: {
        fontSize: 18,
        fontStyle: 'italic',
    }
})