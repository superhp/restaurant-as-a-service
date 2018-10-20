import React from 'react';
import {
    View,
    Button,
    AsyncStorage,
    StyleSheet,
    Text,
    CheckBox,
    TouchableHighlight
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default class SignUpScreen extends React.Component {

    state = {
        gdprChecked: false,
    }

    static navigationOptions = {
        header: null
    }

    _signInAsync = async () => {
        await AsyncStorage.setItem('userToken', 'abc');
        this.props.navigation.navigate('App');
    };

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Sign Up</Text>
                <View style={{ flexDirection: 'row'}}>
                    <CheckBox value={this.state.gdprChecked}
                        onValueChange={() => this.setState({gdprChecked: !this.state.gdprChecked})}/>
                    <Text style={styles.checkBoxText}>I agree to the Terms of Services and Privacy Policy regarding the consent for the use of my personal data.</Text>
                </View>
                <Icon.Button backgroundColor="#3b5998" name="logo-facebook" onPress={this._signInAsync}>
                    <Text style={styles.fbLoginText}>Login with Facebook</Text>
                </Icon.Button>
               <Icon.Button name="mail" backgroundColor="#dddddd" onPress={this._signInAsync}>
                    <Text style={styles.fbLoginText}>Sign in using email</Text>
               </Icon.Button>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 23,
        padding: 10,
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 50,
        marginBottom: 30
    },
    checkBoxText: {flex: 1, flexWrap: 'wrap', marginLeft: 5, textAlign: 'justify'},
    fbLoginText: {

    }
});