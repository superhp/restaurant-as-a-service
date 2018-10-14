import React from 'react';
import { Link } from 'react-router-dom';
import { Glyphicon, Nav, Navbar, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import './NavMenu.css';

export default props => (
	<Navbar fixedTop fluid collapseOnSelect style={{ backgroundColor: props.restaurant.mainColor, color: 'black'}}>
    <Navbar.Header>
			<Navbar.Brand>
				
				<Link to={'/'}><img src={props.restaurant.logo} height="110" /><span style={{ fontSize: '30px' }}>Admin</span></Link>
			
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      <Nav>
        <LinkContainer to={'/manage-orders'} exact>
          <NavItem>
            <Glyphicon glyph='home' /> Orders
          </NavItem>
		</LinkContainer>  
		<LinkContainer to={'/manage-menu'} exact>
			<NavItem>
				<Glyphicon glyph='book' /> Menu
			</NavItem>
		</LinkContainer>   
        <LinkContainer to={'/brand'} exact>
          <NavItem>
            <Glyphicon glyph='cutlery' /> Branding
          </NavItem>
        </LinkContainer>   
      </Nav>
    </Navbar.Collapse>

    <div className="logo">
      <img src="https://i.imgur.com/OxdE30p.png" width="270" />
      <div className="copyrights">
        © Waiterless 2018
      </div>
    </div>
      
  </Navbar>
);
