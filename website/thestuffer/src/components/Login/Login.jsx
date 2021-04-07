import React, { useState, useReducer, useContext } from 'react';
import { authInstance } from '../../axios';

import AuthContext from '../../context/AuthContext';

import './Login.css';


const formReducer = (state, event) => {
 return {
   ...state,
   [event.name]: event.value
 }
}

const Login = () => {
  const [form, setForm] = useReducer(formReducer, {});

  const { updateToken, updateLogged } = useContext(AuthContext);

  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formFormatted = {
        "email": form.email,
        "password": form.password,
    }

    authInstance.post('/login', formFormatted)
      .then(res => {
        setMessage(res.data.message);
        if(res.data.ok) {
          updateLogged(true);
          updateToken(res.data.accessToken);
        }
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
    </form>
  );
}

export default Login;