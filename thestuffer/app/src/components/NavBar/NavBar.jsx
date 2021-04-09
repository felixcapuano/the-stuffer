import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';

import AuthContext from '../../context/AuthContext';
import { Logout } from '../Logout';

import './NavBar.css';

const NavBar = () => {
  const { logged } = useContext(AuthContext);
  const maps = [
    { key: 'de_mirage', name: 'Mirage' },
    { key: 'de_dust2', name: 'Dust 2' },
    { key: 'de_inferno', name: 'Inferno' },
    { key: 'de_nuke', name: 'Nuke' },
    { key: 'de_vertigo', name: 'Vertigo' },
    { key: 'de_overpass', name: 'Overpass' },
    { key: 'de_train', name: 'Train' },
  ];

  const dropdownItems = maps.map((m) => {
    return (
      <LinkContainer to={'/stuff?m=' + m.key} key={m.key}>
        <NavDropdown.Item>{m.name}</NavDropdown.Item>
      </LinkContainer>
    );
  });

  return (
    <div>
      <Navbar bg='light' expand='lg'>
        <LinkContainer to='/'>
          <Navbar.Brand>TheStuffer</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls='navbar-nav' />
        <Navbar.Collapse id='navbar-nav'>
          <Nav className='mr-auto'>
            <LinkContainer to='/user'>
              <Nav.Link>User</Nav.Link>
            </LinkContainer>
            <Nav.Link>Help</Nav.Link>
            <NavDropdown title='Map' id='nav-dropdown'>
              {dropdownItems}
            </NavDropdown>
          </Nav>
          {logged ? (
            <Logout />
          ) : (
            <div>
              <LinkContainer to='/user/register'>
                <Button variant='outline-secondary'>Register</Button>
              </LinkContainer>
              <LinkContainer to='/user/login'>
                <Button variant='secondary'>Login</Button>
              </LinkContainer>
            </div>
          )}
        </Navbar.Collapse>
      </Navbar>
      <ul>
        <li>
          <Link to='/stuff/create/throwing'>/stuff/create/throwing</Link>
        </li>
        <li>
          <Link to='/stuff/create/landing'>/stuff/create/landing</Link>
        </li>
        <li>
          <Link to='/user'>/user</Link>
        </li>
      </ul>
    </div>
  );
};

export default NavBar;
