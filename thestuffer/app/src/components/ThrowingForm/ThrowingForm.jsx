import React, { useState, useReducer } from 'react';

import { stuffInstance } from '../../axios';

import './ThrowingForm.css';

const formReducer = (state, event) => {
 return {
   ...state,
   [event.name]: event.value
 }
}

const ThrowingForm = () => {
  const [form, setForm] = useReducer(formReducer, {});
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formFormatted = {
        'collection': 'throwing',
        "landing_id": form.landingId,
        "movement": form.movement,
        "position": {
            "lat": parseFloat(form.lat),
            "lng": parseFloat(form.lng),
            "floor": parseInt(form.floor),
        },
        "video": {
            "id": form.videoId,
            "time": parseInt(form.videoTime),
        },
        "tickrate": {
            "64": form.ticks64 ? true:false,
            "128": form.ticks128 ? true:false,
        },
        "description": form.description,
    }

    stuffInstance.post('/stuff/create', formFormatted)
      .then(res => {
        console.log(res.data)
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
      <h1>Throwing form</h1>
      <fieldset>
        <label>Landing ID</label>
        <input type="text" name="landingId" id="landingId" onChange={handleChange}/>
      </fieldset>
      <fieldset>
        <label>Position</label>
        <label>lat</label>
        <input type="number" name="lat" id="lat" onChange={handleChange}/>
        <label>lng</label>
        <input type="number" name="lng" id="lng" onChange={handleChange}/>
        <label>floor</label>
        <input type="number" name="floor" id="floor" onChange={handleChange}/>
      </fieldset>
      <fieldset>
        <label>Video</label>
        <label>id</label>
        <input type="text" name="videoId" id="videoId" onChange={handleChange}/>
        <label>time</label>
        <input type="number" name="videoTime" id="videoTime" onChange={handleChange}/>
      </fieldset>
      <fieldset>
        <label>Movement</label>
        <select name="movement" id="movement" onChange={handleChange}>
          <option value="throw">Throw</option>
          <option value="jumpthrow">Jumpthow</option>
          <option value="runjumpthrow">Run Jumpthrow</option>
        </select>
      </fieldset>
      <fieldset>
        <label>Tickrate</label>
        <label>64</label>
        <input type="checkbox" name="ticks64" id="ticks64" onChange={handleChange}/>
        <label>128</label>
        <input type="checkbox" name="ticks128" id="ticks128" onChange={handleChange}/>
      </fieldset>
      <fieldset>
        <label>Description</label>
        <textarea name="description" id="description" cols="50" rows="3" onChange={handleChange}/>
      </fieldset>
      <input type="submit" value="submit" />
      <p>{message}</p>
    </form>
  );
}

export default ThrowingForm;