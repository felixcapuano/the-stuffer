import React, { useReducer } from 'react';

import './Register.css';

const formReducer = (state, event) => {
 return {
   ...state,
   [event.name]: event.value
 }
}

const AUTH_PORT = process.env.REACT_APP_AUTH_PORT;
const AUTH_HOST = process.env.REACT_APP_AUTH_HOST;
const url = `http://${AUTH_HOST}:${AUTH_PORT}/register`;

const Register = () => {
  const [form, setForm] = useReducer(formReducer, {});

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formFormatted = {
      "username": form.username,
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
      .then(console.log);
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
      <input type="submit" value="login" />
    </form>
  );
}

export default Register;