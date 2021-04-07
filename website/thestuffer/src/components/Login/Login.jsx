import React, { useState, useReducer, useContext } from 'react';

import AuthContext from '../../context/AuthContext';

import './Login.css';


const formReducer = (state, event) => {
 return {
   ...state,
   [event.name]: event.value
 }
}

const AUTH_HOST = process.env.REACT_APP_AUTH_HOST;
const AUTH_PORT = process.env.REACT_APP_AUTH_PORT;
const url = `http://${AUTH_HOST}:${AUTH_PORT}/login`;

const Login = () => {
  const [form, setForm] = useReducer(formReducer, {});

  const { token, updateToken, updateLogged } = useContext(AuthContext);

  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formFormatted = {
        "email": form.email,
        "password": form.password,
    }

    await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(formFormatted),
    }).then(res => res.json())
      .then(res => {
        console.log(res)
      });
  }

  const handleChange = event => {
    setForm({
      name: event.target.name,
      value: event.target.value,
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Email</label>
        <input type="text"
          name="email"
          placeholder='Email...'
          id="email"
          onChange={handleChange}/>
      </div>
      <div>
        <label>Password</label>
        <input type="password"
          name="password"
          id="password"
          placeholder="Password..."
          onChange={handleChange}/>
      </div>
      <input type="submit" value="login" />
      <p>
        message : {message}
      </p>
      <p>
        token : {token}
      </p>
    </form>
  );
}

export default Login;