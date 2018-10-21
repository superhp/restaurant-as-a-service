import React from 'react';
import {
    View,
    AsyncStorage,
    StyleSheet,
    Text,
    CheckBox,
    TouchableOpacity
} from 'react-native';
import CreateAccountButton from '../components/sign-up/CreateAccountButton';

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

    navigateToCreateAccount = () => {
        console.log('im here');
        this.props.navigation.navigate('CreateAccount');
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{ flex: 1, justifyContent: "center" }}>
                    <Text style={styles.title}>Sign Up</Text>
                </View>
                <View style={{ flex: 3, justifyContent: "center", alignItems: "stretch" }}>
                    <View style={{ flexDirection: 'row' }}>
                        <CheckBox value={this.state.gdprChecked}
                            onValueChange={() => this.setState({ gdprChecked: !this.state.gdprChecked })} />
                        <Text style={styles.checkBoxText}>I agree to the Terms of Services and Privacy Policy regarding the consent for the use of my personal data.</Text>
                    </View>
                    <CreateAccountButton navigateTo={this.navigateToCreateAccount} />
                </View>
                <View style={{flex: 1, flexDirection: "row", justifyContent: "center", alignItems: "flex-end" }}>
                    <Text style={styles.secondaryText}>Already a user? </Text>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('LogIn')}>
                        <Text style={[styles.secondaryText, styles.link]}>Log In</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        justifyContent: 'flex-end',
        padding: 20,
        marginTop: 23
    },
    title: {
        fontSize: 30,
        padding: 10,
        textAlign: 'center',
        justifyContent: 'center'
    },
    checkBoxText: { flex: 1, flexWrap: 'wrap', marginLeft: 5, textAlign: 'justify' },
    secondaryText: { fontSize: 22 },
    link: { color: '#4286f4' }
});