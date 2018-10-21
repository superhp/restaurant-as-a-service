import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TextInput,
    Dimensions
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default class CreateAccountScreen extends React.Component {
    static navigationOptions = {
        header: null
    }

    state = {
        passwordVisible: false
    }

    togglePasswordVisible = () => {
        this.setState({ passwordVisible: !this.state.passwordVisible })
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{ flex: 1, justifyContent: "center" }}>
                    <Text style={styles.title}>Create account</Text>
                </View>
                <View style={{ flex: 3, justifyContent: "center", alignItems: "stretch" }}>
                    <TextInput style={styles.input} placeholder="Email" keyboardType="email-address" />
                    <TextInput style={styles.input} placeholder="Full name" />
                    <View style={{ flexDirection: "row", alignItems: "center", marginTop: 30 }}>
                        <TextInput style={[styles.input, { width: Dimensions.get('window').width - 40 }]} placeholder="Password" secureTextEntry={!this.state.passwordVisible}/>
                        <TouchableOpacity style={{ justifyContent: 'flex-end', marginLeft: -30 }} onPress={() => this.togglePasswordVisible()}>
                            {
                                this.state.passwordVisible
                                    ? <Icon name='ios-eye-off' color="darkgrey" size={30} />
                                    : <Icon name='ios-eye' color="darkgrey" size={30} />
                            }
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: "row", alignItems: "center"}}>
                        <TextInput style={[styles.input, { width: Dimensions.get('window').width - 40 }]} placeholder="Repeat password" secureTextEntry={!this.state.passwordVisible}/>
                        <TouchableOpacity style={{ justifyContent: 'flex-end', marginLeft: -30 }} onPress={() => this.togglePasswordVisible()}>
                            {
                                this.state.passwordVisible
                                    ? <Icon name='ios-eye-off' color="darkgrey" size={30} />
                                    : <Icon name='ios-eye' color="darkgrey" size={30} />
                            }
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={styles.buttonContainer}>
                        <Text style={styles.buttonText}>Create account</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "flex-end",  flex: 1 }}>
                    <Text style={styles.secondaryText}>Already a user? </Text>
                    <TouchableOpacity>
                        <Text style={[styles.secondaryText, styles.link]}>Log in</Text>
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
        textAlign: 'center',
        marginBottom: 100
    },
    input: {
        paddingLeft: 5,
        paddingRight: 35,
        fontSize: 20,
        height: 60,
    },
    secondaryText: {
        fontSize: 22
    },
    link: {
        color: '#4286f4'
    },
    buttonContainer: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#4286f4',
        height: 50,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        borderRadius: 3,
        elevation: 4,
        marginTop: 10
    },
    buttonText: {
        color: 'white',
        fontSize: 20,
        fontWeight: "bold"
    }
});