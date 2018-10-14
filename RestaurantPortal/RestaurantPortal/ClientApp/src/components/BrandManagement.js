import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import ColorPicker from 'rc-color-picker';
import 'rc-color-picker/assets/index.css';

class BrandManagement extends Component {	

    constructor(props) {
        super(props);

        console.log("constructor");

        if (this.state == null) {
            this.state = {
                restaurant: {}
            };

            fetch('api/restaurant/1')
            .then(resp => resp.json())
            .then(resp => {
                this.setState({
                restaurant: resp
                });
                this.props.assignNewRestaurant(resp);
                console.log(resp);
            }); 
        }
    
    }

    componentWillReceiveProps(newProps) {
        this.state.restaurant = newProps.restaurant;
    }

    updateRestaurant = (restaurant) => {
        let newRestaurant = JSON.parse(JSON.stringify(restaurant));

        this.props.assignNewRestaurant(newRestaurant);
    }

    save = () => {
        fetch('api/restaurant', {
			method: 'POST', body: JSON.stringify(this.state.restaurant), headers: { "Content-Type": "application/json; charset=utf-8" }
		})
        .then((resp) => {
            console.log(resp);
        }); 
        
        this.updateRestaurant(this.state.restaurant);
    }

    updateLogo(evt) {
        let restaurant = this.state.restaurant;
        restaurant.logo = evt.target.value;
        this.setState({
            restaurant: restaurant
        });
    }

    updateMainColor(evt) {
        console.log(evt);
        let restaurant = this.state.restaurant;
        restaurant.mainColor = evt.target.value;
        this.setState({
            restaurant: restaurant
        });
    }

    updateSecondaryColor(evt) {
        console.log(evt);
        let restaurant = this.state.restaurant;
        restaurant.secondaryColor = evt.target.value;
        this.setState({
            restaurant: restaurant
        });
    }

    colorPickerSecondary = (color) => {
        let restaurant = this.state.restaurant;
        restaurant.secondaryColor = color.color;
        this.setState({
            restaurant: restaurant
        });
    }

    colorPickerMain = (color) => {
        let restaurant = this.state.restaurant;
        restaurant.mainColor = color.color;
        this.setState({
            restaurant: restaurant
        });
    }

    render() {
        return (
            <div className='brand-form container'>
				<div className="col-md-12 branding-inputs">
                    <div className="input-group col-md-4">
						<div className='branding-fonts'><label>Logotype</label></div>
                        <input type="text" value={this.state.restaurant.logo} onChange={evt => this.updateLogo(evt)} className="form-control" name="logo" placeholder="Enter URL"/>
                    </div>
                </div>

				<div className="col-md-12 branding-inputs">
                    <div className="input-group col-md-4">
						<div className='branding-fonts'><label>Primary color</label></div>
                        <input type="text" value={this.state.restaurant.mainColor} onChange={evt => this.updateMainColor(evt)} className="form-control color-input" name="mainColor" placeholder="Color code with # (e.g. #000000)"/>
                        <ColorPicker color={this.state.restaurant.mainColor} onChange={this.colorPickerMain} placement="bottomLeft" />
                    </div>
                </div>
				<div className="col-md-12 branding-inputs">
                    <div className="input-group col-md-4">
							<div className='branding-fonts'><label>Secondary color</label></div>
                        <input type="text" value={this.state.restaurant.secondaryColor} onChange={evt => this.updateSecondaryColor(evt)} className="form-control color-input" name="secondaryColor" placeholder="Color code with # (e.g. #000000)"/>
                        <ColorPicker color={this.state.restaurant.secondaryColor} onChange={this.colorPickerSecondary} placement="bottomLeft" />
                    </div>
                </div>

                <div className="col-md-12">
                    <div className="input-group">
                        <button onClick={this.save} className="btn btn-default margin-top-button">
                            Save
                        </button>
                    </div>
                </div>
                
            </div>
        );
    }
}

const mapStateToProps = (state) => { return { restaurant: state.restaurantStore.restaurant } }
const mapDispatchToProps = (dispatch) => { return ({ assignNewRestaurant:(restaurant) => dispatch({ type: "BRAND_CHANGE", newRestaurant: restaurant }) });}

export default connect(mapStateToProps, mapDispatchToProps)(BrandManagement);

