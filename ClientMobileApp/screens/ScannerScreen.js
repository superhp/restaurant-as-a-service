import React from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';
import { BarCodeScanner, Permissions } from 'expo';

export default class ScannerScreen extends React.Component {
    static navigationOptions = {
        header: null,
    };

    state = {
        hasCameraPermission: null,
    }

    async componentWillMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status === 'granted' });
    }

    handleBarCodeScanned = ({ type, data }) => {
        if(type === BarCodeScanner.Constants.BarCodeType.qr)
        {

        }
    }

    render() {
        const { hasCameraPermission } = this.state;

        if (hasCameraPermission === null) {
            return <View style={styles.container}><Text>Requesting for camera permission</Text></View>;
        }
        if (hasCameraPermission === false) {
            return <View style={styles.container}><Text>No access to camera</Text></View>;
        }
        return (
            <View style={styles.container}>
                <BarCodeScanner
                    onBarCodeScanned={this.handleBarCodeScanned}
                    style={StyleSheet.absoluteFill}
                />
            </View>
        );
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center'
    },
});
