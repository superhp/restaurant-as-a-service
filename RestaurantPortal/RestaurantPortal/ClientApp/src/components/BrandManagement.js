import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

class BrandManagement extends Component {	

    updateRestaurant = (restaurant) => {
        this.props.assignNewRestaurant(restaurant);
    }

    save = () => {
        let restaurant = {
            logo: "asdas",
            mainColor: "#aaaaaa"
        };

        this.updateRestaurant(restaurant);
    }

    render() {
        console.log("render");
        return (
            <div>
                <input name="logo" />
                <input name="mainColor" />

                <button onClick={this.save}>
                    Save
                </button>
            </div>
        );
    }
}

const mapStateToProps = (state) => { return { restaurant: state.restaurantStore.restaurant } }
const mapDispatchToProps = (dispatch) => { return ({ assignNewRestaurant:(restaurant) => dispatch({ type: "BRAND_CHANGE", newRestaurant: restaurant }) });}

export default connect(mapStateToProps, mapDispatchToProps)(BrandManagement);

