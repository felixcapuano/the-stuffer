import React, { useReducer, useState } from 'react';

import { stuffInstance } from '../../axios';

import './LandingForm.css';

const formReducer = (state, event) => {
  return {
    ...state,
    [event.name]: event.value,
  };
};

const LandingForm = () => {
  const [form, setForm] = useReducer(formReducer, {});
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formFormatted = {
      collection: 'landing',
      type: form.type,
      map: form.map,
      position: {
        lat: parseFloat(form.lat),
        lng: parseFloat(form.lng),
        floor: parseInt(form.floor),
      },
    };

    stuffInstance.post('/stuff/create', formFormatted).then((res) => {
      console.log(res.data);
      setMessage(res.data.message);
    });
  };

  const handleChange = (event) => {
    setForm({
      name: event.target.name,
      value: event.target.value,
    });
  };
  return (
    <form onSubmit={handleSubmit}>
      <h1>Landing form</h1>
      <fieldset>
        <label htmlFor='type'>Map</label>
        <select name='map' id='map' onChange={handleChange}>
          <option value='dust2'>dust 2</option>
          <option value='inferno'>inferno</option>
          <option value='mirage'>mirage</option>
          <option value='nuke'>nuke</option>
          <option value='vertigo'>vertigo</option>
          <option value='train'>train</option>
          <option value='overpass'>overpass</option>
        </select>
      </fieldset>
      <fieldset>
        <label htmlFor='video'>Position</label>
        <label htmlFor='lat'>lat</label>
        <input type='number' name='lat' id='lat' onChange={handleChange} />
        <label htmlFor='lng'>lng</label>
        <input type='number' name='lng' id='lng' onChange={handleChange} />
      </fieldset>
      <fieldset>
        <label htmlFor='type'>Type</label>
        <select name='type' id='type' onChange={handleChange}>
          <option value='smoke'>smoke</option>
          <option value='molotov'>molotov</option>
          <option value='flash'>flash</option>
        </select>
      </fieldset>
      <input type='submit' value='submit' />
      <p>{message}</p>
    </form>
  );
};

export default LandingForm;
