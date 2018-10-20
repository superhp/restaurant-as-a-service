import React from 'react';
import {
    View,
    StyleSheet,
    ActivityIndicator,
    SectionList    
} from 'react-native';
import MenuTitle from '../components/menu/MenuTitle';
import { api } from '../constants/Api';
import MenuCategory from '../components/menu/MenuCategory';
import MenuItem from '../components/menu/MenuItem';
import MenuFooter from '../components/menu/MenuFooter';
import MenuModal from '../components/menu/MenuModal';

export default class MenuScreen extends React.Component {
    state = {
        isLoading: true,
        restaurantId: 0,
        tableId: 0,
        name: "",
        image: "",
        mainColor: "",
        secondaryColor: "",
        menu: [],
        categories: [],
        modalVisible: false
    }

    static navigationOptions = {
        header: null
    };

    componentDidMount() {
        const { navigation } = this.props;
        let tableId = navigation.getParam('tableId', 'NO-ID');
        let restaurantId = navigation.getParam('restaurantId', 'NO-ID');

        fetch(api + 'restaurant/' + restaurantId)
            .then(res => res.json())
            .then(data => this.setState({
                restaurantId: restaurantId,
                tableId: tableId,
                name: data.name,
                image: data.logo,
                mainColor: data.mainColor,
                secondaryColor: data.secondaryColor
            }, () => {
                fetch(api + 'category')
                    .then(res => res.json())
                    .then(data => this.setState({ categories: data }, () => {
                        fetch(api + 'menu/' + 1)
                            .then(res => res.json())
                            .then(data => this.setState({ menu: data }, () => this.setState({ isLoading: false })));
                    }));
            }));
    }

    increaseQuantity = (menuItemId) => {
        let items = this.state.menu;
        if (items.find(i => i.menuItemId === menuItemId)) {
            let item = items.find(i => i.menuItemId === menuItemId);
            item.quantity += 1;
        }
        this.setState({ menu: items });
    }

    decreaseQuantity = (menuItemId) => {
        let items = this.state.menu;
        if (items.find(i => i.menuItemId === menuItemId)) {
            let item = items.find(i => i.menuItemId === menuItemId);
            if (item.quantity > 0)
                item.quantity -= 1;
        }
        this.setState({ menu: items });
    }

    onOrder = () => {
        this.setState({modalVisible: true})
    }

    onModalClose = () => {
        this.setState({modalVisible: false})
    }

    render() {
        let total = Math.round(this.state.menu.reduce(function (prev, cur) {
            return prev + cur.price * cur.quantity;
        }, 0) * 100) / 100;

        let footerHidden = total === 0;

        if (this.state.isLoading) {
            return (
                <View style={styles.loadingBar}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            );
        }
        return (
            <View style={styles.container}>
                <MenuTitle
                    title={this.state.name}
                    table={this.state.tableId}
                    image={this.state.image}
                    mainColor={this.state.mainColor}
                    secondaryColor={this.state.secondaryColor}
                />
                <SectionList
                    renderItem={({ item, index, section }) =>
                        <MenuItem key={index} mainColor={this.state.mainColor} item={item}
                            secondaryColor={this.state.secondaryColor}
                            increaseQuantity={this.increaseQuantity}
                            decreaseQuantity={this.decreaseQuantity}>
                        </MenuItem>}
                    renderSectionHeader={({ section: { title } }) => <MenuCategory name={title} />}
                    sections={this.state.categories.map(c => Object({ title: c.name, data: this.state.menu.filter(m => m.categoryId === c.id) }))}
                    keyExtractor={(item, index) => item.id + '_' + index}
                />
                <MenuFooter
                    hidden={footerHidden}
                    total={total}
                    mainColor={this.state.mainColor}
                    secondaryColor={this.state.secondaryColor} 
                    onOrder={this.onOrder}/>
                <MenuModal 
                    visible={this.state.modalVisible}
                    mainColor={this.state.mainColor}
                    onModalClose={this.onModalClose}
                    order={this.state.menu.filter(i => i.quantity !== 0)}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        marginTop: 23
    },
    loadingBar: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});