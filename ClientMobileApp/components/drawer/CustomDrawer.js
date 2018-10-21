import React from 'react';
import {
    StyleSheet,
    SafeAreaView,
    ScrollView,
    View,
    Image,
    TouchableOpacity,
    Text,
    Button,
    AsyncStorage
} from 'react-native';
import { DrawerItems } from 'react-navigation';

export default class CustomDrawer extends React.Component {

    state = {
        userFullName: null,
        userImgUrl: null
    }

    constructor(props) {
        super(props);
    }

    _signOutAsync = async () => {
        await AsyncStorage.clear();
        this.props.navigation.navigate('Auth');
    };

    async componentDidMount() {
        const userFullName = await AsyncStorage.getItem('userFullName');
        const userImgUrl = await AsyncStorage.getItem('userImgUrl');
        this.setState({userFullName: userFullName, userImgUrl: userImgUrl});
    }
    
    render() {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.drawerHeader}>
                    <Image style={styles.userAvatar} source={{ uri: this.state.userImgUrl }} />
                    <View style={styles.drawerHeaderText}>
                        <Text style={styles.userName}>{this.state.userFullName}</Text>
                        <TouchableOpacity><Text style={styles.profileLink}>View profile</Text></TouchableOpacity>
                    </View>
                    
                </View>
                <ScrollView>
                    <DrawerItems {...this.props} />
                </ScrollView>
                <Button title="Sign out" onPress={this._signOutAsync}></Button>
            </SafeAreaView>
        );
    }

};

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