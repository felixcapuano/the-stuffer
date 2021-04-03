import React, { useReducer } from 'react';

import './ThrowingForm.css';

const formReducer = (state, event) => {
 return {
   ...state,
   [event.name]: event.value
 }
}

const ThrowingForm = () => {
  const [form, setForm] = useReducer(formReducer, {});

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Submit');
    fetch(`http://localhost:9000/throwing/create`, {
      method: 'POST',
      body: JSON.stringify(form),
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
      <h1>Throwing form</h1>
      <fieldset>
        <label htmlFor="landingId">Landing ID</label>
        <input type="text" name="landingId" id="landingId" onChange={handleChange}/>
      </fieldset>
      <fieldset>
        <label htmlFor="video">Position</label>
        <label htmlFor="lat">lat</label>
        <input type="number" name="lat" id="lat" onChange={handleChange}/>
        <label htmlFor="lng">lng</label>
        <input type="number" name="lng" id="lng" onChange={handleChange}/>
      </fieldset>
      <fieldset>
        <label htmlFor="video">Video</label>
        <label htmlFor="videoId">id</label>
        <input type="text" name="videoId" id="videoId" onChange={handleChange}/>
        <label htmlFor="videoTime">time</label>
        <input type="number" name="videoTime" id="videoTime" onChange={handleChange}/>
      </fieldset>
      <fieldset>
        <label htmlFor="movement">Movement</label>
        <select name="movement" id="movement" onChange={handleChange}>
          <option value="throw">Throw</option>
          <option value="jumpthrow">Jumpthow</option>
          <option value="runjumpthrow">Run Jumpthrow</option>
        </select>
      </fieldset>
      <fieldset>
        <label htmlFor="ticks">Tickrate</label>
        <label htmlFor="64ticks">64</label>
        <input type="checkbox" name="64ticks" id="64ticks" onChange={handleChange}/>
        <label htmlFor="128ticks">128</label>
        <input type="checkbox" name="128ticks" id="128ticks" onChange={handleChange}/>
      </fieldset>
      <input type="submit" value="submit" />
    </form>
  );
}

export default ThrowingForm;