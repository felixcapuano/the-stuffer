import React from 'react';
import './Navigation.css';
import { withRouter, Link } from 'react-router-dom';

import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Nav from 'react-bootstrap/Nav';


function Navigation(props) {
    const maps = [
       { key:"de_mirage", name: "Mirage" },
       { key:"de_dust2", name: "Dust 2" },
       { key:"de_inferno", name: "Inferno" },
       { key:"de_nuke", name: "Nuke" },
       { key:"de_vertigo", name: "Vertigo" },
       { key:"de_overpass", name: "Overpass" },
       { key:"de_train", name: "Train" },
    ];

    const dropdownItems = maps.map((m) => {
        return (
            <NavDropdown.Item key={m.key}>
                <Link to={"/stuffhub?m="+m.key}>{m.name}</Link>
            </NavDropdown.Item>
        );
    });

    return (
        <Navbar collapseOnSelect expand="md" bg="dark" variant="dark">
            <Navbar.Brand href="/">TheStuffer</Navbar.Brand>
            <Navbar.Toggle aria-controls="main-navbar" />
            <Navbar.Collapse id="main-navbar">
                <Nav className="mr-auto">
                    <NavDropdown title="Maps" id="basic-nav-dropdown">
                        {dropdownItems}
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