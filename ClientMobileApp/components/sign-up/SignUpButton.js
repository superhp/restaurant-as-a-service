import React from 'react';
import {
    TouchableHighlight,
    View,
    Text,
    StyleSheet
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default class SignUpButton extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <TouchableHighlight style={[styles.btnClickContain, { backgroundColor: this.props.color} ]}
                underlayColor="rgba(0,0,0,0)" onPress={this.props.onClick}>
                <View style={[styles.btnContainer, { backgroundColor: this.props.color} ]}>
                    <Icon color="#FFFFFF" size={30} name={this.props.logo} />
                    <Text style={styles.btnText}>{this.props.text}</Text>
                </View>
            </TouchableHighlight>
        );
    }
}

const styles = StyleSheet.create({
    btnClickContain: {
      height: 40,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'stretch',
      alignSelf: 'stretch',
      borderRadius: 5,
      padding: 5,
      marginTop: 5,
      marginBottom: 5
    },
    btnContainer: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
      backgroundColor: '#009D6E'
    },
    btnText: {
      fontSize: 18,
      color: '#FAFAFA',
      marginLeft: 10
    }
});