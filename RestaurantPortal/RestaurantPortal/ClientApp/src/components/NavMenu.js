import React from 'react';
import { Link } from 'react-router-dom';
import { Glyphicon, Nav, Navbar, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import './NavMenu.css';

export default props => (
  <Navbar fixedTop fluid collapseOnSelect style={{backgroundColor: props.restaurant.mainColor}}>
    <Navbar.Header>
      <Navbar.Brand>
        <Link to={'/'}><img src={props.restaurant.logo} height="110" /> Restaurant Portal</Link>
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      <Nav>
        <LinkContainer to={'/manage-orders'} exact>
          <NavItem>
            <Glyphicon glyph='home' /> Orders Management
          </NavItem>
		</LinkContainer>  
		<LinkContainer to={'/manage-menu'} exact>
			<NavItem>
				<Glyphicon glyph='book' /> Menu Management
			</NavItem>
		</LinkContainer>   
        <LinkContainer to={'/brand'} exact>
          <NavItem>
            <Glyphicon glyph='cutlery' /> Brand Management
          </NavItem>
        </LinkContainer>   
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);
