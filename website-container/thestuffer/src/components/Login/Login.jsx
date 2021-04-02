import React from 'react';

import './Login.css';

const Login = () => {
  return (
    <form>
      <div>
        <label htmlFor="username">Username</label>
        <input type="text" name="username" id="username" />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" />
      </div>
      <input type="submit" value="login" />
    </form>
  );
}

export default Login;