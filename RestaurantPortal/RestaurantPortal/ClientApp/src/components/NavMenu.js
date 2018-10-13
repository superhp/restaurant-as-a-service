﻿import React from 'react';
import { Link } from 'react-router-dom';
import { Glyphicon, Nav, Navbar, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import './NavMenu.css';

export default props => (
  <Navbar inverse fixedTop fluid collapseOnSelect>
    <Navbar.Header>
      <Navbar.Brand>
        <Link to={'/'}>Restaurant Portal</Link>
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
				<Glyphicon glyph='book' /> Orders Management
			</NavItem>
		</LinkContainer> 
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);
