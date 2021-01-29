import React from 'react';
import './Navigation.css';
import { withRouter } from 'react-router-dom';

import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Nav from 'react-bootstrap/Nav';


function Navigation(props) {
    return (
        <Navbar collapseOnSelect expand="md" bg="dark" variant="dark">
            <Navbar.Brand href="/">TheStuffer</Navbar.Brand>
            <Navbar.Toggle aria-controls="main-navbar" />
            <Navbar.Collapse id="main-navbar">
                <Nav className="mr-auto">
                    <NavDropdown title="Maps" id="basic-nav-dropdown">
                        <NavDropdown.Item href="/stuffhub?m=de_mirage">Mirage</NavDropdown.Item>
                        <NavDropdown.Item href="/stuffhub?m=de_dust2">Dust 2</NavDropdown.Item>
                        <NavDropdown.Item href="/stuffhub?m=de_inferno">Inferno</NavDropdown.Item>
                        <NavDropdown.Item href="/stuffhub?m=de_nuke">Nuke</NavDropdown.Item>
                        <NavDropdown.Item href="/stuffhub?m=de_train">Train</NavDropdown.Item>
                        <NavDropdown.Item href="/stuffhub?m=de_vertigo">Vertigo</NavDropdown.Item>
                        <NavDropdown.Item href="/stuffhub?m=de_overpass">Overpass</NavDropdown.Item>
                    </NavDropdown>
                    <Nav.Link href="/help" disabled>Help</Nav.Link>
                    <Nav.Link href="/patch" disabled>Patch Notes</Nav.Link>
                    <Nav.Link href="/about" disabled>About</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default withRouter(Navigation);