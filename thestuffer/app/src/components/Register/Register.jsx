import React, { useState, useReducer } from 'react';
import { authInstance } from '../../axios';

import './Register.css';

const formReducer = (state, event) => {
 return {
   ...state,
   [event.name]: event.value
 }
}

const Register = () => {
  const [form, setForm] = useReducer(formReducer, {});
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formFormatted = {
      "username": form.username,
      "email": form.email,
      "password": form.password,
    }

    authInstance.post('/register', formFormatted)
      .then(res => {
        setMessage(res.data.message);
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
        <label>Username</label>
        <input type="text"
          name="username"
          placeholder='Username...'
          id="username"
          onChange={handleChange} />
      </div>
      <div>
        <label>Email</label>
        <input type="text"
          name="email"
          placeholder='Email...'
          id="email"
          onChange={handleChange} />
      </div>
      <div>
        <label>Password</label>
        <input type="password"
          name="password"
          id="password"
          placeholder="Password..."
          onChange={handleChange} />
      </div>
      <input type="submit" value="register" />
      <p>Message: {message}</p>
    </form>
  );
}

export default Register;