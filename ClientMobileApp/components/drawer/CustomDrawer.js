import React from 'react';
import {
    StyleSheet,
    SafeAreaView,
    ScrollView,
    View,
    Image,
    TouchableOpacity,
    Text
} from 'react-native';
import { DrawerItems } from 'react-navigation';

export default CustomDrawer = (props) => (
    <SafeAreaView style={styles.container}>
        <View style={styles.drawerHeader}>
            <Image style={styles.userAvatar} source={{uri: 'https://png2.kisspng.com/20180613/jiz/kisspng-technical-support-computer-icons-user-avatar-5b209ed4b1bed1.1136246815288644687281.png'}}/>
            <View style={styles.drawerHeaderText}>
                <Text style={styles.userName}>Petras Petraitis</Text>
                <TouchableOpacity><Text style={styles.profileLink}>View profile</Text></TouchableOpacity>
            </View>
        </View>
        <ScrollView>
            <DrawerItems {...props} />
        </ScrollView>
    </SafeAreaView>
);

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    drawerHeader: {
        paddingLeft: 10,
        marginTop: 23,
        height: 120,
        borderBottomWidth: 0.5,
        borderBottomColor: "#eaeaea",
        backgroundColor: "#eaeaea",
        flexDirection: 'row',
        alignItems: 'center'
    },
    userAvatar: {
        height: 100,
        width: 100,
        borderRadius: 50
    },
    drawerHeaderText: {
        marginLeft: 10
    },
    userName: {
        fontSize: 22,        
    },
    profileLink: {
        fontSize: 20,
        color: 'darkgrey'
    }
});