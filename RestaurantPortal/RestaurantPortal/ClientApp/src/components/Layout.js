import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Col, Grid, Row } from 'react-bootstrap';
import NavMenu from './NavMenu';
import { connect } from 'react-redux';

class Layout extends Component {	
  state = {
		restaurant: {}
  };
  
  componentWillMount = () => {
		this.fetchRestaurant(); 
  }
  
  fetchRestaurant = () => {
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

  render() {
    return (
      <Grid fluid>
        <Row>
          <Col sm={3}>
            <NavMenu restaurant={this.props.restaurant} />
          </Col>
          <Col sm={9}>
            {this.props.children}
          </Col>
        </Row>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => { return { restaurant: state.restaurantStore.restaurant } }
const mapDispatchToProps = (dispatch) => { return ({ assignNewRestaurant:(restaurant) => dispatch({ type: "BRAND_CHANGE", newRestaurant: restaurant }) });}

export default connect(mapStateToProps, mapDispatchToProps)(Layout);

