import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

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

    render() {
        return (
            <div className='brand-form container'>
                <div className="col-md-12">
                    <div className="input-group">
                        <label>Logotype</label>
                        <input type="text" value={this.state.restaurant.logo} onChange={evt => this.updateLogo(evt)} className="form-control" name="logo" placeholder="Enter URL"/>
                    </div>
                </div>

                <div className="col-md-12">
                    <div className="input-group">
                        <label>Main color</label>
                        <input type="text" value={this.state.restaurant.mainColor} onChange={evt => this.updateMainColor(evt)} className="form-control" name="mainColor" placeholder="Color code with # (e.g. #000000)"/>
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

