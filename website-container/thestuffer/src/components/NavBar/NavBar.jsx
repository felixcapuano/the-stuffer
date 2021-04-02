import React from 'react';
import { Link } from 'react-router-dom';

import './NavBar.css';

const NavBar = () => {
  return (
    <div>
      <ul>
        <li>
          <Link to='/'>/</Link>
        </li>
        <li>
          <Link to='/stuff'>/stuff</Link>
        </li>
        <li>
          <Link to='/stuff/create/throwing'>/stuff/create/throwing</Link>
        </li>
        <li>
          <Link to='/stuff/create/landing'>/stuff/create/landing</Link>
        </li>
        <li>
          <Link to='/user'>/user</Link>
        </li>
        <li>
          <Link to='/user/login'>/user/login</Link>
        </li>
      </ul>
    </div>
  );
}

export default NavBar;